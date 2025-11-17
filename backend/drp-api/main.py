"""
DRP API Gateway - Main FastAPI application for PoAT/PoST submissions and orchestration.

Base URL: https://api.decentralizedrights.com
"""

import os
import base64
import uuid
from datetime import datetime
from typing import Dict, Any, Optional, List
import httpx
from fastapi import FastAPI, HTTPException, Depends, Header, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy import create_engine, Column, String, Integer, Float, DateTime, Boolean, Text, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from crypto.crypto_adapter import sign_message, verify_signature, generate_keypair
from orbit.orbit_client import OrbitClient

# Import elders router (relative import)
from .elders import router as elders_router

# Environment variables
IPFS_API_URL = os.getenv("IPFS_API_URL", "https://ipfs.decentralizedrights.com/api/v0")
ORBITDB_ADDR = os.getenv("ORBITDB_ADDR", "")
DB_URL = os.getenv("DB_URL", "postgresql://localhost/drp_api")
AI_API_URL = os.getenv("AI_API_URL", "https://ai.decentralizedrights.com")

# Database setup
Base = declarative_base()

class SubmissionRecord(Base):
    __tablename__ = "submissions"
    
    id = Column(String, primary_key=True)
    submission_cid = Column(String, unique=True, index=True)
    ipfs_cid = Column(String, index=True)
    actor_id = Column(String, index=True)
    activity_type = Column(String)  # "poat" or "post"
    status = Column(String)  # "pending", "assessed", "rewarded"
    ai_score = Column(Float, nullable=True)
    ai_verdict = Column(String, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    metadata = Column(JSON, nullable=True)
    tx_hash = Column(String, nullable=True)

engine = create_engine(DB_URL)
Base.metadata.create_all(engine)
SessionLocal = sessionmaker(bind=engine)

# OrbitDB client
orbit_client = OrbitClient() if ORBITDB_ADDR else None

app = FastAPI(title="DRP API Gateway", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://app.decentralizedrights.com",
        "https://explorer.decentralizedrights.com",
        "http://localhost:3000",
        "http://localhost:3001"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include elder router
app.include_router(elders_router)

# Pydantic models
class ActivityClaim(BaseModel):
    title: str
    description: str
    location: Optional[str] = None
    timestamp: str
    media_cid: str
    hash: str
    actor_id: str

class StatusClaim(BaseModel):
    category: str
    issuer: str
    reference_code: Optional[str] = None
    credential_cid: str
    actor_id: str

class SubmissionResponse(BaseModel):
    submission_id: str
    cid: str
    ipfs_cid: str
    status: str
    timestamp: str

class RewardRequest(BaseModel):
    submission_id: str
    actor_id: str
    ai_assessment: Dict[str, Any]

class RewardResponse(BaseModel):
    success: bool
    tx_hash: Optional[str] = None
    reward_amount: Optional[float] = None
    message: str

class ElderRotateRequest(BaseModel):
    new_public_key: str
    admin_key: str

class ElderRevokeRequest(BaseModel):
    elder_id: str
    admin_key: str

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def add_to_ipfs(payload: Dict[str, Any]) -> str:
    """Upload payload to IPFS and return CID."""
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{IPFS_API_URL}/add",
                files={"file": (None, str(payload))},
                timeout=30.0
            )
            response.raise_for_status()
            result = response.json()
            return result.get("Hash") or result.get("cid", "")
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"IPFS upload failed: {str(e)}")

async def add_to_orbitdb(db_name: str, payload: Dict[str, Any]) -> str:
    """Add entry to OrbitDB and return entry hash."""
    if not orbit_client:
        return ""  # Skip if OrbitDB not configured
    try:
        result = await orbit_client.add(db_name, payload)
        return result.get("hash", "")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OrbitDB write failed: {str(e)}")

async def trigger_indexer(submission_id: str, payload: Dict[str, Any]):
    """Trigger indexer to process submission (background task)."""
    # In production, this would send to a job queue (Redis, RabbitMQ, etc.)
    # For now, we'll log it
    print(f"[Indexer] Processing submission {submission_id}")

@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "ok", "timestamp": datetime.utcnow().isoformat()}

