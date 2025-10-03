import json
import os
import sqlite3
from typing import Any, Dict, List, Optional

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware


DB_PATH = os.getenv("EXPLORER_DB", os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "explorer.db")))
SCHEMA_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "db_schema.sql"))


def get_db_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db_if_needed() -> None:
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    with get_db_connection() as conn:
        cursor = conn.cursor()
        # Try to read schema from file; fallback to inline schema
        if os.path.exists(SCHEMA_PATH):
            with open(SCHEMA_PATH, "r", encoding="utf-8") as f:
                schema_sql = f.read()
        else:
            schema_sql = (
                """
                CREATE TABLE IF NOT EXISTS blocks (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    block_number INTEGER UNIQUE,
                    hash TEXT UNIQUE,
                    timestamp INTEGER,
                    consensus_type TEXT,
                    elder_signatures TEXT
                );
                CREATE TABLE IF NOT EXISTS transactions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    tx_id TEXT UNIQUE,
                    block_hash TEXT,
                    sender TEXT,
                    receiver TEXT,
                    value REAL,
                    activity_proof TEXT,
                    status TEXT
                );
                CREATE TABLE IF NOT EXISTS accounts (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    address TEXT UNIQUE,
                    balance REAL,
                    activity_logs TEXT
                );
                """
            )
        cursor.executescript(schema_sql)
        conn.commit()


init_db_if_needed()

