"""
DRP AI Verification Microservice - FastAPI service for assessing activity/status claims.

Base URL: https://ai.decentralizedrights.com
"""

import os
import base64
import json
from datetime import datetime
from typing import Dict, Any, List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from crypto.crypto_adapter import sign_message, generate_keypair, get_private_key_from_env

# Environment variables
AI_PRIVATE_KEY_B64 = os.getenv("AI_PRIVATE_KEY_B64", "")
POST_QUANTUM_ENABLED = os.getenv("POST_QUANTUM_ENABLED", "false").lower() == "true"

app = FastAPI(title="DRP AI Verification Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://api.decentralizedrights.com",
        "https://app.decentralizedrights.com",
        "http://localhost:8000",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class ActivityClaim(BaseModel):
    title: str
    description: str
    location: Optional[str] = None
    timestamp: str
    media_cid: str
    hash: str
    actor_id: str

class StatusClaim(BaseModel):
    category: str
    issuer: str
    reference_code: Optional[str] = None
    credential_cid: str
    actor_id: str

class SingleSignature(BaseModel):
    """Signature structure supporting dual-sig (ed25519 + PQ stub)."""
    ed_sig: str = Field(..., description="Ed25519 signature (base64)")
    pq_sig: Optional[str] = Field(None, description="Post-quantum signature (base64, placeholder)")

class AssessResponse(BaseModel):
    """AI assessment response with signature."""
    score: float = Field(..., ge=0.0, le=100.0, description="Assessment score 0-100")
    verdict: str = Field(..., description="'approved', 'rejected', 'requires_review'")
    rationale: str = Field(..., description="Human-readable explanation")
    obligations: List[str] = Field(default_factory=list, description="List of obligations/requirements")
    policy_tags: List[str] = Field(default_factory=list, description="Policy category tags")
    ai_signature: SingleSignature = Field(..., description="AI service signature")
    timestamp: str = Field(..., description="ISO timestamp of assessment")

# Policy engine (simplified rule-based for demo)
class PolicyEngine:
    """Rule-based policy engine for activity/status assessment."""
    
    @staticmethod
    def assess_activity(claim: ActivityClaim) -> Dict[str, Any]:
        """Assess a PoAT claim using rule-based logic."""
        score = 50.0  # Base score
        rationale_parts = []
        obligations = []
        policy_tags = []
        
        # Check description length
        if len(claim.description) >= 20:
            score += 10
            rationale_parts.append("Description meets minimum length requirement")
        else:
            score -= 10
            rationale_parts.append("Description too short")
        
        # Check for location
        if claim.location:
            score += 5
            policy_tags.append("geolocated")
        
        # Check hash (cryptographic proof)
        if len(claim.hash) >= 32:
            score += 15
            rationale_parts.append("Cryptographic hash provided")
            policy_tags.append("hash_verified")
        
        # Check media CID (IPFS content)
        if claim.media_cid:
            score += 10
            policy_tags.append("media_attached")
        
        # Determine verdict
        if score >= 70:
            verdict = "approved"
        elif score >= 50:
            verdict = "requires_review"
        else:
            verdict = "rejected"
            obligations.append("Provide more detailed description")
            obligations.append("Include cryptographic proof")
        
        return {
            "score": min(100.0, max(0.0, score)),
            "verdict": verdict,
            "rationale": ". ".join(rationale_parts) if rationale_parts else "Activity assessment completed",
            "obligations": obligations,
            "policy_tags": policy_tags
        }
    
    @staticmethod
    def assess_status(claim: StatusClaim) -> Dict[str, Any]:
        """Assess a PoST claim using rule-based logic."""
        score = 60.0  # Base score (higher for status claims)
        rationale_parts = []
        obligations = []
        policy_tags = []
        
        # Check issuer
        if claim.issuer and len(claim.issuer) >= 3:
            score += 15
            rationale_parts.append(f"Issuer identified: {claim.issuer}")
            policy_tags.append("institution_verified")
        else:
            score -= 15
            rationale_parts.append("Issuer not provided or invalid")
        
        # Check category
        valid_categories = ["identity", "education", "certification", "membership", "other"]
        if claim.category.lower() in valid_categories:
            score += 10
            policy_tags.append(claim.category.lower())
        else:
            score -= 5
        
        # Check reference code
        if claim.reference_code:
            score += 10
            policy_tags.append("reference_provided")
        
        # Check credential CID
        if claim.credential_cid:
            score += 15
            policy_tags.append("credential_attached")
        
        # Determine verdict
        if score >= 75:
            verdict = "approved"
        elif score >= 60:
            verdict = "requires_review"
        else:
            verdict = "rejected"
            obligations.append("Provide valid issuer information")
            obligations.append("Include credential document")
        
        return {
            "score": min(100.0, max(0.0, score)),
            "verdict": verdict,
            "rationale": ". ".join(rationale_parts) if rationale_parts else "Status assessment completed",
            "obligations": obligations,
            "policy_tags": policy_tags
        }

policy_engine = PolicyEngine()

def sign_assessment(assessment: Dict[str, Any]) -> SingleSignature:
    """Sign an assessment response with AI service private key."""
    # Get private key
    private_key = get_private_key_from_env("AI_PRIVATE_KEY_B64")
    if not private_key:
        # Generate temporary key for demo (DO NOT USE IN PRODUCTION)
        _, private_key = generate_keypair("ed25519")
    
    # Create message to sign
    message = json.dumps(assessment, sort_keys=True).encode()
    
    # Sign with ed25519
    ed_sig = sign_message("ed25519", private_key, message)
    
    # Post-quantum stub (returns None for now)
    pq_sig = None
    if POST_QUANTUM_ENABLED:
        # TODO: Implement post-quantum signing when enabled
        pass
    
    return SingleSignature(
        ed_sig=base64.b64encode(ed_sig).decode(),
        pq_sig=pq_sig
    )

@app.get("/health")
async def health():
    """Health check endpoint."""
    return {
        "status": "ok",
        "timestamp": datetime.utcnow().isoformat(),
        "post_quantum_enabled": POST_QUANTUM_ENABLED
    }

@app.post("/assess-activity", response_model=AssessResponse)
async def assess_activity(claim: ActivityClaim):
    """
    Assess a Proof of Activity claim.
    
    Returns AssessResponse with score, verdict, rationale, obligations, policy_tags, and AI signature.
    """
    # Run policy engine
    assessment = policy_engine.assess_activity(claim)
    
    # Sign assessment
    ai_signature = sign_assessment(assessment)
    
    return AssessResponse(
        score=assessment["score"],
        verdict=assessment["verdict"],
        rationale=assessment["rationale"],
        obligations=assessment["obligations"],
        policy_tags=assessment["policy_tags"],
        ai_signature=ai_signature,
        timestamp=datetime.utcnow().isoformat()
    )

@app.post("/assess-status", response_model=AssessResponse)
async def assess_status(claim: StatusClaim):
    """
    Assess a Proof of Status claim.
    
    Returns AssessResponse with score, verdict, rationale, obligations, policy_tags, and AI signature.
    """
    # Run policy engine
    assessment = policy_engine.assess_status(claim)
    
    # Sign assessment
    ai_signature = sign_assessment(assessment)
    
    return AssessResponse(
        score=assessment["score"],
        verdict=assessment["verdict"],
        rationale=assessment["rationale"],
        obligations=assessment["obligations"],
        policy_tags=assessment["policy_tags"],
        ai_signature=ai_signature,
        timestamp=datetime.utcnow().isoformat()
    )

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8001))
    uvicorn.run(app, host="0.0.0.0", port=port)

