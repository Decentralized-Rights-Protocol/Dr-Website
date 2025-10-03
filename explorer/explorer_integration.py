import asyncio
import json
import os
import sqlite3
from typing import Any, Dict, List

import aiohttp


DB_PATH = os.getenv("EXPLORER_DB", os.path.abspath(os.path.join(os.path.dirname(__file__), "explorer.db")))
DRP_NODE_URL = os.getenv("DRP_NODE_URL", "http://localhost:8545")
POLL_INTERVAL_SECONDS = int(os.getenv("POLL_INTERVAL_SECONDS", "6"))


def get_db_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def ensure_schema() -> None:
    schema_path = os.path.join(os.path.dirname(__file__), "db_schema.sql")
    with open(schema_path, "r", encoding="utf-8") as f:
        schema_sql = f.read()
    with get_db_connection() as conn:
        conn.executescript(schema_sql)
        conn.commit()


async def fetch_json(session: aiohttp.ClientSession, url: str) -> Any:
    async with session.get(url, timeout=30) as resp:
        resp.raise_for_status()
        return await resp.json()


async def ingest_block(conn: sqlite3.Connection, block: Dict[str, Any]) -> None:
    """
    Inserts/updates a block and its transactions.
    Expected block shape (example):
    {
      "number": 12345,
      "hash": "0x...",
      "timestamp": 1690000000,
      "consensus_type": "PoST+PoAT",
      "elder_signatures": {"signers": ["key1", "key2"], "threshold": 2},
      "transactions": [
        {
          "tx_id": "0x..",
          "from": "0x..",
          "to": "0x..",
          "value": 1.23,
          "activity_proof": {"post": "verified", "poat": "verified"},
          "status": "success"
        }
      ]
    }
    """
    conn.execute(
        """
        INSERT INTO blocks (block_number, hash, timestamp, consensus_type, elder_signatures)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(hash) DO UPDATE SET
          block_number=excluded.block_number,
          timestamp=excluded.timestamp,
          consensus_type=excluded.consensus_type,
          elder_signatures=excluded.elder_signatures
        """,
        (
            int(block["number"]),
            str(block["hash"]),
            int(block["timestamp"]),
            str(block.get("consensus_type", "PoST+PoAT")),
            json.dumps(block.get("elder_signatures")),
        ),
    )
    txs: List[Dict[str, Any]] = block.get("transactions", [])
    for tx in txs:
        conn.execute(
            """
            INSERT INTO transactions (tx_id, block_hash, sender, receiver, value, activity_proof, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(tx_id) DO UPDATE SET
              block_hash=excluded.block_hash,
              sender=excluded.sender,
              receiver=excluded.receiver,
              value=excluded.value,
              activity_proof=excluded.activity_proof,
              status=excluded.status
            """,
            (
                str(tx["tx_id"]),
                str(block["hash"]),
                str(tx.get("from", "")),
                str(tx.get("to", "")),
                float(tx.get("value", 0)),
                json.dumps(tx.get("activity_proof")),
                str(tx.get("status", "unknown")),
            ),
        )


async def get_latest_block_number(session: aiohttp.ClientSession) -> int:
    # Example placeholder endpoint; adapt to real DRP node API
    data = await fetch_json(session, f"{DRP_NODE_URL}/drp/latestBlockNumber")
    return int(data.get("number", 0))


async def get_block_by_number(session: aiohttp.ClientSession, number: int) -> Dict[str, Any]:
    # Example placeholder endpoint; adapt to real DRP node API
    return await fetch_json(session, f"{DRP_NODE_URL}/drp/block/{number}")


async def run_ingestion_loop() -> None:
    ensure_schema()
    last_seen = -1
    async with aiohttp.ClientSession() as session:
        while True:
            try:
                latest = await get_latest_block_number(session)
                if last_seen < 0:
                    last_seen = max(0, latest - 50)  # backfill recent history
                while last_seen <= latest:
                    block = await get_block_by_number(session, last_seen)
                    with get_db_connection() as conn:
                        ingest_block(conn, block)  # type: ignore[arg-type]
                        conn.commit()
                    last_seen += 1
                await asyncio.sleep(POLL_INTERVAL_SECONDS)
            except Exception as e:
                # Simple backoff on error
                await asyncio.sleep(min(POLL_INTERVAL_SECONDS * 2, 60))


if __name__ == "__main__":
    asyncio.run(run_ingestion_loop())