app = FastAPI(title="DRP Explorer API", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def parse_json_field(value: Optional[str]) -> Any:
    if value is None:
        return None
    try:
        return json.loads(value)
    except Exception:
        return value


@app.get("/health")
def health() -> Dict[str, Any]:
    return {"ok": True}


@app.get("/blocks/latest")
def get_latest_blocks(page: int = Query(1, ge=1), page_size: int = Query(10, ge=1, le=100)) -> Dict[str, Any]:
    offset = (page - 1) * page_size
    with get_db_connection() as conn:
        total_row = conn.execute("SELECT COUNT(1) as c FROM blocks").fetchone()
        total = int(total_row["c"]) if total_row else 0
        rows = conn.execute(
            """
            SELECT b.block_number, b.hash, b.timestamp, b.consensus_type, b.elder_signatures,
                   (SELECT COUNT(1) FROM transactions t WHERE t.block_hash = b.hash) AS tx_count
            FROM blocks b
            ORDER BY b.block_number DESC
            LIMIT ? OFFSET ?
            """,
            (page_size, offset),
        ).fetchall()
    items: List[Dict[str, Any]] = []
    for r in rows:
        items.append(
            {
                "block_number": r["block_number"],
                "hash": r["hash"],
                "timestamp": r["timestamp"],
                "consensus_type": r["consensus_type"],
                "elder_signatures": parse_json_field(r["elder_signatures"]),
                "tx_count": r["tx_count"],
            }
        )
    return {"items": items, "page": page, "page_size": page_size, "total": total}


@app.get("/blocks/{block_hash}")
def get_block(block_hash: str) -> Dict[str, Any]:
    with get_db_connection() as conn:
        r = conn.execute(
            "SELECT block_number, hash, timestamp, consensus_type, elder_signatures FROM blocks WHERE hash = ?",
            (block_hash,),
        ).fetchone()
        if not r:
            raise HTTPException(status_code=404, detail="Block not found")
        tx_rows = conn.execute(
            "SELECT tx_id, sender, receiver, value, activity_proof, status FROM transactions WHERE block_hash = ?",
            (block_hash,),
        ).fetchall()
    return {
        "block_number": r["block_number"],
        "hash": r["hash"],
        "timestamp": r["timestamp"],
        "consensus_type": r["consensus_type"],
        "elder_signatures": parse_json_field(r["elder_signatures"]),
        "transactions": [
            {
                "tx_id": tx["tx_id"],
                "from": tx["sender"],
                "to": tx["receiver"],
                "value": tx["value"],
                "activity_proof": parse_json_field(tx["activity_proof"]),
                "status": tx["status"],
            }
            for tx in tx_rows
        ],
    }


@app.get("/tx/{tx_id}")
def get_transaction(tx_id: str) -> Dict[str, Any]:
    with get_db_connection() as conn:
        r = conn.execute(
            "SELECT tx_id, block_hash, sender, receiver, value, activity_proof, status FROM transactions WHERE tx_id = ?",
            (tx_id,),
        ).fetchone()
        if not r:
            raise HTTPException(status_code=404, detail="Transaction not found")
    return {
        "tx_id": r["tx_id"],
        "block_hash": r["block_hash"],
        "from": r["sender"],
        "to": r["receiver"],
        "value": r["value"],
        "activity_proof": parse_json_field(r["activity_proof"]),
        "status": r["status"],
        "post_verified": bool(parse_json_field(r["activity_proof"]).get("post") == "verified") if r["activity_proof"] else None,
        "poat_verified": bool(parse_json_field(r["activity_proof"]).get("poat") == "verified") if r["activity_proof"] else None,
    }


@app.get("/address/{addr}")
def get_address_activity(
    addr: str,
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
) -> Dict[str, Any]:
    """
    Returns recent transactions involving the address as sender or receiver.
    Special case: if addr == "__recent__", returns globally recent transactions.
    """
    offset = (page - 1) * page_size
    with get_db_connection() as conn:
        if addr == "__recent__":
            total_row = conn.execute("SELECT COUNT(1) AS c FROM transactions").fetchone()
            total = int(total_row["c"]) if total_row else 0
            rows = conn.execute(
                """
                SELECT tx_id, block_hash, sender, receiver, value, activity_proof, status
                FROM transactions
                ORDER BY id DESC
                LIMIT ? OFFSET ?
                """,
                (page_size, offset),
            ).fetchall()
        else:
            total_row = conn.execute(
                "SELECT COUNT(1) AS c FROM transactions WHERE sender = ? OR receiver = ?",
                (addr, addr),
            ).fetchone()
            total = int(total_row["c"]) if total_row else 0
            rows = conn.execute(
                """
                SELECT tx_id, block_hash, sender, receiver, value, activity_proof, status
                FROM transactions
                WHERE sender = ? OR receiver = ?
                ORDER BY id DESC
                LIMIT ? OFFSET ?
                """,
                (addr, addr, page_size, offset),
            ).fetchall()
    items: List[Dict[str, Any]] = []
    for r in rows:
        ap = parse_json_field(r["activity_proof"]) if r["activity_proof"] else None
        items.append(
            {
                "tx_id": r["tx_id"],
                "block_hash": r["block_hash"],
                "from": r["sender"],
                "to": r["receiver"],
                "value": r["value"],
                "activity_proof": ap,
                "status": r["status"],
                "post_verified": bool(ap and ap.get("post") == "verified"),
                "poat_verified": bool(ap and ap.get("poat") == "verified"),
            }
        )
    return {"items": items, "page": page, "page_size": page_size, "total": total}


@app.get("/elders")
def get_elders() -> Dict[str, Any]:
    """
    Returns active elder keys/quorum state derived from the most recent block's elder_signatures.
    """
    with get_db_connection() as conn:
        row = conn.execute(
            "SELECT elder_signatures, timestamp FROM blocks ORDER BY block_number DESC LIMIT 1"
        ).fetchone()
    if not row:
        return {"active_keys": [], "quorum_threshold": 0, "last_updated": 0}
    sigs = parse_json_field(row["elder_signatures"]) or {}
    active_keys = list(sigs.get("signers", [])) if isinstance(sigs, dict) else []
    quorum_threshold = int(sigs.get("threshold", len(active_keys))) if isinstance(sigs, dict) else 0
    return {
        "active_keys": active_keys,
        "quorum_threshold": quorum_threshold,
        "last_updated": row["timestamp"],
    }


