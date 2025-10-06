"""
ScyllaDB Integration for DRP Learn-to-Earn System
Handles user progress, rewards, and analytics data storage
"""

import os
import json
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict
from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
from cassandra.policies import DCAwareRoundRobinPolicy
import uuid

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class ScyllaDBConfig:
    """Configuration for ScyllaDB connection"""
    # Connection settings
    hosts: List[str] = None
    port: int = 9042
    keyspace: str = "drp_learn"
    
    # Authentication (if required)
    username: str = os.getenv("SCYLLA_USERNAME", "")
    password: str = os.getenv("SCYLLA_PASSWORD", "")
    
    # SSL settings
    ssl_enabled: bool = os.getenv("SCYLLA_SSL", "false").lower() == "true"
    ssl_cert_path: str = os.getenv("SCYLLA_SSL_CERT", "")
    
    def __post_init__(self):
        if self.hosts is None:
            self.hosts = os.getenv("SCYLLA_HOSTS", "localhost").split(",")

@dataclass
class RewardLog:
    """Data model for reward logs"""
    id: str
    wallet_address: str
    activity_type: str
    reward_amount: int
    transaction_hash: Optional[str]
    lesson_id: Optional[str]
    score: Optional[int]
    metadata: Dict[str, Any]
    timestamp: datetime
    network: str = "sepolia"
    status: str = "completed"

@dataclass
class UserProgress:
    """Data model for user learning progress"""
    user_id: str
    wallet_address: str
    lesson_id: str
    level: int
    module: str
    completed_at: datetime
    score: int
    time_spent: int  # in seconds
    attempts: int
    metadata: Dict[str, Any]

@dataclass
class UserStats:
    """Data model for user statistics"""
    user_id: str
    wallet_address: str
    total_lessons_completed: int
    total_score: int
    total_time_spent: int
    total_rewards_earned: int
    current_streak: int
    longest_streak: int
    last_activity: datetime
    achievements: List[str]
    level_progress: Dict[str, int]

