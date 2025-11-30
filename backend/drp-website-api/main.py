"""
DRP Website API - Comprehensive FastAPI backend connecting all DRP frontends.

This is the main API gateway for:
- DecentralizedRights.com (main portal)
- Explorer.DecentralizedRights.com (blockchain explorer)
- App.DecentralizedRights.com (user app)
- API.DecentralizedRights.com (backend API)

Base URL: https://api.decentralizedrights.com
"""

import os
import logging
from datetime import datetime
from typing import Dict, Any, List, Optional
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Depends, Header, BackgroundTasks, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings

# Import routers
try:
    from routers import (
        tokens,
        activities,
        governance,
        notifications,
        ai_service,
        explorer,
        users
    )
    from services.blockchain_service import BlockchainService
    from services.ai_service import AIService
    from services.cache_service import CacheService
except ImportError:
    # Fallback for relative imports
    from .routers import (
        tokens,
        activities,
        governance,
        notifications,
        ai_service,
        explorer,
        users
    )
    from .services.blockchain_service import BlockchainService
    from .services.ai_service import AIService
    from .services.cache_service import CacheService

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


class Settings(BaseSettings):
    """Application settings from environment variables."""
    # API Settings
    API_TITLE: str = "DRP Website API"
    API_VERSION: str = "1.0.0"
    API_PREFIX: str = "/api/v1"
    
    # Blockchain Settings
    BLOCKCHAIN_RPC_URL: str = os.getenv("BLOCKCHAIN_RPC_URL", "https://rpc.decentralizedrights.com")
    CONTRACT_ADDRESS: str = os.getenv("CONTRACT_ADDRESS", "")
    
    # AI Settings
    AI_ENABLED: bool = os.getenv("AI_ENABLED", "true").lower() == "true"
    AI_PROVIDER: str = os.getenv("AI_PROVIDER", "huggingface")  # huggingface, openai, google, llama
    HUGGINGFACE_API_KEY: str = os.getenv("HUGGINGFACE_API_KEY", "")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    GOOGLE_AI_API_KEY: str = os.getenv("GOOGLE_AI_API_KEY", "")
    LANGCHAIN_API_KEY: str = os.getenv("LANGCHAIN_API_KEY", "")
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./drp.db")
    
    # Cache
    REDIS_URL: str = os.getenv("REDIS_URL", "redis://localhost:6379")
    CACHE_ENABLED: bool = os.getenv("CACHE_ENABLED", "true").lower() == "true"
    
    # CORS
    ALLOWED_ORIGINS: str = os.getenv(
        "ALLOWED_ORIGINS",
        "https://decentralizedrights.com,https://explorer.decentralizedrights.com,https://app.decentralizedrights.com,http://localhost:3000"
    )
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan events for startup and shutdown."""
    # Startup
    logger.info("Starting DRP Website API...")
    
    # Initialize services
    try:
        blockchain_service = BlockchainService(
            rpc_url=settings.BLOCKCHAIN_RPC_URL,
            contract_address=settings.CONTRACT_ADDRESS
        )
        app.state.blockchain_service = blockchain_service
        logger.info("Blockchain service initialized")
    except Exception as e:
        logger.error(f"Failed to initialize blockchain service: {e}")
    
    # Initialize AI service if enabled
    if settings.AI_ENABLED:
        try:
            ai_service = AIService(
                provider=settings.AI_PROVIDER,
                huggingface_key=settings.HUGGINGFACE_API_KEY,
                openai_key=settings.OPENAI_API_KEY,
                google_key=settings.GOOGLE_AI_API_KEY,
                langchain_key=settings.LANGCHAIN_API_KEY
            )
            app.state.ai_service = ai_service
            logger.info(f"AI service initialized with provider: {settings.AI_PROVIDER}")
        except Exception as e:
            logger.error(f"Failed to initialize AI service: {e}")
            app.state.ai_service = None
    else:
        app.state.ai_service = None
        logger.info("AI service disabled")
    
    # Initialize cache if enabled
    if settings.CACHE_ENABLED:
        try:
            cache_service = CacheService(redis_url=settings.REDIS_URL)
            app.state.cache_service = cache_service
            logger.info("Cache service initialized")
        except Exception as e:
            logger.warning(f"Failed to initialize cache service: {e}")
            app.state.cache_service = None
    else:
        app.state.cache_service = None
    
    yield
    
    # Shutdown
    logger.info("Shutting down DRP Website API...")


# Create FastAPI app
app = FastAPI(
    title=settings.API_TITLE,
    version=settings.API_VERSION,
    description="Comprehensive API for Decentralized Rights Protocol connecting all frontends",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware
origins = [origin.strip() for origin in settings.ALLOWED_ORIGINS.split(",")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Error handlers
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler."""
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "message": str(exc),
            "timestamp": datetime.utcnow().isoformat()
        }
    )


# Health check
@app.get("/health")
async def health_check():
    """Health check endpoint."""
    services_status = {
        "blockchain": "connected" if hasattr(app.state, "blockchain_service") else "disconnected",
        "ai": "connected" if hasattr(app.state, "ai_service") and app.state.ai_service else "disconnected",
        "cache": "connected" if hasattr(app.state, "cache_service") and app.state.cache_service else "disconnected"
    }
    
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": settings.API_VERSION,
        "services": services_status
    }


# Include routers
app.include_router(tokens.router, prefix=f"{settings.API_PREFIX}/tokens", tags=["Tokens"])
app.include_router(activities.router, prefix=f"{settings.API_PREFIX}/activities", tags=["Activities"])
app.include_router(governance.router, prefix=f"{settings.API_PREFIX}/governance", tags=["Governance"])
app.include_router(notifications.router, prefix=f"{settings.API_PREFIX}/notifications", tags=["Notifications"])
app.include_router(ai_service.router, prefix=f"{settings.API_PREFIX}/ai", tags=["AI"])
app.include_router(explorer.router, prefix=f"{settings.API_PREFIX}/explorer", tags=["Explorer"])
app.include_router(users.router, prefix=f"{settings.API_PREFIX}/users", tags=["Users"])


# Root endpoint
@app.get("/")
async def root():
    """Root endpoint with API information."""
    return {
        "name": settings.API_TITLE,
        "version": settings.API_VERSION,
        "docs": "/docs",
        "health": "/health",
        "endpoints": {
            "tokens": f"{settings.API_PREFIX}/tokens",
            "activities": f"{settings.API_PREFIX}/activities",
            "governance": f"{settings.API_PREFIX}/governance",
            "notifications": f"{settings.API_PREFIX}/notifications",
            "ai": f"{settings.API_PREFIX}/ai",
            "explorer": f"{settings.API_PREFIX}/explorer",
            "users": f"{settings.API_PREFIX}/users"
        }
    }


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=True,
        log_level="info"
    )


