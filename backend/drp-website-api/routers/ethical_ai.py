"""
Ethical AI Router - Handle ethical AI-powered features for DRP.

This router provides endpoints for:
- Ethical proof verification (PoAT and PoST)
- Human rights knowledge queries
- Bias detection and mitigation
- Privacy protection
- Ethical decision appeals
"""

import logging
from typing import List, Optional, Dict, Any
from fastapi import APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel, Field

from ..services.ai_service import AIService

logger = logging.getLogger(__name__)

router = APIRouter()


# ============================================================================
# PYDANTIC MODELS
# ============================================================================

class ProofSubmissionRequest(BaseModel):
    """Request model for proof submission verification."""
    submission_id: str = Field(..., description="Unique submission identifier")
    user_address: str = Field(..., description="User's blockchain address")
    verification_type: str = Field(..., description="Type of verification: 'proof_of_activity' or 'proof_of_status'")
    title: str = Field(..., description="Title of the submission")
    description: str = Field(..., description="Detailed description of the activity or status")
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Additional metadata")
    attachment_url: Optional[str] = Field(default=None, description="URL to supporting documentation")
    context: Optional[Dict[str, Any]] = Field(default_factory=dict, description="Contextual information")


class EthicalAssessmentResponse(BaseModel):
    """Response model for ethical assessment results."""
    verdict: str = Field(..., description="Assessment verdict: approved, flagged_for_review, rejected, needs_more_context")
    score: float = Field(ge=0.0, le=100.0, description="Ethical assessment score (0-100)")
    confidence: float = Field(ge=0.0, le=1.0, description="Confidence level in assessment")
    rationale: str = Field(..., description="Detailed rationale for the assessment decision")
    ethical_tags: List[str] = Field(default_factory=list, description="Tags describing ethical aspects")
    bias_detection: Optional[Dict[str, Any]] = Field(default=None, description="Bias detection results")
    privacy_check: Optional[Dict[str, Any]] = Field(default=None, description="Privacy check results")
    human_rights_check: Optional[Dict[str, Any]] = Field(default=None, description="Human rights check results")
    sources: List[str] = Field(default_factory=list, description="Knowledge sources used in assessment")
    timestamp: str = Field(..., description="Assessment timestamp")
    model_version: str = Field(..., description="AI model version used")


class KnowledgeQueryRequest(BaseModel):
    """Request model for human rights knowledge queries."""
    query: str = Field(..., description="Search query for human rights knowledge")
    context: Optional[Dict[str, Any]] = Field(default=None, description="Context for the query")
    max_results: int = Field(default=5, ge=1, le=20, description="Maximum number of results to return")


class KnowledgeQueryResult(BaseModel):
    """Model for knowledge query results."""
    content: str
    source: str
    title: str
    relevance: float


class KnowledgeQueryResponse(BaseModel):
    """Response model for knowledge queries."""
    query: str
    results: List[KnowledgeQueryResult] = Field(default_factory=list)
    count: int
    sources: List[str] = Field(default_factory=list)


class ContentSafetyCheckRequest(BaseModel):
    """Request model for content safety checking."""
    content: str = Field(..., description="Content to check for safety")
    user_address: Optional[str] = Field(default=None, description="User address for privacy checks")
    strict: bool = Field(default=True, description="Whether to use strict safety checking")


class ContentSafetyCheckResponse(BaseModel):
    """Response model for content safety checks."""
    safety_level: str = Field(..., description="Safety level: safe, caution, unsafe, illegal")
    violations: List[str] = Field(default_factory=list, description="List of detected violations")
    banned_categories: List[str] = Field(default_factory=list, description="Banned content categories found")
    positive_categories: List[str] = Field(default_factory=list, description="Positive content categories found")
    recommendation: str = Field(..., description="Recommended action based on safety check")


class BiasDetectionRequest(BaseModel):
    """Request model for bias detection."""
    text: str = Field(..., description="Text to analyze for bias")
    metadata: Optional[Dict[str, Any]] = Field(default=None, description="Additional metadata to check")
    sensitivity: str = Field(default="HIGH", description="Sensitivity level for bias detection")


