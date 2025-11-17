"""
Elder quorum management and key rotation endpoints.
"""

import os
from datetime import datetime
from typing import Dict, Any, List, Optional
from fastapi import APIRouter, HTTPException, Depends, Header
from pydantic import BaseModel, Field
from sqlalchemy import create_engine, Column, String, Integer, DateTime, Boolean, JSON, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from crypto.crypto_adapter import sign_message, verify_signature, generate_keypair, get_private_key_from_env

Base = declarative_base()

class Elder(Base):
    __tablename__ = "elders"
    
    id = Column(String, primary_key=True)
    public_key = Column(Text, unique=True)
    is_active = Column(Boolean, default=True)
    added_at = Column(DateTime, default=datetime.utcnow)
    revoked_at = Column(DateTime, nullable=True)
    metadata = Column(JSON, nullable=True)

# Database setup (reuse engine from main.py)
DB_URL = os.getenv("DB_URL", "postgresql://localhost/drp_api")
engine = create_engine(DB_URL)
Base.metadata.create_all(engine)
SessionLocal = sessionmaker(bind=engine)

router = APIRouter(prefix="/elders", tags=["elders"])

# Pydantic models
class ElderInfo(BaseModel):
    id: str
    public_key: str
    is_active: bool
    added_at: str
    revoked_at: Optional[str] = None

class QuorumState(BaseModel):
    active_elders: List[ElderInfo]
    quorum_threshold: int
    total_elders: int

class RotateRequest(BaseModel):
    new_public_key: str
    admin_key: str

class RevokeRequest(BaseModel):
    elder_id: str
    admin_key: str

class SignBlockRequest(BaseModel):
    block_header: str
    block_hash: str
    timestamp: str

class BlockSignature(BaseModel):
    elder_id: str
    signature: str
    public_key: str

class SignedBlock(BaseModel):
    block_hash: str
    signatures: List[BlockSignature]
    quorum_met: bool

def verify_admin_key(admin_key: str) -> bool:
    """Verify admin key for elder operations."""
    expected_key = os.getenv("ELDER_REGISTRY_ADMIN_KEY", "")
    return admin_key == expected_key

def get_quorum_threshold(total: int) -> int:
    """Calculate quorum threshold (m-of-n)."""
    return (total // 2) + 1  # Simple majority

@router.get("/quorum", response_model=QuorumState)
async def get_quorum_state(db: Session = Depends(lambda: SessionLocal())):
    """Get current quorum state (active elders, threshold)."""
    elders = db.query(Elder).filter(Elder.is_active == True).all()
    
    active_elders = [
        ElderInfo(
            id=elder.id,
            public_key=elder.public_key,
            is_active=elder.is_active,
            added_at=elder.added_at.isoformat(),
            revoked_at=elder.revoked_at.isoformat() if elder.revoked_at else None
        )
        for elder in elders
    ]
    
    threshold = get_quorum_threshold(len(elders))
    
    return QuorumState(
        active_elders=active_elders,
        quorum_threshold=threshold,
        total_elders=len(elders)
    )

@router.post("/rotate")
async def rotate_elder(request: RotateRequest, db: Session = Depends(lambda: SessionLocal())):
    """Rotate elder key (admin-only)."""
    if not verify_admin_key(request.admin_key):
        raise HTTPException(status_code=403, detail="Unauthorized: Invalid admin key")
    
    # Generate new elder ID
    elder_id = f"elder_{datetime.utcnow().timestamp()}"
    
    # Add new elder
    elder = Elder(
        id=elder_id,
        public_key=request.new_public_key,
        is_active=True,
        metadata={"rotated_at": datetime.utcnow().isoformat()}
    )
    db.add(elder)
    db.commit()
    
    return {
        "success": True,
        "elder_id": elder_id,
        "message": "Elder key rotated successfully"
    }

@router.post("/revoke")
async def revoke_elder(request: RevokeRequest, db: Session = Depends(lambda: SessionLocal())):
    """Revoke elder (admin-only)."""
    if not verify_admin_key(request.admin_key):
        raise HTTPException(status_code=403, detail="Unauthorized: Invalid admin key")
    
    elder = db.query(Elder).filter(Elder.id == request.elder_id).first()
    if not elder:
        raise HTTPException(status_code=404, detail="Elder not found")
    
    elder.is_active = False
    elder.revoked_at = datetime.utcnow()
    db.commit()
    
    return {
        "success": True,
        "message": f"Elder {request.elder_id} revoked successfully"
    }

@router.post("/sign-block", response_model=SignedBlock)
async def sign_block(request: SignBlockRequest, db: Session = Depends(lambda: SessionLocal())):
    """Sign a block header using available elder keys (demo - signs with available keys)."""
    elders = db.query(Elder).filter(Elder.is_active == True).all()
    
    if not elders:
        raise HTTPException(status_code=400, detail="No active elders")
    
    # Get admin private key for signing (demo only - in production, each elder signs independently)
    admin_private_key = get_private_key_from_env("ELDER_REGISTRY_ADMIN_KEY")
    if not admin_private_key:
        # Generate temporary key for demo
        _, admin_private_key = generate_keypair("ed25519")
    
    # Sign block header with available keys (demo)
    block_message = f"{request.block_header}:{request.block_hash}:{request.timestamp}".encode()
    signatures = []
    
    # Sign with first N elders (in production, each elder signs independently)
    for elder in elders[:min(3, len(elders))]:  # Sign with first 3 elders for demo
        signature = sign_message("ed25519", admin_private_key, block_message)
        signatures.append(BlockSignature(
            elder_id=elder.id,
            signature=signature.hex() if isinstance(signature, bytes) else signature,
            public_key=elder.public_key
        ))
    
    threshold = get_quorum_threshold(len(elders))
    quorum_met = len(signatures) >= threshold
    
    return SignedBlock(
        block_hash=request.block_hash,
        signatures=signatures,
        quorum_met=quorum_met
    )

