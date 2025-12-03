"""
User Routes - Handle user profiles and related operations.
"""

import logging
from typing import Optional
from fastapi import APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel, Field

from ..services.blockchain_service import BlockchainService

logger = logging.getLogger(__name__)

router = APIRouter()


# Pydantic Models
class UserProfile(BaseModel):
    """User profile model."""
    address: str
    username: Optional[str] = None
    bio: Optional[str] = None
    avatar_cid: Optional[str] = None
    joined_date: str
    total_activities: int = 0
    total_rewards: float = 0.0
    verification_level: int = Field(0, ge=0, le=5)
    badges: list = Field(default_factory=list)


class UpdateProfileRequest(BaseModel):
    """Update profile request."""
    username: Optional[str] = None
    bio: Optional[str] = None
    avatar_cid: Optional[str] = None


def get_blockchain_service(request: Request) -> BlockchainService:
    """Dependency to get blockchain service."""
    if not hasattr(request.app.state, "blockchain_service"):
        raise HTTPException(status_code=503, detail="Blockchain service not available")
    return request.app.state.blockchain_service


@router.get("/{address}", response_model=UserProfile)
async def get_user_profile(
    address: str,
    blockchain_service: BlockchainService = Depends(get_blockchain_service)
):
    """Get user profile by address."""
    try:
        # Validate address
        if not address.startswith("0x") or len(address) != 42:
            raise HTTPException(status_code=400, detail="Invalid address format")
        
        # Get user data
        user_data = await blockchain_service.get_user_profile(address)
        
        return UserProfile(
            address=address,
            username=user_data.get("username"),
            bio=user_data.get("bio"),
            avatar_cid=user_data.get("avatar_cid"),
            joined_date=user_data.get("joined_date", ""),
            total_activities=user_data.get("total_activities", 0),
            total_rewards=user_data.get("total_rewards", 0.0),
            verification_level=user_data.get("verification_level", 0),
            badges=user_data.get("badges", [])
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching user profile: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch profile: {str(e)}")


@router.put("/{address}", response_model=UserProfile)
async def update_user_profile(
    address: str,
    update: UpdateProfileRequest,
    blockchain_service: BlockchainService = Depends(get_blockchain_service)
):
    """Update user profile."""
    try:
        # Validate address
        if not address.startswith("0x") or len(address) != 42:
            raise HTTPException(status_code=400, detail="Invalid address format")
        
        # Update profile
        updated_profile = await blockchain_service.update_user_profile(
            address=address,
            updates=update.dict(exclude_none=True)
        )
        
        return UserProfile(
            address=address,
            username=updated_profile.get("username"),
            bio=updated_profile.get("bio"),
            avatar_cid=updated_profile.get("avatar_cid"),
            joined_date=updated_profile.get("joined_date", ""),
            total_activities=updated_profile.get("total_activities", 0),
            total_rewards=updated_profile.get("total_rewards", 0.0),
            verification_level=updated_profile.get("verification_level", 0),
            badges=updated_profile.get("badges", [])
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating user profile: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to update profile: {str(e)}")