class BiasDetectionResponse(BaseModel):
    """Response model for bias detection results."""
    detected_biases: List[str] = Field(default_factory=list)
    confidence_scores: Dict[str, float] = Field(default_factory=dict)
    bias_detected: bool
    severity: str


class AppealRequest(BaseModel):
    """Request model for appealing AI decisions."""
    submission_id: str = Field(..., description="Original submission ID being appealed")
    original_verdict: str = Field(..., description="Original assessment verdict")
    appeal_reason: str = Field(..., description="Reason for the appeal")
    additional_context: Optional[str] = Field(default=None, description="Additional context for review")
    user_address: str = Field(..., description="User's blockchain address")


class AppealResponse(BaseModel):
    """Response model for appeal submission."""
    appeal_id: str
    status: str
    message: str
    next_steps: List[str] = Field(default_factory=list)


class EthicalHealthCheckResponse(BaseModel):
    """Response model for ethical AI health check."""
    status: str
    provider: str
    langchain_available: bool
    knowledge_base_available: bool
    capabilities: List[str]
    timestamp: str
    filters: Dict[str, bool] = Field(default_factory=dict)


# ============================================================================
# DEPENDENCIES
# ============================================================================

def get_ai_service(request: Request) -> Optional[AIService]:
    """Dependency to get AI service with ethical AI capabilities."""
    ai_service = getattr(request.app.state, "ai_service", None)
    if not ai_service:
        raise HTTPException(status_code=503, detail="AI service not available")
    return ai_service


def get_ethical_ai_service(request: Request) -> Optional[AIService]:
    """Dependency to get AI service and verify ethical AI is available."""
    ai_service = getattr(request.app.state, "ai_service", None)
    if not ai_service:
        raise HTTPException(status_code=503, detail="AI service not available")
    
    if not hasattr(ai_service, 'ethical_ai_service') or ai_service.ethical_ai_service is None:
        raise HTTPException(status_code=503, detail="Ethical AI service not available")
    
    return ai_service


# ============================================================================
# PROOF VERIFICATION ENDPOINTS
# ============================================================================

@router.post("/verify-proof", response_model=EthicalAssessmentResponse)
async def verify_proof(
    request: ProofSubmissionRequest,
    ai_service: AIService = Depends(get_ethical_ai_service)
):
    """
    Verify a proof submission using ethical AI.
    
    This endpoint uses the Ethical LangChain Service to assess PoAT (Proof of Activity) 
    and PoST (Proof of Status) submissions with human rights-first principles.
    
    **Features:**
    - Privacy protection checks
    - Human rights content filtering
    - Bias detection
    - Knowledge-based assessment
    - Transparent scoring and rationale
    
    **Verification Types:**
    - `proof_of_activity`: Verify digital contributions that advance human rights
    - `proof_of_status`: Verify identity or organizational credentials
    
    **Ethical Safeguards:**
    - Blocks content promoting violence, hatred, or discrimination
    - Detects potential bias in submissions
    - Protects user privacy and data
    - Provides transparent assessment rationale
    """
    try:
        # Convert request to submission data
        submission_data = {
            "submission_id": request.submission_id,
            "user_address": request.user_address,
            "verification_type": request.verification_type,
            "title": request.title,
            "description": request.description,
            "metadata": request.metadata or {},
            "attachment_url": request.attachment_url,
            "context": request.context or {}
        }
        
        # Use ethical AI service for verification
        assessment = await ai_service.ethical_ai_service.assess_activity(submission_data)
        
        # Convert to response model
        return EthicalAssessmentResponse(**assessment)
        
    except Exception as e:
        logger.error(f"Error verifying proof: {e}")
        raise HTTPException(status_code=500, detail=f"Proof verification failed: {str(e)}")


