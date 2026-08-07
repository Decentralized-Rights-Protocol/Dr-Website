"""
AI Service Routes - Handle AI-powered features like recommendations and explanations.
"""

import logging
from typing import List, Optional, Dict, Any
from fastapi import APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel, Field

from ..services.ai_service import AIService

logger = logging.getLogger(__name__)

router = APIRouter()


# Pydantic Models
class AIQueryRequest(BaseModel):
    """AI query request."""
    query: str
    context: Optional[Dict[str, Any]] = None
    user_address: Optional[str] = None


class AIQueryResponse(BaseModel):
    """AI query response."""
    answer: str
    sources: List[str] = Field(default_factory=list)
    confidence: float = Field(ge=0.0, le=1.0)
    reasoning: Optional[str] = None


class RecommendationRequest(BaseModel):
    """Recommendation request."""
    user_address: str
    context: Optional[Dict[str, Any]] = None


class Recommendation(BaseModel):
    """Recommendation response."""
    type: str = Field(..., description="activity, governance, learn, etc.")
    title: str
    description: str
    action_url: Optional[str] = None
    priority: int = Field(default=1, ge=1, le=5)


def get_ai_service(request: Request) -> Optional[AIService]:
    """Dependency to get AI service (optional)."""
    ai_service = getattr(request.app.state, "ai_service", None)
    if not ai_service:
        raise HTTPException(status_code=503, detail="AI service not available")
    return ai_service


@router.post("/query", response_model=AIQueryResponse)
async def ai_query(
    request: AIQueryRequest,
    ai_service: AIService = Depends(get_ai_service)
):
    """
    Query the AI service for information, guidance, or explanations.
    
    Uses RAG (Retrieval Augmented Generation) for context-aware responses.
    """
    try:
        result = await ai_service.query(
            query=request.query,
            context=request.context,
            user_address=request.user_address
        )
        
        return AIQueryResponse(
            answer=result["answer"],
            sources=result.get("sources", []),
            confidence=result.get("confidence", 0.8),
            reasoning=result.get("reasoning")
        )
    except Exception as e:
        logger.error(f"Error processing AI query: {e}")
        raise HTTPException(status_code=500, detail=f"AI query failed: {str(e)}")


@router.post("/recommendations", response_model=List[Recommendation])
async def get_recommendations(
    request: RecommendationRequest,
    ai_service: AIService = Depends(get_ai_service)
):
    """
    Get AI-powered recommendations for a user.
    
    Recommendations are personalized based on user activity and context.
    """
    try:
        recommendations_data = await ai_service.get_recommendations(
            user_address=request.user_address,
            context=request.context
        )
        
        return [
            Recommendation(
                type=rec["type"],
                title=rec["title"],
                description=rec["description"],
                action_url=rec.get("action_url"),
                priority=rec.get("priority", 1)
            )
            for rec in recommendations_data
        ]
    except Exception as e:
        logger.error(f"Error generating recommendations: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate recommendations: {str(e)}")


@router.post("/explain")
async def explain_concept(
    concept: str,
    user_level: str = "beginner",
    ai_service: AIService = Depends(get_ai_service)
):
    """
    Get AI-powered explanation of a concept.
    
    - **concept**: The concept to explain
    - **user_level**: User's knowledge level (beginner, intermediate, advanced)
    """
    try:
        explanation = await ai_service.explain_concept(concept, user_level)
        return {"explanation": explanation}
    except Exception as e:
        logger.error(f"Error generating explanation: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate explanation: {str(e)}")


@router.get("/health")
async def ai_health_check(ai_service: AIService = Depends(get_ai_service)):
    """Check AI service health and capabilities."""
    try:
        health = await ai_service.health_check()
        return health
    except Exception as e:
        logger.error(f"Error checking AI health: {e}")
        raise HTTPException(status_code=503, detail=f"AI service unavailable: {str(e)}")


