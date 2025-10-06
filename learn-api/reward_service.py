"""
DRP Learn-to-Earn Reward Service
Handles testnet $DeRi token rewards for course completion
"""

import os
import json
import logging
from typing import Dict, List, Optional, Any
from datetime import datetime, timedelta
from dataclasses import dataclass
from web3 import Web3
from eth_account import Account
import requests
from fastapi import HTTPException, Depends
from pydantic import BaseModel

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class RewardConfig:
    """Configuration for reward system"""
    # Network configuration
    network_name: str = "sepolia"  # or "mumbai" for Polygon
    rpc_url: str = os.getenv("RPC_URL", "https://sepolia.infura.io/v3/YOUR_INFURA_KEY")
    chain_id: int = int(os.getenv("CHAIN_ID", "11155111"))  # Sepolia
    
    # Contract configuration
    contract_address: str = os.getenv("DERI_CONTRACT_ADDRESS", "")
    contract_abi: str = os.getenv("DERI_CONTRACT_ABI", "")
    
    # Wallet configuration (SECURE: Use environment variables in production)
    signer_private_key: str = os.getenv("SIGNER_PRIVATE_KEY", "")
    signer_address: str = os.getenv("SIGNER_ADDRESS", "")
    
    # Reward amounts (in wei)
    lesson_completion: int = 10 * 10**18  # 10 tokens
    quiz_perfect: int = 5 * 10**18       # 5 tokens
    achievement_unlock: int = 25 * 10**18 # 25 tokens
    level_completion: int = 50 * 10**18   # 50 tokens
    streak_bonus: int = 15 * 10**18       # 15 tokens
    
    # Security limits
    max_reward_per_user_per_day: int = 1000 * 10**18  # 1000 tokens
    max_reward_per_transaction: int = 100 * 10**18    # 100 tokens

class RewardRequest(BaseModel):
    """Request model for reward distribution"""
    wallet_address: str
    activity_type: str  # lesson_completion, quiz_perfect, etc.
    lesson_id: Optional[str] = None
    score: Optional[int] = None
    metadata: Optional[Dict[str, Any]] = None

class RewardResponse(BaseModel):
    """Response model for reward distribution"""
    success: bool
    transaction_hash: Optional[str] = None
    reward_amount: Optional[int] = None
    message: str
    error: Optional[str] = None