@router.post("/assess-activity", response_model=EthicalAssessmentResponse)
async def assess_activity(
    activity_data: Dict[str, Any],
    ai_service: AIService = Depends(get_ethical_ai_service)
):
    """
    Assess an activity submission using ethical AI.
    
    This is a more flexible endpoint that accepts raw activity data 
    for assessment. Suitable for programmatic integration.
    
    **Expected Activity Data Fields:**
    - `submission_id`: Unique identifier
    - `user_address`: User's blockchain address
    - `title`: Activity title
    - `description`: Detailed description
    - `verification_type`: 'proof_of_activity' or 'proof_of_status'
    - `metadata`: Additional metadata object
    - `context`: Contextual information
    """
    try:
        assessment = await ai_service.ethical_ai_service.assess_activity(activity_data)
        return EthicalAssessmentResponse(**assessment)
    except Exception as e:
        logger.error(f"Error assessing activity: {e}")
        raise HTTPException(status_code=500, detail=f"Activity assessment failed: {str(e)}")


# ============================================================================
# KNOWLEDGE AND LEARNING ENDPOINTS
# ============================================================================

@router.post("/query-knowledge", response_model=KnowledgeQueryResponse)
async def query_knowledge(
    request: KnowledgeQueryRequest,
    ai_service: AIService = Depends(get_ethical_ai_service)
):
    """
    Query the human rights knowledge base.
    
    This endpoint searches the comprehensive human rights knowledge base 
    that includes:
    - Universal Declaration of Human Rights (UDHR)
    - International Covenant on Civil and Political Rights (ICCPR)
    - DRP-specific documentation
    - Ethical AI guidelines
    - Social justice concepts
    - Blockchain and decentralization concepts
    
    **Use Cases:**
    - Get explanations of human rights concepts
    - Find relevant information for proof submissions
    - Learn about DRP principles and mechanisms
    - Research ethical AI practices
    """
    try:
        result = await ai_service.ethical_ai_service.query_knowledge(
            query=request.query,
            context=request.context
        )
        
        # Format results
        formatted_results = []
        for r in result.get("results", []):
            formatted_results.append(KnowledgeQueryResult(
                content=r.get("content", ""),
                source=r.get("source", "Unknown"),
                title=r.get("title", "Untitled"),
                relevance=r.get("relevance", 0.8)
            ))
        
        return KnowledgeQueryResponse(
            query=result.get("query", request.query),
            results=formatted_results,
            count=result.get("count", 0),
            sources=result.get("sources", [])
        )
        
    except Exception as e:
        logger.error(f"Error querying knowledge: {e}")
        raise HTTPException(status_code=500, detail=f"Knowledge query failed: {str(e)}")


@router.get("/explain-concept")
async def explain_concept(
    concept: str,
    user_level: str = "beginner",
    ai_service: AIService = Depends(get_ethical_ai_service)
):
    """
    Get an explanation of a human rights or DRP concept.
    
    **Available Concepts:**
    - DRP (Decentralized Rights Protocol)
    - Proof of Activity (PoAT)
    - Proof of Status (PoST)
    - Human rights principles
    - Blockchain technology
    - Ethical AI
    - Social justice concepts
    - And many more...
    
    **User Levels:**
    - `beginner`: Simple, accessible explanations
    - `intermediate`: Detailed technical explanations
    - `advanced`: Comprehensive, expert-level explanations
    """
    try:
        explanation = await ai_service.ethical_ai_service.explain_concept(concept, user_level)
        return {"concept": concept, "level": user_level, "explanation": explanation}
    except Exception as e:
        logger.error(f"Error explaining concept: {e}")
        raise HTTPException(status_code=500, detail=f"Concept explanation failed: {str(e)}")


# ============================================================================
# ETHICAL SAFEGUARD ENDPOINTS
# ============================================================================

