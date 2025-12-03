"""
Explorer Routes - Handle blockchain explorer data and transaction queries.
"""

import logging
from typing import List, Optional
from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel, Field

from ..services.blockchain_service import BlockchainService

logger = logging.getLogger(__name__)

router = APIRouter()


# Pydantic Models
class Transaction(BaseModel):
    """Transaction model."""
    tx_hash: str
    from_address: str
    to_address: Optional[str] = None
    value: str
    token_type: str = Field(..., description="'RIGHTS' or 'DERI'")
    type: str = Field(..., description="transfer, mint, burn, governance, etc.")
    status: str = Field(default="pending", description="pending, confirmed, failed")
    block_number: Optional[int] = None
    timestamp: str
    gas_used: Optional[int] = None
    ai_verdict: Optional[str] = None


class Block(BaseModel):
    """Block model."""
    block_number: int
    block_hash: str
    timestamp: str
    transaction_count: int
    gas_used: int
    validator: Optional[str] = None


class ActivityFeed(BaseModel):
    """Activity feed item."""
    id: str
    type: str = Field(..., description="transaction, activity, governance, etc.")
    title: str
    description: str
    actor: str
    timestamp: str
    metadata: Optional[dict] = None


def get_blockchain_service(request: Request) -> BlockchainService:
    """Dependency to get blockchain service."""
    if not hasattr(request.app.state, "blockchain_service"):
        raise HTTPException(status_code=503, detail="Blockchain service not available")
    return request.app.state.blockchain_service


@router.get("/transactions", response_model=List[Transaction])
async def get_transactions(
    address: Optional[str] = None,
    limit: int = 50,
    offset: int = 0,
    blockchain_service: BlockchainService = Depends(get_blockchain_service)
):
    """
    Get recent transactions.
    
    - **address**: Filter by address (optional)
    - **limit**: Maximum number of transactions
    - **offset**: Pagination offset
    """
    try:
        transactions_data = await blockchain_service.get_transactions(
            address=address,
            limit=limit,
            offset=offset
        )
        
        return [
            Transaction(
                tx_hash=tx["tx_hash"],
                from_address=tx["from_address"],
                to_address=tx.get("to_address"),
                value=tx["value"],
                token_type=tx.get("token_type", "DERI"),
                type=tx.get("type", "transfer"),
                status=tx.get("status", "confirmed"),
                block_number=tx.get("block_number"),
                timestamp=tx.get("timestamp", datetime.utcnow().isoformat()),
                gas_used=tx.get("gas_used"),
                ai_verdict=tx.get("ai_verdict")
            )
            for tx in transactions_data
        ]
    except Exception as e:
        logger.error(f"Error fetching transactions: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch transactions: {str(e)}")


@router.get("/transactions/{tx_hash}", response_model=Transaction)
async def get_transaction(
    tx_hash: str,
    blockchain_service: BlockchainService = Depends(get_blockchain_service)
):
    """Get a specific transaction by hash."""
    try:
        tx_data = await blockchain_service.get_transaction(tx_hash)
        
        if not tx_data:
            raise HTTPException(status_code=404, detail="Transaction not found")
        
        return Transaction(
            tx_hash=tx_data["tx_hash"],
            from_address=tx_data["from_address"],
            to_address=tx_data.get("to_address"),
            value=tx_data["value"],
            token_type=tx_data.get("token_type", "DERI"),
            type=tx_data.get("type", "transfer"),
            status=tx_data.get("status", "confirmed"),
            block_number=tx_data.get("block_number"),
            timestamp=tx_data.get("timestamp", datetime.utcnow().isoformat()),
            gas_used=tx_data.get("gas_used"),
            ai_verdict=tx_data.get("ai_verdict")
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching transaction: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch transaction: {str(e)}")


@router.get("/blocks", response_model=List[Block])
async def get_blocks(
    limit: int = 20,
    offset: int = 0,
    blockchain_service: BlockchainService = Depends(get_blockchain_service)
):
    """Get recent blocks."""
    try:
        blocks_data = await blockchain_service.get_blocks(limit, offset)
        
        return [
            Block(
                block_number=block["block_number"],
                block_hash=block["block_hash"],
                timestamp=block.get("timestamp", datetime.utcnow().isoformat()),
                transaction_count=block.get("transaction_count", 0),
                gas_used=block.get("gas_used", 0),
                validator=block.get("validator")
            )
            for block in blocks_data
        ]
    except Exception as e:
        logger.error(f"Error fetching blocks: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch blocks: {str(e)}")


@router.get("/activity", response_model=List[ActivityFeed])
async def get_activity_feed(
    limit: int = 50,
    blockchain_service: BlockchainService = Depends(get_blockchain_service)
):
    """
    Get activity feed combining transactions, activities, and governance events.
    """
    try:
        activities = await blockchain_service.get_activity_feed(limit)
        
        return [
            ActivityFeed(
                id=act["id"],
                type=act["type"],
                title=act["title"],
                description=act.get("description", ""),
                actor=act["actor"],
                timestamp=act.get("timestamp", datetime.utcnow().isoformat()),
                metadata=act.get("metadata")
            )
            for act in activities
        ]
    except Exception as e:
        logger.error(f"Error fetching activity feed: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch activity feed: {str(e)}")


@router.get("/stats")
async def get_explorer_stats(
    blockchain_service: BlockchainService = Depends(get_blockchain_service)
):
    """Get explorer statistics."""
    try:
        stats = await blockchain_service.get_explorer_stats()
        return stats
    except Exception as e:
        logger.error(f"Error fetching explorer stats: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch stats: {str(e)}")


