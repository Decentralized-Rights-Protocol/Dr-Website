"""
Token Routes - Handle token balances, rights, and token-related operations.
"""

import logging
from typing import List, Optional
from datetime import datetime
from fastapi import APIRouter, HTTPException, Depends, Header, Request
from pydantic import BaseModel, Field

from ..services.blockchain_service import BlockchainService

logger = logging.getLogger(__name__)

router = APIRouter()


# Pydantic Models
class TokenBalance(BaseModel):
    """Token balance response."""
    address: str
    token_type: str = Field(..., description="'RIGHTS' or 'DERI'")
    balance: str = Field(..., description="Balance in wei/smallest unit")
    balance_formatted: float = Field(..., description="Balance in human-readable format")
    symbol: str
    network: str = "mainnet"
    last_updated: str


class RightsInfo(BaseModel):
    """Rights information for a user."""
    address: str
    rights: List[str] = Field(default_factory=list, description="List of rights identifiers")
    verified: bool = False
    verification_level: int = Field(0, ge=0, le=5)


class TransferRequest(BaseModel):
    """Token transfer request."""
    from_address: str
    to_address: str
    amount: str
    token_type: str = Field(..., description="'RIGHTS' or 'DERI'")
    signature: Optional[str] = None


class TransferResponse(BaseModel):
    """Token transfer response."""
    success: bool
    tx_hash: Optional[str] = None
    message: str


def get_blockchain_service(request: Request) -> BlockchainService:
    """Dependency to get blockchain service."""
    if not hasattr(request.app.state, "blockchain_service"):
        raise HTTPException(status_code=503, detail="Blockchain service not available")
    return request.app.state.blockchain_service


@router.get("/balance/{address}", response_model=TokenBalance)
async def get_token_balance(
    address: str,
    token_type: str = "DERI",
    blockchain_service: BlockchainService = Depends(get_blockchain_service)
):
    """
    Get token balance for an address.
    
    - **address**: Wallet address (0x...)
    - **token_type**: Token type ('RIGHTS' or 'DERI')
    
    Returns balance in both wei and human-readable format.
    """
    try:
        # Validate address format
        if not address.startswith("0x") or len(address) != 42:
            raise HTTPException(status_code=400, detail="Invalid address format")
        
        # Get balance from blockchain
        balance_data = await blockchain_service.get_token_balance(address, token_type)
        
        return TokenBalance(
            address=address,
            token_type=token_type,
            balance=balance_data["balance"],
            balance_formatted=balance_data["balance_formatted"],
            symbol=balance_data["symbol"],
            network=balance_data.get("network", "mainnet"),
            last_updated=datetime.utcnow().isoformat()
        )
    except Exception as e:
        logger.error(f"Error fetching token balance: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch balance: {str(e)}")


@router.get("/balances/{address}", response_model=List[TokenBalance])
async def get_all_balances(
    address: str,
    blockchain_service: BlockchainService = Depends(get_blockchain_service)
):
    """
    Get all token balances for an address (both RIGHTS and DERI).
    """
    try:
        balances = []
        
        # Get RIGHTS balance
        try:
            rights_balance = await blockchain_service.get_token_balance(address, "RIGHTS")
            balances.append(TokenBalance(
                address=address,
                token_type="RIGHTS",
                balance=rights_balance["balance"],
                balance_formatted=rights_balance["balance_formatted"],
                symbol=rights_balance["symbol"],
                network=rights_balance.get("network", "mainnet"),
                last_updated=datetime.utcnow().isoformat()
            ))
        except Exception as e:
            logger.warning(f"Failed to fetch RIGHTS balance: {e}")
        
        # Get DERI balance
        try:
            deri_balance = await blockchain_service.get_token_balance(address, "DERI")
            balances.append(TokenBalance(
                address=address,
                token_type="DERI",
                balance=deri_balance["balance"],
                balance_formatted=deri_balance["balance_formatted"],
                symbol=deri_balance["symbol"],
                network=deri_balance.get("network", "mainnet"),
                last_updated=datetime.utcnow().isoformat()
            ))
        except Exception as e:
            logger.warning(f"Failed to fetch DERI balance: {e}")
        
        return balances
    except Exception as e:
        logger.error(f"Error fetching all balances: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch balances: {str(e)}")


@router.get("/rights/{address}", response_model=RightsInfo)
async def get_rights(
    address: str,
    blockchain_service: BlockchainService = Depends(get_blockchain_service)
):
    """
    Get rights information for an address.
    
    Returns list of rights, verification status, and verification level.
    """
    try:
        rights_data = await blockchain_service.get_rights(address)
        
        return RightsInfo(
            address=address,
            rights=rights_data.get("rights", []),
            verified=rights_data.get("verified", False),
            verification_level=rights_data.get("verification_level", 0)
        )
    except Exception as e:
        logger.error(f"Error fetching rights: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch rights: {str(e)}")


@router.post("/transfer", response_model=TransferResponse)
async def transfer_tokens(
    request: TransferRequest,
    blockchain_service: BlockchainService = Depends(get_blockchain_service)
):
    """
    Transfer tokens between addresses.
    
    Requires signature verification for security.
    """
    try:
        # Validate addresses
        for addr in [request.from_address, request.to_address]:
            if not addr.startswith("0x") or len(addr) != 42:
                raise HTTPException(status_code=400, detail=f"Invalid address format: {addr}")
        
        # Execute transfer
        result = await blockchain_service.transfer_tokens(
            from_address=request.from_address,
            to_address=request.to_address,
            amount=request.amount,
            token_type=request.token_type,
            signature=request.signature
        )
        
        return TransferResponse(
            success=result["success"],
            tx_hash=result.get("tx_hash"),
            message=result.get("message", "Transfer completed")
        )
    except Exception as e:
        logger.error(f"Error transferring tokens: {e}")
        raise HTTPException(status_code=500, detail=f"Transfer failed: {str(e)}")

