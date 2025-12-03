"""
Governance Routes - Handle governance proposals, voting, and decisions.
"""

import logging
from typing import List, Optional
from datetime import datetime
from uuid import uuid4
from fastapi import APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel, Field

from ..services.blockchain_service import BlockchainService

logger = logging.getLogger(__name__)

router = APIRouter()


# Pydantic Models
class Proposal(BaseModel):
    """Governance proposal."""
    proposal_id: str
    title: str
    description: str
    proposer: str
    proposal_type: str = Field(..., description="protocol_change, treasury, parameter, etc.")
    status: str = Field(default="draft", description="draft, active, passed, rejected")
    created_at: str
    voting_end: Optional[str] = None
    votes_for: int = 0
    votes_against: int = 0
    abstain: int = 0


class CreateProposalRequest(BaseModel):
    """Create proposal request."""
    title: str
    description: str
    proposer: str
    proposal_type: str
    voting_period_days: int = Field(default=7, ge=1, le=30)


class VoteRequest(BaseModel):
    """Vote on proposal request."""
    proposal_id: str
    voter: str
    vote: str = Field(..., description="'for', 'against', or 'abstain'")
    signature: Optional[str] = None


class VoteResponse(BaseModel):
    """Vote response."""
    success: bool
    tx_hash: Optional[str] = None
    message: str


def get_blockchain_service(request: Request) -> BlockchainService:
    """Dependency to get blockchain service."""
    if not hasattr(request.app.state, "blockchain_service"):
        raise HTTPException(status_code=503, detail="Blockchain service not available")
    return request.app.state.blockchain_service


@router.post("/proposals", response_model=Proposal)
async def create_proposal(
    request: CreateProposalRequest,
    blockchain_service: BlockchainService = Depends(get_blockchain_service)
):
    """
    Create a new governance proposal.
    
    Proposals can be:
    - Protocol changes
    - Treasury spending
    - Parameter adjustments
    - Ecosystem initiatives
    """
    try:
        proposal_id = str(uuid4())
        
        proposal_data = await blockchain_service.create_proposal(
            proposal_id=proposal_id,
            title=request.title,
            description=request.description,
            proposer=request.proposer,
            proposal_type=request.proposal_type,
            voting_period_days=request.voting_period_days
        )
        
        return Proposal(
            proposal_id=proposal_id,
            title=request.title,
            description=request.description,
            proposer=request.proposer,
            proposal_type=request.proposal_type,
            status="active",
            created_at=datetime.utcnow().isoformat(),
            voting_end=proposal_data.get("voting_end"),
            votes_for=0,
            votes_against=0,
            abstain=0
        )
    except Exception as e:
        logger.error(f"Error creating proposal: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to create proposal: {str(e)}")


@router.get("/proposals", response_model=List[Proposal])
async def get_proposals(
    status: Optional[str] = None,
    limit: int = 50,
    offset: int = 0,
    blockchain_service: BlockchainService = Depends(get_blockchain_service)
):
    """
    Get all governance proposals.
    
    - **status**: Filter by status (draft, active, passed, rejected)
    - **limit**: Maximum number of proposals to return
    - **offset**: Pagination offset
    """
    try:
        proposals_data = await blockchain_service.get_proposals(status, limit, offset)
        
        return [
            Proposal(
                proposal_id=prop["proposal_id"],
                title=prop["title"],
                description=prop["description"],
                proposer=prop["proposer"],
                proposal_type=prop["proposal_type"],
                status=prop.get("status", "draft"),
                created_at=prop.get("created_at", datetime.utcnow().isoformat()),
                voting_end=prop.get("voting_end"),
                votes_for=prop.get("votes_for", 0),
                votes_against=prop.get("votes_against", 0),
                abstain=prop.get("abstain", 0)
            )
            for prop in proposals_data
        ]
    except Exception as e:
        logger.error(f"Error fetching proposals: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch proposals: {str(e)}")


@router.get("/proposals/{proposal_id}", response_model=Proposal)
async def get_proposal(
    proposal_id: str,
    blockchain_service: BlockchainService = Depends(get_blockchain_service)
):
    """Get a specific governance proposal by ID."""
    try:
        proposal_data = await blockchain_service.get_proposal(proposal_id)
        
        if not proposal_data:
            raise HTTPException(status_code=404, detail="Proposal not found")
        
        return Proposal(
            proposal_id=proposal_data["proposal_id"],
            title=proposal_data["title"],
            description=proposal_data["description"],
            proposer=proposal_data["proposer"],
            proposal_type=proposal_data["proposal_type"],
            status=proposal_data.get("status", "draft"),
            created_at=proposal_data.get("created_at", datetime.utcnow().isoformat()),
            voting_end=proposal_data.get("voting_end"),
            votes_for=proposal_data.get("votes_for", 0),
            votes_against=proposal_data.get("votes_against", 0),
            abstain=proposal_data.get("abstain", 0)
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching proposal: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch proposal: {str(e)}")


@router.post("/proposals/{proposal_id}/vote", response_model=VoteResponse)
async def vote_on_proposal(
    proposal_id: str,
    vote_request: VoteRequest,
    blockchain_service: BlockchainService = Depends(get_blockchain_service)
):
    """
    Vote on a governance proposal.
    
    - **vote**: 'for', 'against', or 'abstain'
    - **signature**: Cryptographic signature for vote verification
    """
    try:
        # Validate vote
        if vote_request.vote not in ["for", "against", "abstain"]:
            raise HTTPException(status_code=400, detail="Invalid vote value")
        
        # Submit vote
        result = await blockchain_service.vote_on_proposal(
            proposal_id=proposal_id,
            voter=vote_request.voter,
            vote=vote_request.vote,
            signature=vote_request.signature
        )
        
        return VoteResponse(
            success=result["success"],
            tx_hash=result.get("tx_hash"),
            message=result.get("message", "Vote submitted successfully")
        )
    except Exception as e:
        logger.error(f"Error voting on proposal: {e}")
        raise HTTPException(status_code=500, detail=f"Vote failed: {str(e)}")


@router.get("/proposals/{proposal_id}/results")
async def get_proposal_results(
    proposal_id: str,
    blockchain_service: BlockchainService = Depends(get_blockchain_service)
):
    """Get detailed voting results for a proposal."""
    try:
        results = await blockchain_service.get_proposal_results(proposal_id)
        return results
    except Exception as e:
        logger.error(f"Error fetching proposal results: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch results: {str(e)}")


