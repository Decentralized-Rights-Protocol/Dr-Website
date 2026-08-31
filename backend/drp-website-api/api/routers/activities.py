"""
Activity routes - claims, evidence commitments, and verification workflow.

AI may assist assessment, but it does not independently create an irreversible
rights-bearing attestation or mint rewards. Approved rewards must follow review.
"""
import logging
from typing import List, Optional, Dict, Any
from datetime import datetime
from uuid import uuid4
from fastapi import APIRouter, HTTPException, Depends, BackgroundTasks, Request
from pydantic import BaseModel, Field
from ..services.blockchain_service import BlockchainService
from ..services.ai_service import AIService

logger = logging.getLogger(__name__)
router = APIRouter()

class ActivitySubmission(BaseModel):
    title: str
    description: str
    location: Optional[str] = None
    timestamp: str
    media_cid: Optional[str] = None
    hash: str = Field(..., min_length=32)
    actor_id: str
    activity_type: str = Field(default="poat", description="'poat' or 'post'")

class StatusSubmission(BaseModel):
    category: str
    issuer: str
    reference_code: Optional[str] = None
    credential_cid: str
    actor_id: str

class SubmissionResponse(BaseModel):
    submission_id: str
    status: str
    cid: str
    ipfs_cid: Optional[str] = None
    timestamp: str
    ai_verdict: Optional[str] = None
    ai_score: Optional[float] = None

class ActivityStatus(BaseModel):
    submission_id: str
    status: str
    verified: bool
    ai_verdict: Optional[str] = None
    ai_score: Optional[float] = None
    tx_hash: Optional[str] = None
    reward_amount: Optional[float] = None
    timestamp: str

def get_blockchain_service(request: Request) -> BlockchainService:
    if not hasattr(request.app.state, "blockchain_service"):
        raise HTTPException(status_code=503, detail="Blockchain service not available")
    return request.app.state.blockchain_service

def get_ai_service(request: Request) -> Optional[AIService]:
    return getattr(request.app.state, "ai_service", None)

@router.post("/submit", response_model=SubmissionResponse)
async def submit_activity(submission: ActivitySubmission, background_tasks: BackgroundTasks, blockchain_service: BlockchainService = Depends(get_blockchain_service), ai_service: Optional[AIService] = Depends(get_ai_service)):
    """Create a claim and queue verification. Submission never self-approves."""
    try:
        submission_id = str(uuid4())
        submission_data = {"submission_id": submission_id, "type": submission.activity_type, "data": submission.model_dump(), "timestamp": datetime.utcnow().isoformat()}
        ipfs_cid = await blockchain_service.store_on_ipfs(submission_data)
        if ai_service:
            background_tasks.add_task(verify_activity_async, submission_id, submission_data, ai_service, blockchain_service)
        return SubmissionResponse(submission_id=submission_id, status="pending_review", cid=submission_id, ipfs_cid=ipfs_cid or None, timestamp=datetime.utcnow().isoformat())
    except Exception as exc:
        logger.exception("Error submitting activity")
        raise HTTPException(status_code=500, detail="Submission failed") from exc

async def verify_activity_async(submission_id: str, submission_data: Dict[str, Any], ai_service: AIService, blockchain_service: BlockchainService):
    """Run AI assistance only; do not mint rewards from an AI verdict."""
    try:
        assessment = await ai_service.assess_activity(submission_data)
        logger.info("AI assessment queued for review: submission=%s verdict=%s score=%s", submission_id, assessment.get("verdict"), assessment.get("score"))
        # No process_reward() call. Finality requires a review/attestation step.
    except Exception:
        logger.exception("Error assisting verification for %s", submission_id)

@router.get("/status/{submission_id}", response_model=ActivityStatus)
async def get_activity_status(submission_id: str, blockchain_service: BlockchainService = Depends(get_blockchain_service)):
    try:
        status_data = await blockchain_service.get_submission_status(submission_id)
        return ActivityStatus(submission_id=submission_id, status=status_data.get("status", "pending_review"), verified=status_data.get("verified", False), ai_verdict=status_data.get("ai_verdict"), ai_score=status_data.get("ai_score"), tx_hash=status_data.get("tx_hash"), reward_amount=status_data.get("reward_amount"), timestamp=status_data.get("timestamp", datetime.utcnow().isoformat()))
    except Exception as exc:
        logger.exception("Error fetching activity status")
        raise HTTPException(status_code=500, detail="Failed to fetch status") from exc

@router.get("/user/{actor_id}", response_model=List[ActivityStatus])
async def get_user_activities(actor_id: str, limit: int = 50, offset: int = 0, blockchain_service: BlockchainService = Depends(get_blockchain_service)):
    try:
        activities = await blockchain_service.get_user_activities(actor_id, limit, offset)
        return [ActivityStatus(submission_id=act["submission_id"], status=act.get("status", "pending_review"), verified=act.get("verified", False), ai_verdict=act.get("ai_verdict"), ai_score=act.get("ai_score"), tx_hash=act.get("tx_hash"), reward_amount=act.get("reward_amount"), timestamp=act.get("timestamp", datetime.utcnow().isoformat())) for act in activities]
    except Exception as exc:
        logger.exception("Error fetching user activities")
        raise HTTPException(status_code=500, detail="Failed to fetch activities") from exc