class RewardService:
    """Service for handling testnet $DeRi token rewards"""
    
    def __init__(self):
        self.config = RewardConfig()
        self.w3 = Web3(Web3.HTTPProvider(self.config.rpc_url))
        self.account = Account.from_key(self.config.signer_private_key) if self.config.signer_private_key else None
        self.contract = None
        self._load_contract()
        
        # ScyllaDB connection (placeholder - implement based on your ScyllaDB setup)
        self.db_session = None
        self._init_database()
    
    def _load_contract(self):
        """Load the DeRiTestToken contract"""
        if not self.config.contract_address or not self.config.contract_abi:
            logger.warning("Contract address or ABI not configured")
            return
            
        try:
            # Load contract ABI from environment or file
            if self.config.contract_abi.startswith("{"):
                abi = json.loads(self.config.contract_abi)
            else:
                # Load from file path
                with open(self.config.contract_abi, 'r') as f:
                    abi = json.load(f)
            
            self.contract = self.w3.eth.contract(
                address=self.config.contract_address,
                abi=abi
            )
            logger.info(f"Contract loaded: {self.config.contract_address}")
        except Exception as e:
            logger.error(f"Failed to load contract: {e}")
    
    def _init_database(self):
        """Initialize ScyllaDB connection"""
        # TODO: Implement ScyllaDB connection based on your setup
        # This is a placeholder for the actual ScyllaDB implementation
        logger.info("ScyllaDB connection initialized (placeholder)")
    
    def _log_reward_to_database(self, reward_data: Dict[str, Any]):
        """Log reward transaction to ScyllaDB"""
        try:
            # TODO: Implement actual ScyllaDB logging
            # Example structure:
            reward_log = {
                "wallet_address": reward_data["wallet_address"],
                "activity_type": reward_data["activity_type"],
                "reward_amount": reward_data["reward_amount"],
                "transaction_hash": reward_data.get("transaction_hash"),
                "timestamp": datetime.utcnow().isoformat(),
                "lesson_id": reward_data.get("lesson_id"),
                "score": reward_data.get("score"),
                "metadata": reward_data.get("metadata", {})
            }
            
            # Insert into ScyllaDB
            # self.db_session.execute("INSERT INTO reward_logs ...", reward_log)
            logger.info(f"Reward logged to database: {reward_log}")
        except Exception as e:
            logger.error(f"Failed to log reward to database: {e}")
    
    def _calculate_reward_amount(self, activity_type: str, score: Optional[int] = None) -> int:
        """Calculate reward amount based on activity type and score"""
        base_rewards = {
            "lesson_completion": self.config.lesson_completion,
            "quiz_perfect": self.config.quiz_perfect,
            "achievement_unlock": self.config.achievement_unlock,
            "level_completion": self.config.level_completion,
            "streak_bonus": self.config.streak_bonus
        }
        
        base_amount = base_rewards.get(activity_type, 0)
        
        if score is not None and activity_type == "lesson_completion":
            # Apply score-based multiplier
            if score >= 90:
                return base_amount + (base_amount * 20 // 100)  # 20% bonus
            elif score >= 80:
                return base_amount + (base_amount * 10 // 100)  # 10% bonus
            elif score >= 70:
                return base_amount  # Base reward
            else:
                return 0  # No reward for <70%
        
        return base_amount
    
    def _check_daily_limit(self, wallet_address: str, amount: int) -> bool:
        """Check if user has exceeded daily reward limit"""
        # TODO: Implement daily limit checking with ScyllaDB
        # This is a placeholder
        return True
    
    def _send_reward_transaction(self, wallet_address: str, amount: int, reason: str) -> Optional[str]:
        """Send reward transaction to blockchain"""
        if not self.contract or not self.account:
            logger.error("Contract or account not configured")
            return None
        
        try:
            # Check if we have enough balance
            balance = self.contract.functions.balanceOf(self.account.address).call()
            if balance < amount:
                logger.error(f"Insufficient balance: {balance} < {amount}")
                return None
            
            # Build transaction
            transaction = self.contract.functions.distributeReward(
                wallet_address,
                amount,
                reason
            ).build_transaction({
                'from': self.account.address,
                'gas': 200000,
                'gasPrice': self.w3.eth.gas_price,
                'nonce': self.w3.eth.get_transaction_count(self.account.address),
            })
            
            # Sign and send transaction
            signed_txn = self.w3.eth.account.sign_transaction(transaction, self.config.signer_private_key)
            tx_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
            
            # Wait for transaction receipt
            receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
            
            if receipt.status == 1:
                logger.info(f"Reward transaction successful: {tx_hash.hex()}")
                return tx_hash.hex()
            else:
                logger.error(f"Reward transaction failed: {tx_hash.hex()}")
                return None
                
        except Exception as e:
            logger.error(f"Failed to send reward transaction: {e}")
            return None
    
    async def distribute_reward(self, request: RewardRequest) -> RewardResponse:
        """Distribute reward to user"""
        try:
            # Validate wallet address
            if not self.w3.is_address(request.wallet_address):
                return RewardResponse(
                    success=False,
                    message="Invalid wallet address",
                    error="Invalid wallet address format"
                )
            
            # Calculate reward amount
            reward_amount = self._calculate_reward_amount(request.activity_type, request.score)
            
            if reward_amount == 0:
                return RewardResponse(
                    success=False,
                    message="No reward for this activity/score",
                    error="Score too low or invalid activity type"
                )
            
            # Check daily limits
            if not self._check_daily_limit(request.wallet_address, reward_amount):
                return RewardResponse(
                    success=False,
                    message="Daily reward limit exceeded",
                    error="User has exceeded daily reward limit"
                )
            
            # Send reward transaction
            reason = f"{request.activity_type}_{request.lesson_id or 'unknown'}"
            tx_hash = self._send_reward_transaction(request.wallet_address, reward_amount, reason)
            
            if tx_hash:
                # Log to database
                reward_data = {
                    "wallet_address": request.wallet_address,
                    "activity_type": request.activity_type,
                    "reward_amount": reward_amount,
                    "transaction_hash": tx_hash,
                    "lesson_id": request.lesson_id,
                    "score": request.score,
                    "metadata": request.metadata or {}
                }
                self._log_reward_to_database(reward_data)
                
                return RewardResponse(
                    success=True,
                    transaction_hash=tx_hash,
                    reward_amount=reward_amount,
                    message=f"Reward of {reward_amount / 10**18} DeRi tokens sent successfully"
                )
            else:
                return RewardResponse(
                    success=False,
                    message="Failed to send reward transaction",
                    error="Blockchain transaction failed"
                )
                
        except Exception as e:
            logger.error(f"Error distributing reward: {e}")
            return RewardResponse(
                success=False,
                message="Internal server error",
                error=str(e)
            )
    
    async def get_user_balance(self, wallet_address: str) -> Dict[str, Any]:
        """Get user's DeRi token balance"""
        try:
            if not self.contract:
                return {"balance": 0, "error": "Contract not configured"}
            
            balance = self.contract.functions.balanceOf(wallet_address).call()
            return {
                "balance": balance,
                "balance_formatted": balance / 10**18,
                "symbol": "DeRi-TEST"
            }
        except Exception as e:
            logger.error(f"Error getting user balance: {e}")
            return {"balance": 0, "error": str(e)}
    
    async def get_reward_history(self, wallet_address: str, limit: int = 10) -> List[Dict[str, Any]]:
        """Get user's reward history from database"""
        try:
            # TODO: Implement actual ScyllaDB query
            # This is a placeholder
            return []
        except Exception as e:
            logger.error(f"Error getting reward history: {e}")
            return []

# Global reward service instance
reward_service = RewardService()

# FastAPI dependency
def get_reward_service() -> RewardService:
    return reward_service