class ScyllaDBManager:
    """Manager for ScyllaDB operations"""
    
    def __init__(self, config: ScyllaDBConfig = None):
        self.config = config or ScyllaDBConfig()
        self.cluster = None
        self.session = None
        self._connect()
        self._create_keyspace_and_tables()
    
    def _connect(self):
        """Establish connection to ScyllaDB cluster"""
        try:
            # Configure authentication if provided
            auth_provider = None
            if self.config.username and self.config.password:
                auth_provider = PlainTextAuthProvider(
                    username=self.config.username,
                    password=self.config.password
                )
            
            # Configure load balancing policy
            load_balancing_policy = DCAwareRoundRobinPolicy()
            
            # Create cluster connection
            self.cluster = Cluster(
                hosts=self.config.hosts,
                port=self.config.port,
                auth_provider=auth_provider,
                load_balancing_policy=load_balancing_policy,
                ssl_context=None  # Configure SSL if needed
            )
            
            self.session = self.cluster.connect()
            logger.info(f"Connected to ScyllaDB cluster: {self.config.hosts}")
            
        except Exception as e:
            logger.error(f"Failed to connect to ScyllaDB: {e}")
            raise
    
    def _create_keyspace_and_tables(self):
        """Create keyspace and tables if they don't exist"""
        try:
            # Create keyspace
            self.session.execute(f"""
                CREATE KEYSPACE IF NOT EXISTS {self.config.keyspace}
                WITH REPLICATION = {{
                    'class': 'SimpleStrategy',
                    'replication_factor': 3
                }}
            """)
            
            # Use the keyspace
            self.session.set_keyspace(self.config.keyspace)
            
            # Create tables
            self._create_reward_logs_table()
            self._create_user_progress_table()
            self._create_user_stats_table()
            self._create_achievements_table()
            self._create_leaderboard_table()
            
            logger.info("Keyspace and tables created successfully")
            
        except Exception as e:
            logger.error(f"Failed to create keyspace/tables: {e}")
            raise
    
    def _create_reward_logs_table(self):
        """Create reward logs table"""
        self.session.execute("""
            CREATE TABLE IF NOT EXISTS reward_logs (
                id UUID PRIMARY KEY,
                wallet_address TEXT,
                activity_type TEXT,
                reward_amount BIGINT,
                transaction_hash TEXT,
                lesson_id TEXT,
                score INT,
                metadata TEXT,  -- JSON string
                timestamp TIMESTAMP,
                network TEXT,
                status TEXT
            )
        """)
        
        # Create indexes for common queries
        self.session.execute("""
            CREATE INDEX IF NOT EXISTS reward_logs_wallet_address_idx 
            ON reward_logs (wallet_address)
        """)
        
        self.session.execute("""
            CREATE INDEX IF NOT EXISTS reward_logs_timestamp_idx 
            ON reward_logs (timestamp)
        """)
    
    def _create_user_progress_table(self):
        """Create user progress table"""
        self.session.execute("""
            CREATE TABLE IF NOT EXISTS user_progress (
                user_id UUID,
                wallet_address TEXT,
                lesson_id TEXT,
                level INT,
                module TEXT,
                completed_at TIMESTAMP,
                score INT,
                time_spent INT,
                attempts INT,
                metadata TEXT,  -- JSON string
                PRIMARY KEY (user_id, completed_at)
            ) WITH CLUSTERING ORDER BY (completed_at DESC)
        """)
        
        # Create materialized view for wallet-based queries
        self.session.execute("""
            CREATE MATERIALIZED VIEW IF NOT EXISTS user_progress_by_wallet AS
            SELECT user_id, wallet_address, lesson_id, level, module, 
                   completed_at, score, time_spent, attempts, metadata
            FROM user_progress
            WHERE wallet_address IS NOT NULL AND user_id IS NOT NULL AND completed_at IS NOT NULL
            PRIMARY KEY (wallet_address, completed_at, user_id)
            WITH CLUSTERING ORDER BY (completed_at DESC)
        """)
    
    def _create_user_stats_table(self):
        """Create user statistics table"""
        self.session.execute("""
            CREATE TABLE IF NOT EXISTS user_stats (
                user_id UUID PRIMARY KEY,
                wallet_address TEXT,
                total_lessons_completed INT,
                total_score INT,
                total_time_spent INT,
                total_rewards_earned BIGINT,
                current_streak INT,
                longest_streak INT,
                last_activity TIMESTAMP,
                achievements TEXT,  -- JSON array string
                level_progress TEXT,  -- JSON object string
                updated_at TIMESTAMP
            )
        """)
        
        self.session.execute("""
            CREATE INDEX IF NOT EXISTS user_stats_wallet_address_idx 
            ON user_stats (wallet_address)
        """)
    
    def _create_achievements_table(self):
        """Create achievements table"""
        self.session.execute("""
            CREATE TABLE IF NOT EXISTS achievements (
                id UUID PRIMARY KEY,
                user_id UUID,
                wallet_address TEXT,
                achievement_type TEXT,
                title TEXT,
                description TEXT,
                earned_at TIMESTAMP,
                metadata TEXT  -- JSON string
            )
        """)
        
        self.session.execute("""
            CREATE INDEX IF NOT EXISTS achievements_user_id_idx 
            ON achievements (user_id)
        """)
    
    def _create_leaderboard_table(self):
        """Create leaderboard table"""
        self.session.execute("""
            CREATE TABLE IF NOT EXISTS leaderboard (
                period TEXT,  -- daily, weekly, monthly, all_time
                rank INT,
                user_id UUID,
                wallet_address TEXT,
                score INT,
                rewards_earned BIGINT,
                lessons_completed INT,
                updated_at TIMESTAMP,
                PRIMARY KEY (period, rank)
            )
        """)
    
    def log_reward(self, reward_log: RewardLog) -> bool:
        """Log a reward transaction"""
        try:
            query = """
                INSERT INTO reward_logs (
                    id, wallet_address, activity_type, reward_amount,
                    transaction_hash, lesson_id, score, metadata,
                    timestamp, network, status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """
            
            self.session.execute(query, (
                uuid.uuid4(),
                reward_log.wallet_address,
                reward_log.activity_type,
                reward_log.reward_amount,
                reward_log.transaction_hash,
                reward_log.lesson_id,
                reward_log.score,
                json.dumps(reward_log.metadata),
                reward_log.timestamp,
                reward_log.network,
                reward_log.status
            ))
            
            logger.info(f"Reward logged: {reward_log.wallet_address} - {reward_log.reward_amount}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to log reward: {e}")
            return False
    
    def log_user_progress(self, progress: UserProgress) -> bool:
        """Log user learning progress"""
        try:
            query = """
                INSERT INTO user_progress (
                    user_id, wallet_address, lesson_id, level, module,
                    completed_at, score, time_spent, attempts, metadata
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """
            
            self.session.execute(query, (
                uuid.uuid4(),
                progress.wallet_address,
                progress.lesson_id,
                progress.level,
                progress.module,
                progress.completed_at,
                progress.score,
                progress.time_spent,
                progress.attempts,
                json.dumps(progress.metadata)
            ))
            
            # Update user stats
            self._update_user_stats(progress)
            
            logger.info(f"Progress logged: {progress.wallet_address} - {progress.lesson_id}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to log progress: {e}")
            return False
    
    def _update_user_stats(self, progress: UserProgress):
        """Update user statistics"""
        try:
            # Get current stats
            query = "SELECT * FROM user_stats WHERE wallet_address = ?"
            result = self.session.execute(query, (progress.wallet_address,)).one()
            
            if result:
                # Update existing stats
                new_total_lessons = result.total_lessons_completed + 1
                new_total_score = result.total_score + progress.score
                new_total_time = result.total_time_spent + progress.time_spent
                new_total_rewards = result.total_rewards_earned + self._calculate_reward_amount(progress.score)
                
                # Calculate streak
                last_activity = result.last_activity
                current_streak = result.current_streak
                if last_activity and (progress.completed_at.date() - last_activity.date()).days == 1:
                    current_streak += 1
                elif last_activity and (progress.completed_at.date() - last_activity.date()).days > 1:
                    current_streak = 1
                else:
                    current_streak = max(current_streak, 1)
                
                longest_streak = max(result.longest_streak, current_streak)
                
                update_query = """
                    UPDATE user_stats SET
                        total_lessons_completed = ?,
                        total_score = ?,
                        total_time_spent = ?,
                        total_rewards_earned = ?,
                        current_streak = ?,
                        longest_streak = ?,
                        last_activity = ?,
                        updated_at = ?
                    WHERE user_id = ?
                """
                
                self.session.execute(update_query, (
                    new_total_lessons,
                    new_total_score,
                    new_total_time,
                    new_total_rewards,
                    current_streak,
                    longest_streak,
                    progress.completed_at,
                    datetime.now(),
                    result.user_id
                ))
            else:
                # Create new stats record
                user_id = uuid.uuid4()
                reward_amount = self._calculate_reward_amount(progress.score)
                
                insert_query = """
                    INSERT INTO user_stats (
                        user_id, wallet_address, total_lessons_completed,
                        total_score, total_time_spent, total_rewards_earned,
                        current_streak, longest_streak, last_activity,
                        achievements, level_progress, updated_at
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """
                
                self.session.execute(insert_query, (
                    user_id,
                    progress.wallet_address,
                    1,
                    progress.score,
                    progress.time_spent,
                    reward_amount,
                    1,
                    1,
                    progress.completed_at,
                    json.dumps([]),
                    json.dumps({}),
                    datetime.now()
                ))
                
        except Exception as e:
            logger.error(f"Failed to update user stats: {e}")
    
    def _calculate_reward_amount(self, score: int) -> int:
        """Calculate reward amount based on score"""
        base_reward = 10 * 10**18  # 10 tokens in wei
        
        if score >= 90:
            return base_reward + (base_reward * 20 // 100)  # 20% bonus
        elif score >= 80:
            return base_reward + (base_reward * 10 // 100)  # 10% bonus
        elif score >= 70:
            return base_reward  # Base reward
        else:
            return 0  # No reward for <70%
    
    def get_user_stats(self, wallet_address: str) -> Optional[UserStats]:
        """Get user statistics"""
        try:
            query = "SELECT * FROM user_stats WHERE wallet_address = ?"
            result = self.session.execute(query, (wallet_address,)).one()
            
            if result:
                return UserStats(
                    user_id=str(result.user_id),
                    wallet_address=result.wallet_address,
                    total_lessons_completed=result.total_lessons_completed,
                    total_score=result.total_score,
                    total_time_spent=result.total_time_spent,
                    total_rewards_earned=result.total_rewards_earned,
                    current_streak=result.current_streak,
                    longest_streak=result.longest_streak,
                    last_activity=result.last_activity,
                    achievements=json.loads(result.achievements or "[]"),
                    level_progress=json.loads(result.level_progress or "{}")
                )
            return None
            
        except Exception as e:
            logger.error(f"Failed to get user stats: {e}")
            return None
    
    def get_reward_history(self, wallet_address: str, limit: int = 10) -> List[Dict[str, Any]]:
        """Get user's reward history"""
        try:
            query = """
                SELECT * FROM reward_logs 
                WHERE wallet_address = ? 
                ORDER BY timestamp DESC 
                LIMIT ?
            """
            
            results = self.session.execute(query, (wallet_address, limit))
            
            return [
                {
                    "id": str(row.id),
                    "activity_type": row.activity_type,
                    "reward_amount": row.reward_amount,
                    "transaction_hash": row.transaction_hash,
                    "lesson_id": row.lesson_id,
                    "score": row.score,
                    "timestamp": row.timestamp.isoformat(),
                    "network": row.network,
                    "status": row.status,
                    "metadata": json.loads(row.metadata or "{}")
                }
                for row in results
            ]
            
        except Exception as e:
            logger.error(f"Failed to get reward history: {e}")
            return []
    
    def get_leaderboard(self, period: str = "all_time", limit: int = 100) -> List[Dict[str, Any]]:
        """Get leaderboard data"""
        try:
            query = """
                SELECT * FROM leaderboard 
                WHERE period = ? 
                ORDER BY rank ASC 
                LIMIT ?
            """
            
            results = self.session.execute(query, (period, limit))
            
            return [
                {
                    "rank": row.rank,
                    "user_id": str(row.user_id),
                    "wallet_address": row.wallet_address,
                    "score": row.score,
                    "rewards_earned": row.rewards_earned,
                    "lessons_completed": row.lessons_completed,
                    "updated_at": row.updated_at.isoformat()
                }
                for row in results
            ]
            
        except Exception as e:
            logger.error(f"Failed to get leaderboard: {e}")
            return []
    
    def close(self):
        """Close database connection"""
        if self.session:
            self.session.shutdown()
        if self.cluster:
            self.cluster.shutdown()
        logger.info("ScyllaDB connection closed")

# Global ScyllaDB manager instance
scylla_manager = None

def get_scylla_manager() -> ScyllaDBManager:
    """Get global ScyllaDB manager instance"""
    global scylla_manager
    if scylla_manager is None:
        scylla_manager = ScyllaDBManager()
    return scylla_manager
