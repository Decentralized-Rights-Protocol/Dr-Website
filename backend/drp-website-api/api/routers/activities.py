"""
Activity Routes - Handle activity submissions, proofs, and verifications.
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


# Pydantic Models
class ActivitySubmission(BaseModel):
    """Activity submission request."""
    title: str
    description: str
    location: Optional[str] = None
    timestamp: str
    media_cid: Optional[str] = None
    hash: str
    actor_id: str
    activity_type: str = Field(default="poat", description="'poat' or 'post'")


class StatusSubmission(BaseModel):
    """Status/credential submission request."""
    category: str = Field(..., description="identity, education, certification, membership, etc.")
    issuer: str
    reference_code: Optional[str] = None
    credential_cid: str
    actor_id: str


class SubmissionResponse(BaseModel):
    """Submission response."""
    submission_id: str
    status: str = Field(..., description="pending, verified, rejected")
    cid: str
    ipfs_cid: Optional[str] = None
    timestamp: str
    ai_verdict: Optional[str] = None
    ai_score: Optional[float] = None


class ActivityStatus(BaseModel):
    """Activity status response."""
    submission_id: str
    status: str
    verified: bool
    ai_verdict: Optional[str] = None
    ai_score: Optional[float] = None
    tx_hash: Optional[str] = None
    reward_amount: Optional[float] = None
    timestamp: str


def get_blockchain_service(request: Request) -> BlockchainService:
    """Dependency to get blockchain service."""
    if not hasattr(request.app.state, "blockchain_service"):
        raise HTTPException(status_code=503, detail="Blockchain service not available")
    return request.app.state.blockchain_service


def get_ai_service(request: Request) -> Optional[AIService]:
    """Dependency to get AI service (optional)."""
    return getattr(request.app.state, "ai_service", None)


@router.post("/submit", response_model=SubmissionResponse)
async def submit_activity(
    submission: ActivitySubmission,
    background_tasks: BackgroundTasks,
    blockchain_service: BlockchainService = Depends(get_blockchain_service),
    ai_service: Optional[AIService] = Depends(get_ai_service)
):
    """
    Submit an activity (PoAT) or status (PoST) claim.
    
    The submission will be:
    1. Stored on IPFS
    2. Verified by AI (if enabled)
    3. Processed asynchronously
    4. Rewarded if approved
    """
    try:
        submission_id = str(uuid4())
        
        # Prepare submission data
        submission_data = {
            "submission_id": submission_id,
            "type": submission.activity_type,
            "data": submission.dict(),
            "timestamp": datetime.utcnow().isoformat()
        }
        
        # Store on IPFS
        ipfs_cid = await blockchain_service.store_on_ipfs(submission_data)
        
        # Queue AI verification if enabled
        if ai_service:
            background_tasks.add_task(
                verify_activity_async,
                submission_id,
                submission_data,
                ai_service,
                blockchain_service
            )
        
        return SubmissionResponse(
            submission_id=submission_id,
            status="pending",
            cid=submission_id,
            ipfs_cid=ipfs_cid,
            timestamp=datetime.utcnow().isoformat()
        )
    except Exception as e:
        logger.error(f"Error submitting activity: {e}")
        raise HTTPException(status_code=500, detail=f"Submission failed: {str(e)}")


async def verify_activity_async(
    submission_id: str,
    submission_data: Dict[str, Any],
    ai_service: AIService,
    blockchain_service: BlockchainService
):
    """Background task to verify activity with AI."""
    try:
        # Get AI assessment
        assessment = await ai_service.assess_activity(submission_data)
        
        # Update submission status
        if assessment["verdict"] == "approved":
            # Reward the user
            reward_amount = assessment.get("score", 0) * 10  # 10 tokens per score point
            await blockchain_service.process_reward(
                actor_id=submission_data["data"]["actor_id"],
                amount=reward_amount,
                submission_id=submission_id
            )
        
        logger.info(f"Activity {submission_id} verified: {assessment['verdict']}")
    except Exception as e:
        logger.error(f"Error verifying activity {submission_id}: {e}")


@router.get("/status/{submission_id}", response_model=ActivityStatus)
async def get_activity_status(
    submission_id: str,
    blockchain_service: BlockchainService = Depends(get_blockchain_service)
):
    """Get the status of an activity submission."""
    try:
        status_data = await blockchain_service.get_submission_status(submission_id)
        
        return ActivityStatus(
            submission_id=submission_id,
            status=status_data.get("status", "pending"),
            verified=status_data.get("verified", False),
            ai_verdict=status_data.get("ai_verdict"),
            ai_score=status_data.get("ai_score"),
            tx_hash=status_data.get("tx_hash"),
            reward_amount=status_data.get("reward_amount"),
            timestamp=status_data.get("timestamp", datetime.utcnow().isoformat())
        )
    except Exception as e:
        logger.error(f"Error fetching activity status: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch status: {str(e)}")


@router.get("/user/{actor_id}", response_model=List[ActivityStatus])
async def get_user_activities(
    actor_id: str,
    limit: int = 50,
    offset: int = 0,
    blockchain_service: BlockchainService = Depends(get_blockchain_service)
):
    """Get all activities for a specific user."""
    try:
        activities = await blockchain_service.get_user_activities(actor_id, limit, offset)
        
        return [
            ActivityStatus(
                submission_id=act["submission_id"],
                status=act.get("status", "pending"),
                verified=act.get("verified", False),
                ai_verdict=act.get("ai_verdict"),
                ai_score=act.get("ai_score"),
                tx_hash=act.get("tx_hash"),
                reward_amount=act.get("reward_amount"),
                timestamp=act.get("timestamp", datetime.utcnow().isoformat())
            )
            for act in activities
        ]
    except Exception as e:
        logger.error(f"Error fetching user activities: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch activities: {str(e)}")