@app.post("/submit-activity", response_model=SubmissionResponse)
async def submit_activity(
    claim: ActivityClaim,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Submit a Proof of Activity (PoAT) claim.
    
    Stores payload to IPFS, writes to OrbitDB, triggers indexer job.
    """
    submission_id = str(uuid.uuid4())
    
    # Prepare payload
    payload = {
        "submission_id": submission_id,
        "type": "poat",
        "claim": claim.dict(),
        "timestamp": datetime.utcnow().isoformat()
    }
    
    # Upload to IPFS
    ipfs_cid = await add_to_ipfs(payload)
    
    # Write to OrbitDB
    orbit_hash = await add_to_orbitdb("drp.activities", payload)
    
    # Store in database
    record = SubmissionRecord(
        id=submission_id,
        submission_cid=submission_id,  # Use submission_id as CID for now
        ipfs_cid=ipfs_cid,
        actor_id=claim.actor_id,
        activity_type="poat",
        status="pending",
        metadata={"orbit_hash": orbit_hash, **payload}
    )
    db.add(record)
    db.commit()
    
    # Trigger indexer (background)
    background_tasks.add_task(trigger_indexer, submission_id, payload)
    
    return SubmissionResponse(
        submission_id=submission_id,
        cid=submission_id,
        ipfs_cid=ipfs_cid,
        status="pending",
        timestamp=datetime.utcnow().isoformat()
    )

@app.post("/submit-status", response_model=SubmissionResponse)
async def submit_status(
    claim: StatusClaim,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    """
    Submit a Proof of Status (PoST) claim.
    
    Stores payload to IPFS, writes to OrbitDB, triggers indexer job.
    """
    submission_id = str(uuid.uuid4())
    
    # Prepare payload
    payload = {
        "submission_id": submission_id,
        "type": "post",
        "claim": claim.dict(),
        "timestamp": datetime.utcnow().isoformat()
    }
    
    # Upload to IPFS
    ipfs_cid = await add_to_ipfs(payload)
    
    # Write to OrbitDB
    orbit_hash = await add_to_orbitdb("drp.status", payload)
    
    # Store in database
    record = SubmissionRecord(
        id=submission_id,
        submission_cid=submission_id,
        ipfs_cid=ipfs_cid,
        actor_id=claim.actor_id,
        activity_type="post",
        status="pending",
        metadata={"orbit_hash": orbit_hash, **payload}
    )
    db.add(record)
    db.commit()
    
    # Trigger indexer (background)
    background_tasks.add_task(trigger_indexer, submission_id, payload)
    
    return SubmissionResponse(
        submission_id=submission_id,
        cid=submission_id,
        ipfs_cid=ipfs_cid,
        status="pending",
        timestamp=datetime.utcnow().isoformat()
    )

@app.get("/submission/{cid}")
async def get_submission(cid: str, db: Session = Depends(get_db)):
    """Get submission metadata by CID."""
    record = db.query(SubmissionRecord).filter(SubmissionRecord.submission_cid == cid).first()
    if not record:
        raise HTTPException(status_code=404, detail="Submission not found")
    
    return {
        "submission_id": record.id,
        "cid": record.submission_cid,
        "ipfs_cid": record.ipfs_cid,
        "actor_id": record.actor_id,
        "activity_type": record.activity_type,
        "status": record.status,
        "ai_score": record.ai_score,
        "ai_verdict": record.ai_verdict,
        "timestamp": record.timestamp.isoformat(),
        "metadata": record.metadata,
        "tx_hash": record.tx_hash,
        "ipfs_link": f"{IPFS_API_URL.replace('/api/v0', '')}/ipfs/{record.ipfs_cid}" if record.ipfs_cid else None
    }

@app.post("/reward", response_model=RewardResponse)
async def reward(
    request: RewardRequest,
    db: Session = Depends(get_db)
):
    """
    Process reward based on AI assessment.
    
    Verifies AI assessment and mints/simulates token transfer.
    """
    # Get submission
    record = db.query(SubmissionRecord).filter(SubmissionRecord.id == request.submission_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Submission not found")
    
    # Verify AI assessment (simplified - in production, verify signature)
    ai_verdict = request.ai_assessment.get("verdict")
    if ai_verdict != "approved":
        return RewardResponse(
            success=False,
            message=f"Reward denied: AI verdict is {ai_verdict}"
        )
    
    # Simulate token mint/transfer (in production, call smart contract)
    reward_amount = request.ai_assessment.get("score", 0.0) * 10  # 10 tokens per score point
    
    # Update record
    record.status = "rewarded"
    record.tx_hash = f"0x{uuid.uuid4().hex[:64]}"  # Simulated tx hash
    db.commit()
    
    return RewardResponse(
        success=True,
        tx_hash=record.tx_hash,
        reward_amount=reward_amount,
        message="Reward processed successfully"
    )

# Elder endpoints are now in elders.py router

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)

