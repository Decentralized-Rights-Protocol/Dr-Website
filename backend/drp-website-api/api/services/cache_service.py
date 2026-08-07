"""
Cache Service - Handles caching using Redis for fast lookups.
"""

import logging
from typing import Optional, Any
import json

logger = logging.getLogger(__name__)

try:
    import redis.asyncio as redis
    REDIS_AVAILABLE = True
except ImportError:
    REDIS_AVAILABLE = False
    logger.warning("Redis not available, caching disabled")


class CacheService:
    """Service for caching data."""
    
    def __init__(self, redis_url: str = "redis://localhost:6379"):
        """
        Initialize cache service.
        
        Args:
            redis_url: Redis connection URL
        """
        self.redis_url = redis_url
        self.redis_client: Optional[redis.Redis] = None
        self.enabled = REDIS_AVAILABLE
        
        if self.enabled:
            try:
                self.redis_client = redis.from_url(redis_url, decode_responses=True)
                logger.info("CacheService initialized with Redis")
            except Exception as e:
                logger.warning(f"Failed to connect to Redis: {e}")
                self.enabled = False
        else:
            logger.info("CacheService initialized without Redis (caching disabled)")
    
    async def get(self, key: str) -> Optional[Any]:
        """Get value from cache."""
        if not self.enabled or not self.redis_client:
            return None
        
        try:
            value = await self.redis_client.get(key)
            if value:
                return json.loads(value)
            return None
        except Exception as e:
            logger.error(f"Error getting from cache: {e}")
            return None
    
    async def set(self, key: str, value: Any, ttl: int = 3600):
        """Set value in cache with TTL."""
        if not self.enabled or not self.redis_client:
            return
        
        try:
            await self.redis_client.setex(
                key,
                ttl,
                json.dumps(value)
            )
        except Exception as e:
            logger.error(f"Error setting cache: {e}")
    
    async def delete(self, key: str):
        """Delete value from cache."""
        if not self.enabled or not self.redis_client:
            return
        
        try:
            await self.redis_client.delete(key)
        except Exception as e:
            logger.error(f"Error deleting from cache: {e}")
    
    async def close(self):
        """Close Redis connection."""
        if self.redis_client:
            await self.redis_client.close()


