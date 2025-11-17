"""
DRP Indexer - Background worker that processes submissions, pins to IPFS, stores metadata in Postgres,
and writes AI summaries to OrbitDB.

This service runs as a background worker (Render worker or separate process).
"""

import os
import asyncio
import time
import httpx
from datetime import datetime
from typing import Dict, Any, Optional
from sqlalchemy import create_engine, Column, String, Integer, Float, DateTime, Boolean, Text, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from orbit.orbit_client import OrbitClient

# Environment variables
DB_URL = os.getenv("DB_URL", "postgresql://localhost/drp_indexer")
API_URL = os.getenv("API_URL", "https://api.decentralizedrights.com")
AI_API_URL = os.getenv("AI_API_URL", "https://ai.decentralizedrights.com")
IPFS_API_URL = os.getenv("IPFS_API_URL", "https://ipfs.decentralizedrights.com/api/v0")

# Database setup
Base = declarative_base()

class IndexedSubmission(Base):
    __tablename__ = "indexed_submissions"
    
    id = Column(String, primary_key=True)
    submission_cid = Column(String, unique=True, index=True)
    ipfs_cid = Column(String, index=True)
    actor_id = Column(String, index=True)
    activity_type = Column(String)
    status = Column(String)
    ai_score = Column(Float, nullable=True)
    ai_verdict = Column(String, nullable=True)
    ai_rationale = Column(Text, nullable=True)
    ai_summary_cid = Column(String, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    tx_hash = Column(String, nullable=True)
    metadata = Column(JSON, nullable=True)

engine = create_engine(DB_URL)
Base.metadata.create_all(engine)
SessionLocal = sessionmaker(bind=engine)

# OrbitDB client
orbit_client = OrbitClient()

async def fetch_pending_submissions(session: Session) -> list:
    """Fetch pending submissions from API or database."""
    # In production, this would poll a queue or database
    # For now, we'll query the API
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{API_URL}/submissions/pending")
            response.raise_for_status()
            return response.json().get("items", [])
        except Exception:
            # Fallback: query local database
            records = session.query(IndexedSubmission).filter(
                IndexedSubmission.status == "pending"
            ).limit(10).all()
            return [r.__dict__ for r in records]

async def pin_to_ipfs(cid: str) -> bool:
    """Pin a CID to IPFS."""
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{IPFS_API_URL}/pin/add",
                params={"arg": cid},
                timeout=60.0
            )
            response.raise_for_status()
            return True
        except Exception as e:
            print(f"[Indexer] Failed to pin {cid}: {str(e)}")
            return False

async def assess_with_ai(submission: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """Call AI service to assess submission."""
    async with httpx.AsyncClient() as client:
        try:
            claim = submission.get("claim", {})
            activity_type = submission.get("type", "")
            
            if activity_type == "poat":
                response = await client.post(
                    f"{AI_API_URL}/assess-activity",
                    json=claim,
                    timeout=30.0
                )
            elif activity_type == "post":
                response = await client.post(
                    f"{AI_API_URL}/assess-status",
                    json=claim,
                    timeout=30.0
                )
            else:
                return None
            
            response.raise_for_status()
            return response.json()
        except Exception as e:
            print(f"[Indexer] AI assessment failed: {str(e)}")
            return None

async def write_ai_summary(submission_id: str, assessment: Dict[str, Any], session: Session):
    """Write AI summary to OrbitDB explorer database."""
    summary = {
        "submission_id": submission_id,
        "assessment": assessment,
        "timestamp": datetime.utcnow().isoformat()
    }
    
    try:
        result = await orbit_client.add("drp.explorer.summaries", summary)
        summary_cid = result.get("hash", "")
        return summary_cid
    except Exception as e:
        print(f"[Indexer] Failed to write summary: {str(e)}")
        return None

async def process_submission(submission: Dict[str, Any], session: Session):
    """Process a single submission."""
    submission_id = submission.get("submission_id") or submission.get("id")
    ipfs_cid = submission.get("ipfs_cid") or submission.get("cid")
    
    print(f"[Indexer] Processing submission {submission_id}")
    
    # Pin to IPFS
    if ipfs_cid:
        await pin_to_ipfs(ipfs_cid)
    
    # Assess with AI
    assessment = await assess_with_ai(submission)
    
    # Update database
    record = session.query(IndexedSubmission).filter(
        IndexedSubmission.submission_cid == submission_id
    ).first()
    
    if not record:
        record = IndexedSubmission(
            id=submission_id,
            submission_cid=submission_id,
            ipfs_cid=ipfs_cid,
            actor_id=submission.get("actor_id", ""),
            activity_type=submission.get("type", ""),
            status="assessed" if assessment else "pending",
            metadata=submission
        )
        session.add(record)
    else:
        record.status = "assessed"
    
    if assessment:
        record.ai_score = assessment.get("score")
        record.ai_verdict = assessment.get("verdict")
        record.ai_rationale = assessment.get("rationale")
        
        # Write AI summary to OrbitDB
        summary_cid = await write_ai_summary(submission_id, assessment, session)
        if summary_cid:
            record.ai_summary_cid = summary_cid
    
    session.commit()
    print(f"[Indexer] Completed processing {submission_id}")

async def run_indexer_loop():
    """Main indexer loop."""
    print("[Indexer] Starting DRP indexer...")
    
    while True:
        try:
            session = SessionLocal()
            submissions = await fetch_pending_submissions(session)
            
            if submissions:
                print(f"[Indexer] Found {len(submissions)} pending submissions")
                for submission in submissions:
                    try:
                        await process_submission(submission, session)
                    except Exception as e:
                        print(f"[Indexer] Error processing submission: {str(e)}")
            
            session.close()
            
            # Sleep before next poll
            await asyncio.sleep(30)  # Poll every 30 seconds
        
        except Exception as e:
            print(f"[Indexer] Error in main loop: {str(e)}")
            await asyncio.sleep(60)

if __name__ == "__main__":
    asyncio.run(run_indexer_loop())