@router.post("/check-content-safety", response_model=ContentSafetyCheckResponse)
async def check_content_safety(
    request: ContentSafetyCheckRequest,
    ai_service: AIService = Depends(get_ethical_ai_service)
):
    """
    Check content for safety and ethical compliance.
    
    This endpoint uses the Human Rights Filter to detect:
    - Hate speech
    - Violence promotion
    - Exploitation
    - Discrimination
    - Human rights violations
    - Misinformation
    
    **Safety Levels:**
    - `safe`: Content is ethically acceptable
    - `caution`: Content may need review
    - `unsafe`: Content violates ethical guidelines
    - `illegal`: Content may be illegal
    
    **Use Cases:**
    - Pre-screen user submissions
    - Validate content before publishing
    - Ensure compliance with community standards
    """
    try:
        filter_result = ai_service.ethical_ai_service.human_rights_filter.check_content(request.content)
        
        return ContentSafetyCheckResponse(
            safety_level=filter_result[0].value,
            violations=[],  # Will be populated from result[1]
            banned_categories=filter_result[1].get("banned_categories", []),
            positive_categories=filter_result[1].get("positive_categories", []),
            recommendation=filter_result[1].get("recommendation", "approve")
        )
    except Exception as e:
        logger.error(f"Error checking content safety: {e}")
        raise HTTPException(status_code=500, detail=f"Content safety check failed: {str(e)}")


@router.post("/detect-bias", response_model=BiasDetectionResponse)
async def detect_bias(
    request: BiasDetectionRequest,
    ai_service: AIService = Depends(get_ethical_ai_service)
):
    """
    Detect potential bias in text content.
    
    This endpoint analyzes text for potential bias across protected attributes:
    - Race, ethnicity, nationality
    - Gender, gender identity, sexual orientation
    - Religion, belief systems
    - Disability status
    - Age
    - Economic status
    - Geographic location
    
    **Severity Levels:**
    - `none`: No bias detected
    - `low`: Minimal bias concerns
    - `medium`: Significant bias detected
    - `high`: Severe bias requiring immediate action
    
    **Use Cases:**
    - Review user-generated content
    - Audit AI model outputs
    - Ensure fairness in decision-making
    """
    try:
        result = ai_service.ethical_ai_service.bias_detector.detect_bias(
            request.text, 
            request.metadata
        )
        
        return BiasDetectionResponse(
            detected_biases=result.get("detected_biases", []),
            confidence_scores=result.get("confidence_scores", {}),
            bias_detected=result.get("bias_detected", False),
            severity=result.get("severity", "none")
        )
    except Exception as e:
        logger.error(f"Error detecting bias: {e}")
        raise HTTPException(status_code=500, detail=f"Bias detection failed: {str(e)}")


# ============================================================================
# HEALTH AND MONITORING ENDPOINTS
# ============================================================================

@router.get("/health", response_model=EthicalHealthCheckResponse)
async def ethical_ai_health_check(
    ai_service: AIService = Depends(get_ethical_ai_service)
):
    """
    Check the health and capabilities of the Ethical AI service.
    
    This endpoint provides:
    - Service status and availability
    - Supported capabilities
    - Active ethical filters
    - Configuration information
    
    **Use Cases:**
    - Monitor service health
    - Verify ethical AI is functioning
    - Debug integration issues
    """
    try:
        health = await ai_service.ethical_ai_service.health_check()
        
        # Get filter status
        filters = {
            "human_rights_filter": True,
            "bias_detector": True,
            "privacy_guard": True,
            "knowledge_base": health.get("knowledge_base_available", False)
        }
        
        return EthicalHealthCheckResponse(
            status=health.get("status", "unknown"),
            provider=health.get("provider", "unknown"),
            langchain_available=health.get("langchain_available", False),
            knowledge_base_available=health.get("knowledge_base_available", False),
            capabilities=health.get("capabilities", []),
            timestamp=health.get("timestamp", ""),
            filters=filters
        )
    except Exception as e:
        logger.error(f"Error checking ethical AI health: {e}")
        raise HTTPException(status_code=500, detail=f"Health check failed: {str(e)}")


@router.get("/ ethical-guidelines")
async def get_ethical_guidelines():
    """
    Get the DRP Ethical AI Guidelines.
    
    Returns the comprehensive ethical framework that governs all AI systems
    used within DRP, including:
    - Core principles
    - Ethical safeguards
    - Decision-making processes
    - Compliance standards
    
    **Use Cases:**
    - Display guidelines to users
    - Reference for developers
    - Compliance verification
    """
    try:
        # Read the guidelines from file
        guidelines_path = "/Users/user/DRP Website/ETHICAL_AI_GUIDELINES.md"
        with open(guidelines_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        return {
            "title": "DRP Ethical AI Guidelines",
            "version": "1.0",
            "content": content,
            "last_updated": "August 7, 2026"
        }
    except FileNotFoundError:
        return {
            "title": "DRP Ethical AI Guidelines",
            "version": "1.0", 
            "content": "Ethical AI Guidelines are not available at this location.",
            "last_updated": "August 7, 2026"
        }
    except Exception as e:
        logger.error(f"Error reading ethical guidelines: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to retrieve guidelines: {str(e)}")


# ============================================================================
# APPEAL AND FEEDBACK ENDPOINTS
# ============================================================================

@router.post("/submit-appeal", response_model=AppealResponse)
async def submit_appeal(
    request: AppealRequest,
    ai_service: AIService = Depends(get_ethical_ai_service)
):
    """
    Submit an appeal for an AI decision.
    
    This endpoint allows users to appeal AI assessment decisions with:
    - Additional context
    - Clarification of intent
    - New evidence
    - Policy interpretation disputes
    
    **Appeal Process:**
    1. User submits appeal with additional context
    2. Human reviewer assesses the case
    3. Community council for complex cases
    4. Final decision with detailed rationale
    5. AI system learns from appeal outcomes
    
    **Appeal Grounds:**
    - AI misunderstanding of context
    - Cultural or linguistic nuances
    - Technical errors in processing
    - New evidence or information
    - Policy interpretation disputes
    """
    try:
        # Generate appeal ID
        import uuid
        appeal_id = str(uuid.uuid4())
        
        # Log the appeal (in production, store in database)
        logger.info(f"Appeal submitted: {appeal_id} for submission {request.submission_id}")
        logger.info(f"Appeal reason: {request.appeal_reason}")
        logger.info(f"Additional context: {request.additional_context}")
        
        return AppealResponse(
            appeal_id=appeal_id,
            status="submitted",
            message="Your appeal has been received and will be reviewed by our team.",
            next_steps=[
                "Your appeal will be reviewed by a human moderator",
                "You will receive a response within 48 hours",
                "Check your notifications for updates"
            ]
        )
        
    except Exception as e:
        logger.error(f"Error submitting appeal: {e}")
        raise HTTPException(status_code=500, detail=f"Appeal submission failed: {str(e)}")


# ============================================================================
# BATCH AND ADMIN ENDPOINTS
# ============================================================================

@router.post("/batch-verify", response_model=List[EthicalAssessmentResponse])
async def batch_verify(
    submissions: List[ProofSubmissionRequest],
    ai_service: AIService = Depends(get_ethical_ai_service)
):
    """
    Batch verify multiple proof submissions.
    
    This endpoint allows for bulk verification of multiple submissions,
    useful for:
    - Batch processing of pending submissions
    - Audit operations
    - System testing
    
    **Rate Limits:**
    - Maximum 10 submissions per request
    - Consider using individual endpoints for better error handling
    """
    if len(submissions) > 10:
        raise HTTPException(status_code=400, detail="Maximum 10 submissions per batch request")
    
    try:
        results = []
        for submission in submissions:
            submission_data = {
                "submission_id": submission.submission_id,
                "user_address": submission.user_address,
                "verification_type": submission.verification_type,
                "title": submission.title,
                "description": submission.description,
                "metadata": submission.metadata or {},
                "attachment_url": submission.attachment_url,
                "context": submission.context or {}
            }
            
            assessment = await ai_service.ethical_ai_service.assess_activity(submission_data)
            results.append(EthicalAssessmentResponse(**assessment))
        
        return results
        
    except Exception as e:
        logger.error(f"Error in batch verification: {e}")
        raise HTTPException(status_code=500, detail=f"Batch verification failed: {str(e)}")
