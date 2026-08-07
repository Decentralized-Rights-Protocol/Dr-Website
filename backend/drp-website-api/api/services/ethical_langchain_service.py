"""
DRP Ethical LangChain AI Service

An ethical AI service using LangChain for human rights-focused verification and reasoning.
This service implements the DRP Ethical AI Guidelines and provides:
- Proof verification (PoAT and PoST)
- Human rights knowledge retrieval
- Bias detection and mitigation
- Ethical decision-making
- Transparency and auditability

Author: DRP Development Team
Version: 1.0.0
Date: August 7, 2026
"""

import os
import json
import logging
from typing import Dict, Any, List, Optional, Tuple
from dataclasses import dataclass, field
from datetime import datetime
import hashlib
import asyncio
from enum import Enum

# LangChain imports (will be imported conditionally)
try:
    from langchain_core.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
    from langchain_core.output_parsers import StrOutputParser, JsonOutputParser
    from langchain_core.runnables import RunnablePassthrough
    from langchain_community.vectorstores import FAISS
    from langchain_community.embeddings import HuggingFaceEmbeddings, SentenceTransformerEmbeddings
    from langchain_community.llms import HuggingFaceHub
    from langchain_community.chat_models import ChatHuggingFace, ChatOpenAI, ChatAnthropic
    from langchain.text_splitter import RecursiveCharacterTextSplitter
    from langchain.docstore.document import Document
    LANGCHAIN_AVAILABLE = True
except ImportError as e:
    logging.warning(f"LangChain not available: {e}")
    LANGCHAIN_AVAILABLE = False

logger = logging.getLogger(__name__)


# ============================================================================
# ETHICAL CONSTANTS AND CONFIGURATION
# ============================================================================

class EthicalConfig:
    """Configuration for ethical AI constraints."""
    
    # Human Rights Priority
    HUMAN_RIGHTS_FIRST = True
    MIN_CONFIDENCE_THRESHOLD = 0.7
    HUMAN_REVIEW_THRESHOLD = 0.85
    
    # Privacy Settings
    DATA_RETENTION_DAYS = 30
    ENCRYPTION_ENABLED = True
    ANONYMIZATION_ENABLED = True
    
    # Fairness Settings
    BIAS_SENSITIVITY = "HIGH"
    FAIRNESS_CHECK_ENABLED = True
    PROTECTED_ATTRIBUTES = [
        "race", "ethnicity", "gender", "sexual_orientation", "religion",
        "disability", "age", "economic_status", "nationality"
    ]
    
    # Transparency Settings
    AUDIT_LOG_ENABLED = True
    EXPLAINABILITY_ENABLED = True
    SOURCE_ATTRIBTUTION_ENABLED = True
    
    # Content Safety
    BLOCKED_CATEGORIES = [
        "hate_speech", "violence", "exploitation", "discrimination", 
        "misinformation", "human_rights_violation", "illegal_activity"
    ]
    
    ALLOWED_CATEGORIES = [
        "education", "human_rights", "community", "development", 
        "social_justice", "advocacy", "research", "open_source"
    ]


# ============================================================================
# DATA CLASSES
# ============================================================================

class VerificationType(Enum):
    """Types of verification supported."""
    POAT = "proof_of_activity"
    POST = "proof_of_status"
    GENERIC = "generic"


class EthicalVerdict(Enum):
    """Ethical assessment verdicts."""
    APPROVED = "approved"
    FLAGGED = "flagged_for_review"
    REJECTED = "rejected"
    NEEDS_CONTEXT = "needs_more_context"


class ContentSafetyLevel(Enum):
    """Content safety classification."""
    SAFE = "safe"
    CAUTION = "caution"
    UNSAFE = "unsafe"
    ILLEGAL = "illegal"


@dataclass
class EthicalAssessment:
    """Result of ethical AI assessment."""
    verdict: EthicalVerdict
    score: float  # 0-100
    confidence: float  # 0-1
    rationale: str
    ethical_tags: List[str] = field(default_factory=list)
    bias_detection: Dict[str, Any] = field(default_factory=dict)
    privacy_check: Dict[str, Any] = field(default_factory=dict)
    human_rights_check: Dict[str, Any] = field(default_factory=dict)
    sources: List[str] = field(default_factory=list)
    timestamp: str = field(default_factory=lambda: datetime.utcnow().isoformat())
    model_version: str = "drp-elders-v1.0"
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "verdict": self.verdict.value,
            "score": self.score,
            "confidence": self.confidence,
            "rationale": self.rationale,
            "ethical_tags": self.ethical_tags,
            "bias_detection": self.bias_detection,
            "privacy_check": self.privacy_check,
            "human_rights_check": self.human_rights_check,
            "sources": self.sources,
            "timestamp": self.timestamp,
            "model_version": self.model_version
        }


@dataclass
class ProofSubmission:
    """Proof submission data structure."""
    submission_id: str
    user_address: str
    verification_type: VerificationType
    title: str
    description: str
    metadata: Dict[str, Any] = field(default_factory=dict)
    attachment_url: Optional[str] = None
    context: Dict[str, Any] = field(default_factory=dict)
    timestamp: str = field(default_factory=lambda: datetime.utcnow().isoformat())
    
    def get_hash(self) -> str:
        """Generate a unique hash for the submission."""
        data_str = json.dumps({
            "submission_id": self.submission_id,
            "user_address": self.user_address,
            "title": self.title,
            "description": self.description,
            "timestamp": self.timestamp
        }, sort_keys=True)
        return hashlib.sha256(data_str.encode()).hexdigest()


# ============================================================================
# ETHICAL FILTERS AND DETECTORS
# ============================================================================

class HumanRightsFilter:
    """Filter content based on human rights principles."""
    
    def __init__(self, strict: bool = True):
        self.strict = strict
        self.banned_terms = {
            "hate_speech": ["hate", "racist", "bigot", "xenophobe", "misogynist"],
            "violence": ["kill", "murder", "torture", "abuse", "harm"],
            "exploitation": ["exploit", "traffic", "slavery", "forced labor"],
            "discrimination": ["discriminate", "segregrate", "exclude", "marginalize"],
            "human_rights_violation": ["oppress", "suppress", "violate rights", "deny rights"]
        }
        self.positive_terms = {
            "education": ["learn", "teach", "study", "educate", "knowledge"],
            "human_rights": ["rights", "justice", "equality", "freedom", "dignity"],
            "community": ["community", "collaborate", "support", "help", "share"],
            "social_justice": ["justice", "equity", "fairness", "advocacy", "activism"]
        }
    
    def check_content(self, text: str) -> Tuple[ContentSafetyLevel, Dict[str, Any]]:
        """Check text content against human rights principles."""
        text_lower = text.lower()
        
        # Check for banned content
        banned_found = {}
        for category, terms in self.banned_terms.items():
            for term in terms:
                if term in text_lower:
                    banned_found[category] = True
        
        # Check for positive content
        positive_found = {}
        for category, terms in self.positive_terms.items():
            for term in terms:
                if term in text_lower:
                    positive_found[category] = True
        
        # Determine safety level
        if banned_found:
            if self.strict:
                return ContentSafetyLevel.UNSAFE, {
                    "banned_categories": list(banned_found.keys()),
                    "positive_categories": list(positive_found.keys()),
                    "recommendation": "reject"
                }
            else:
                return ContentSafetyLevel.CAUTION, {
                    "banned_categories": list(banned_found.keys()),
                    "positive_categories": list(positive_found.keys()),
                    "recommendation": "human_review"
                }
        
        return ContentSafetyLevel.SAFE, {
            "banned_categories": [],
            "positive_categories": list(positive_found.keys()),
            "recommendation": "approve"
        }


class BiasDetector:
    """Detect potential bias in content and decisions."""
    
    def __init__(self, sensitivity: str = "HIGH"):
        self.sensitivity = sensitivity
        self.protected_attributes = EthicalConfig.PROTECTED_ATTRIBUTES
        
        # Terms that might indicate bias
        self.bias_indicators = {
            "gender": ["male", "female", "man", "woman", "he", "she"],
            "race": ["white", "black", "asian", "hispanic", "latino"],
            "age": ["old", "young", "elderly", "teen"],
            "economic": ["rich", "poor", "wealthy", "needy"]
        }
    
    def detect_bias(self, text: str, metadata: Optional[Dict] = None) -> Dict[str, Any]:
        """Detect potential bias in text or metadata."""
        text_lower = text.lower()
        detected_biases = []
        confidence_scores = {}
        
        # Check for protected attribute mentions
        for attribute, terms in self.bias_indicators.items():
            for term in terms:
                if term in text_lower:
                    detected_biases.append(attribute)
                    confidence_scores[attribute] = self._calculate_confidence(term, text_lower)
        
        # Check metadata for potential bias
        if metadata:
            for key, value in metadata.items():
                if key.lower() in [attr.lower() for attr in self.protected_attributes]:
                    if key not in detected_biases:
                        detected_biases.append(key)
                    confidence_scores[key] = 0.9
        
        return {
            "detected_biases": detected_biases,
            "confidence_scores": confidence_scores,
            "bias_detected": len(detected_biases) > 0,
            "severity": self._calculate_severity(detected_biases)
        }
    
    def _calculate_confidence(self, term: str, text: str) -> float:
        """Calculate confidence score for bias detection."""
        # Simple confidence calculation based on context
        term_count = text.count(term)
        if term_count > 3:
            return min(0.95, 0.7 + (term_count * 0.05))
        elif term_count > 1:
            return 0.6 + (term_count * 0.1)
        else:
            return 0.4
    
    def _calculate_severity(self, biases: List[str]) -> str:
        """Calculate severity level of detected bias."""
        if not biases:
            return "none"
        elif len(biases) >= 3:
            return "high"
        elif len(biases) >= 1:
            return "medium"
        else:
            return "low"


class PrivacyGuard:
    """Protect user privacy in AI processing."""
    
    def __init__(self, enforce: bool = True):
        self.enforce = enforce
        self.sensitive_patterns = [
            r'\b\d{3}-\d{2}-\d{4}\b',  # SSN
            r'\b\d{16}\b',            # Credit card
            r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',  # Email
            r'\b\d{10}\b',           # Phone number
            r'\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b'  # IP address
        ]
    
    def check_privacy(self, text: str, user_address: Optional[str] = None) -> Dict[str, Any]:
        """Check for privacy violations in text."""
        violations = []
        
        # Check for sensitive patterns
        import re
        for pattern in self.sensitive_patterns:
            if re.search(pattern, text):
                violations.append("sensitive_data_pattern")
        
        # Check for excessive personal information
        if len(text.split()) > 1000:  # Very long text
            violations.append("excessive_data")
        
        # Check if user address is mentioned inappropriately
        if user_address and user_address.lower() in text.lower():
            violations.append("user_address_exposure")
        
        return {
            "violations": violations,
            "privacy_violated": len(violations) > 0,
            "severity": "high" if len(violations) >= 2 else "medium" if violations else "none"
        }


# ============================================================================
# HUMAN RIGHTS KNOWLEDGE BASE
# ============================================================================

class HumanRightsKnowledgeBase:
    """Knowledge base for human rights information and reasoning."""
    
    def __init__(self):
        self.knowledge_documents = self._initialize_knowledge_base()
        self.embeddings = None
        self.vector_store = None
        self._initialize_vector_store()
    
    def _initialize_knowledge_base(self) -> List[Document]:
        """Initialize the human rights knowledge base."""
        # Universal Declaration of Human Rights articles
        udhr_articles = [
            {
                "title": "UDHR Article 1",
                "content": "All human beings are born free and equal in dignity and rights. They are endowed with reason and conscience and should act towards one another in a spirit of brotherhood.",
                "source": "Universal Declaration of Human Rights",
                "category": "foundational_rights"
            },
            {
                "title": "UDHR Article 2",
                "content": "Everyone is entitled to all the rights and freedoms set forth in this Declaration, without distinction of any kind, such as race, colour, sex, language, religion, political or other opinion, national or social origin, property, birth or other status.",
                "source": "Universal Declaration of Human Rights",
                "category": "non_discrimination"
            },
            {
                "title": "UDHR Article 3",
                "content": "Everyone has the right to life, liberty and security of person.",
                "source": "Universal Declaration of Human Rights",
                "category": "life_liberty_security"
            },
            {
                "title": "UDHR Article 18",
                "content": "Everyone has the right to freedom of thought, conscience and religion; this right includes freedom to change his religion or belief, and freedom, either alone or in community with others and in public or private, to manifest his religion or belief in teaching, practice, worship and observance.",
                "source": "Universal Declaration of Human Rights",
                "category": "freedom_thought"
            },
            {
                "title": "UDHR Article 19",
                "content": "Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.",
                "source": "Universal Declaration of Human Rights",
                "category": "freedom_expression"
            }
        ]
        
        # DRP-specific knowledge
        drp_knowledge = [
            {
                "title": "DRP Proof of Activity",
                "content": "Proof of Activity (PoAT) verifies digital contributions that advance human rights. Activities include learning, development, content creation, productivity, and web3 contributions. Rewards are distributed in $DeRi tokens based on impact and quality.",
                "source": "DRP Documentation",
                "category": "drp_specific"
            },
            {
                "title": "DRP Proof of Status", 
                "content": "Proof of Status (PoST) verifies identity or organizational credentials for governance rights. Categories include Citizen/Resident, Student, Farmer, NGO Partner, and Cooperative Member. Successful verification grants $RIGHTS governance tokens.",
                "source": "DRP Documentation",
                "category": "drp_specific"
            },
            {
                "title": "DRP Ethical Principles",
                "content": "DRP AI systems must prioritize human rights, ensure transparency, maintain fairness, protect privacy, and be accountable. All decisions can be appealed and reviewed by human council members.",
                "source": "DRP Ethical Guidelines",
                "category": "ethics"
            }
        ]
        
        # Combine all knowledge
        all_knowledge = udhr_articles + drp_knowledge
        
        # Convert to LangChain Document format if available
        if LANGCHAIN_AVAILABLE:
            return [
                Document(
                    page_content=doc["content"],
                    metadata={
                        "title": doc["title"],
                        "source": doc["source"],
                        "category": doc["category"]
                    }
                )
                for doc in all_knowledge
            ]
        else:
            # Fallback to simple dict format
            return [
                {
                    "content": doc["content"],
                    "metadata": {
                        "title": doc["title"],
                        "source": doc["source"],
                        "category": doc["category"]
                    }
                }
                for doc in all_knowledge
            ]
    
    def _initialize_vector_store(self):
        """Initialize vector store for semantic search."""
        if not LANGCHAIN_AVAILABLE:
            logger.warning("LangChain not available, using fallback knowledge base")
            return
        
        try:
            # Use SentenceTransformers for embeddings
            embedding_model = SentenceTransformerEmbeddings(
                model_name="all-MiniLM-L6-v2",
                model_kwargs={'device': 'cpu'}
            )
            
            # Create FAISS vector store in memory
            self.vector_store = FAISS.from_documents(
                documents=self.knowledge_documents,
                embedding=embedding_model
            )
            logger.info("Human rights knowledge base vector store initialized")
            
        except Exception as e:
            logger.error(f"Error initializing vector store: {e}")
            self.vector_store = None
    
    def search_knowledge(self, query: str, k: int = 3) -> List[Dict[str, Any]]:
        """Search the knowledge base for relevant information."""
        # Handle both external and internal knowledge base types
        if hasattr(self, 'knowledge_base') and self.knowledge_base:
            if hasattr(self.knowledge_base, 'search_knowledge'):
                # External knowledge base with search_knowledge method
                return self.knowledge_base.search_knowledge(query, k)
            else:
                # External knowledge base - use fallback search
                return self._fallback_search_external(query, k)
        elif self.vector_store:
            try:
                docs = self.vector_store.similarity_search(query, k=k)
                return [
                    {
                        "content": doc.page_content,
                        "metadata": doc.metadata,
                        "relevance": 1.0 - (i * 0.1)  # Simple relevance scoring
                    }
                    for i, doc in enumerate(docs)
                ]
            except Exception as e:
                logger.error(f"Error searching vector store: {e}")
        
        # Fallback to simple keyword search
        return self._fallback_search(query, k)
    
    def _fallback_search(self, query: str, k: int = 3) -> List[Dict[str, Any]]:
        """Fallback search without vector store for internal knowledge base."""
        query_lower = query.lower()
        results = []
        
        for doc in self.knowledge_documents:
            if isinstance(doc, dict):
                content = doc.get("content", "")
                metadata = doc.get("metadata", {})
            else:
                content = doc.page_content
                metadata = doc.metadata
            
            if query_lower in content.lower():
                results.append({
                    "content": content,
                    "metadata": metadata,
                    "relevance": 1.0
                })
        
        return results[:k]
    
    def _fallback_search_external(self, query: str, k: int = 3) -> List[Dict[str, Any]]:
        """Fallback search for external knowledge base."""
        query_lower = query.lower()
        results = []
        
        # External knowledge base has documents as KnowledgeDocument objects
        for doc in self.knowledge_base.documents:
            content = doc.content
            metadata = {
                "title": doc.title,
                "source": doc.source,
                "category": doc.category,
                "tags": doc.tags,
                "importance": doc.importance
            }
            
            if query_lower in content.lower():
                results.append({
                    "content": content,
                    "metadata": metadata,
                    "relevance": 1.0
                })
        
        return results[:k]


# ============================================================================
# ETHICAL LANGCHAIN SERVICE
# ============================================================================

class EthicalLangChainService:
    """
    Main service for ethical AI processing using LangChain.
    
    This service provides:
    - Ethical proof verification
    - Human rights-aware reasoning
    - Bias detection and mitigation
    - Privacy protection
    - Transparent decision-making
    """
    
    def __init__(self, 
                 provider: str = "huggingface",
                 huggingface_key: Optional[str] = None,
                 openai_key: Optional[str] = None,
                 nvidia_nim_key: Optional[str] = None,
                 use_vector_store: bool = True):
        """
        Initialize the Ethical LangChain Service.
        
        Args:
            provider: AI provider ('huggingface', 'openai', 'nvidia', 'local')
            huggingface_key: HuggingFace API key
            openai_key: OpenAI API key  
            nvidia_nim_key: NVIDIA NIM API key
            use_vector_store: Whether to use vector store for knowledge
        """
        self.provider = provider
        self.huggingface_key = huggingface_key or os.getenv("HUGGINGFACE_API_KEY")
        self.openai_key = openai_key or os.getenv("OPENAI_API_KEY")
        self.nvidia_nim_key = nvidia_nim_key or os.getenv("NVIDIA_NIM_API_KEY")
        
        # Initialize ethical components
        self.human_rights_filter = HumanRightsFilter(strict=True)
        self.bias_detector = BiasDetector(sensitivity=EthicalConfig.BIAS_SENSITIVITY)
        self.privacy_guard = PrivacyGuard(enforce=True)
        
        # Initialize knowledge base - try to use the external one first
        try:
            from ..knowledge.human_rights_knowledge import HumanRightsKnowledgeBase as ExternalKnowledgeBase
            self.knowledge_base = ExternalKnowledgeBase(load_from_file=False) if use_vector_store else None
        except ImportError:
            # Fallback to internal knowledge base
            self.knowledge_base = self.HumanRightsKnowledgeBase() if use_vector_store else None
        
        # Initialize AI models
        self.llm = self._initialize_llm()
        self.chat_model = self._initialize_chat_model()
        self.prompt_templates = self._initialize_prompt_templates()
        
        # Initialize chains
        self.verification_chain = self._initialize_verification_chain()
        self.assessment_chain = self._initialize_assessment_chain()
        self.explanation_chain = self._initialize_explanation_chain()
        
        logger.info(f"EthicalLangChainService initialized with provider: {provider}")
    
    def _initialize_llm(self):
        """Initialize the language model based on provider."""
        if not LANGCHAIN_AVAILABLE:
            logger.warning("LangChain not available, using fallback")
            return None
        
        try:
            if self.provider == "openai" and self.openai_key:
                return ChatOpenAI(
                    openai_api_key=self.openai_key,
                    model_name="gpt-4-turbo-preview",
                    temperature=0.3,
                    max_tokens=2000
                )
            elif self.provider == "nvidia" and self.nvidia_nim_key:
                # Use NVIDIA NIM through HuggingFace interface
                # NVIDIA NIM supports various models including Mistral, Llama, etc.
                nvidia_model = os.getenv("NVIDIA_NIM_MODEL", "mistralai/Mixtral-8x7B-Instruct-v0.1")
                return ChatHuggingFace(
                    huggingfacehub_api_token=self.nvidia_nim_key,
                    repo_id=nvidia_model,
                    temperature=0.3,
                    max_new_tokens=2000
                )
            else:
                # Default to local or HuggingFace
                return ChatHuggingFace(
                    huggingfacehub_api_token=self.huggingface_key,
                    repo_id="google/flan-t5-xxl",
                    temperature=0.3,
                    max_new_tokens=2000
                )
        except Exception as e:
            logger.error(f"Error initializing LLM: {e}")
            return None
    
    def _initialize_chat_model(self):
        """Initialize chat model for conversational AI."""
        # For now, use the same as LLM
        return self.llm
    
    def _initialize_prompt_templates(self) -> Dict[str, Any]:
        """Initialize prompt templates for different use cases."""
        templates = {}
        
        if not LANGCHAIN_AVAILABLE:
            return templates
        
        # Verification Prompt
        verification_system_prompt = """You are an Elder AI for the Decentralized Rights Protocol (DRP). 
Your role is to ethically verify proof submissions while upholding human rights principles.

PRINCIPLES:
1. HUMAN RIGHTS FIRST: All decisions must respect and protect human rights
2. FAIRNESS: Be unbiased and equitable in all assessments
3. TRANSPARENCY: Provide clear rationale for all decisions
4. PRIVACY: Protect user data and personal information
5. ACCOUNTABILITY: All decisions can be reviewed and appealed

VERIFICATION TYPES:
- Proof of Activity (PoAT): Verify digital contributions (learning, development, content, productivity, web3)
- Proof of Status (PoST): Verify identity/organization credentials

ASSESSMENT CRITERIA:
- Authenticity: Is the proof genuine?
- Relevance: Does it advance human rights or social justice?
- Impact: What is the potential positive impact?
- Risk: Are there any human rights concerns?

RESPONSE FORMAT:
Always respond with a JSON object containing:
{{
    "verdict": "approved" | "flagged_for_review" | "rejected" | "needs_more_context",
    "score": 0-100,
    "confidence": 0.0-1.0,
    "rationale": "clear explanation",
    "ethical_tags": ["relevant", "tags"],
    "sources": ["relevant sources from knowledge base"]
}}

IMPORTANT: If you detect human rights violations, hate speech, discrimination, or illegal content, 
return verdict "rejected" with low score. If uncertain, return "flagged_for_review"."""

        templates["verification"] = ChatPromptTemplate.from_messages([
            SystemMessagePromptTemplate.from_template(verification_system_prompt),
            HumanMessagePromptTemplate.from_template("""
Verify this proof submission:

TYPE: {verification_type}
TITLE: {title}
DESCRIPTION: {description}
METADATA: {metadata}
CONTEXT: {context}

Provide your assessment as JSON only.
""")
        ])
        
        # Assessment Prompt
        assessment_system_prompt = """You are an ethical AI assessor for human rights content. 
Analyze submissions for alignment with human rights principles and DRP ethical guidelines.

Focus on:
- Human rights alignment
- Social justice impact
- Educational value
- Community benefit
- Authenticity indicators

Be cautious of:
- Potential bias or discrimination
- Privacy concerns
- Misleading or false information
- Harmful content

Score 0-100 based on ethical alignment and quality."""

        templates["assessment"] = ChatPromptTemplate.from_messages([
            SystemMessagePromptTemplate.from_template(assessment_system_prompt),
            HumanMessagePromptTemplate.from_template("""
Assess this content:
CONTENT: {content}
CONTEXT: {context}

Provide score (0-100) and brief rationale.
""")
        ])
        
        # Explanation Prompt
        explanation_system_prompt = """You are an educational AI for human rights topics. 
Provide clear, accurate explanations of concepts related to human rights, blockchain, and DRP.

Guidelines:
- Be accurate and fact-based
- Use simple, accessible language
- Provide context and examples
- Respect cultural differences
- Avoid bias and stereotypes
- Cite sources when possible

Audience levels: beginner, intermediate, advanced"""

        templates["explanation"] = ChatPromptTemplate.from_messages([
            SystemMessagePromptTemplate.from_template(explanation_system_prompt),
            HumanMessagePromptTemplate.from_template("""
Explain this concept to a {user_level} audience:
CONCEPT: {concept}

Provide a clear, educational explanation.
""")
        ])
        
        return templates
    
    def _initialize_verification_chain(self):
        """Initialize the verification chain for proof assessment."""
        if not LANGCHAIN_AVAILABLE or not self.llm:
            return None
        
        try:
            # Create verification chain
            verification_prompt = self.prompt_templates["verification"]
            output_parser = JsonOutputParser()
            
            chain = (
                verification_prompt
                | self.chat_model
                | output_parser
            )
            
            return chain
        except Exception as e:
            logger.error(f"Error initializing verification chain: {e}")
            return None
    
    def _initialize_assessment_chain(self):
        """Initialize the assessment chain for content evaluation."""
        if not LANGCHAIN_AVAILABLE or not self.llm:
            return None
        
        try:
            assessment_prompt = self.prompt_templates["assessment"]
            output_parser = JsonOutputParser()
            
            chain = (
                assessment_prompt
                | self.chat_model
                | output_parser
            )
            
            return chain
        except Exception as e:
            logger.error(f"Error initializing assessment chain: {e}")
            return None
    
    def _initialize_explanation_chain(self):
        """Initialize the explanation chain for educational content."""
        if not LANGCHAIN_AVAILABLE or not self.llm:
            return None
        
        try:
            explanation_prompt = self.prompt_templates["explanation"]
            output_parser = StrOutputParser()
            
            chain = (
                explanation_prompt
                | self.chat_model
                | output_parser
            )
            
            return chain
        except Exception as e:
            logger.error(f"Error initializing explanation chain: {e}")
            return None


# ============================================================================
# MAIN SERVICE FUNCTIONS
# ============================================================================

    async def verify_proof(self, submission: ProofSubmission) -> EthicalAssessment:
        """
        Verify a proof submission using ethical AI.
        
        This is the main function for assessing PoAT and PoST submissions.
        """
        logger.info(f"Verifying proof submission: {submission.submission_id}")
        
        # Step 1: Privacy Check
        privacy_result = self.privacy_guard.check_privacy(
            submission.description, 
            submission.user_address
        )
        
        if privacy_result["privacy_violated"]:
            logger.warning(f"Privacy violation detected in submission {submission.submission_id}")
            return EthicalAssessment(
                verdict=EthicalVerdict.REJECTED,
                score=0,
                confidence=0.9,
                rationale=f"Privacy violation detected: {privacy_result['violations']}",
                ethical_tags=["privacy_violation"],
                privacy_check=privacy_result
            )
        
        # Step 2: Human Rights Content Filter
        content_result = self.human_rights_filter.check_content(submission.description)
        
        if content_result[0] == ContentSafetyLevel.UNSAFE:
            logger.warning(f"Unsafe content detected in submission {submission.submission_id}")
            return EthicalAssessment(
                verdict=EthicalVerdict.REJECTED,
                score=10,
                confidence=0.85,
                rationale=f"Content violates human rights: {content_result[1]['banned_categories']}",
                ethical_tags=["human_rights_violation", "unsafe_content"],
                human_rights_check=content_result[1]
            )
        
        if content_result[0] == ContentSafetyLevel.CAUTION:
            logger.info(f"Caution content in submission {submission.submission_id}, flagging for review")
            # Continue with assessment but flag
            pass
        
        # Step 3: Bias Detection
        bias_result = self.bias_detector.detect_bias(
            submission.description, 
            submission.metadata
        )
        
        if bias_result["bias_detected"] and bias_result["severity"] == "high":
            logger.warning(f"High bias detected in submission {submission.submission_id}")
            return EthicalAssessment(
                verdict=EthicalVerdict.FLAGGED,
                score=40,
                confidence=0.8,
                rationale=f"Potential bias detected requiring human review: {bias_result['detected_biases']}",
                ethical_tags=["bias_detected", "requires_review"],
                bias_detection=bias_result
            )
        
        # Step 4: Retrieve relevant knowledge
        knowledge_results = []
        if self.knowledge_base:
            search_query = f"{submission.title} {submission.description[:200]}"
            knowledge_results = self.knowledge_base.search_knowledge(search_query, k=3)
        
        # Step 5: AI Assessment (using LangChain if available)
        if self.verification_chain:
            try:
                ai_result = await self.verification_chain.ainvoke({
                    "verification_type": submission.verification_type.value,
                    "title": submission.title,
                    "description": submission.description,
                    "metadata": json.dumps(submission.metadata),
                    "context": json.dumps(submission.context)
                })
                
                logger.info(f"AI assessment result: {ai_result}")
                
                # Parse AI result
                verdict_str = ai_result.get("verdict", "needs_more_context")
                score = float(ai_result.get("score", 50))
                confidence = float(ai_result.get("confidence", 0.7))
                rationale = ai_result.get("rationale", "AI assessment completed")
                ethical_tags = ai_result.get("ethical_tags", [])
                sources = ai_result.get("sources", [])
                
                # Add knowledge base sources
                for result in knowledge_results:
                    if "source" in result.get("metadata", {}):
                        sources.append(result["metadata"]["source"])
                
                # Adjust based on content filter results
                if content_result[0] == ContentSafetyLevel.CAUTION:
                    score = min(score * 0.8, 70)  # Reduce score by 20%
                    ethical_tags.append("caution_content")
                
                if bias_result["bias_detected"]:
                    score = min(score * 0.85, 75)  # Reduce score by 15%
                    ethical_tags.append("potential_bias")
                
                # Convert verdict string to enum
                try:
                    verdict = EthicalVerdict(verdict_str)
                except ValueError:
                    verdict = EthicalVerdict.NEEDS_CONTEXT
                
                return EthicalAssessment(
                    verdict=verdict,
                    score=score,
                    confidence=confidence,
                    rationale=rationale,
                    ethical_tags=ethical_tags,
                    bias_detection=bias_result,
                    privacy_check=privacy_result,
                    human_rights_check=content_result[1],
                    sources=sources
                )
                
            except Exception as e:
                logger.error(f"Error in AI assessment: {e}")
        
        # Step 6: Fallback to rule-based assessment
        logger.info("Using fallback rule-based assessment")
        return self._rule_based_verification(submission, bias_result, content_result, privacy_result)
    
    def _rule_based_verification(self, 
                                 submission: ProofSubmission,
                                 bias_result: Dict[str, Any],
                                 content_result: Tuple[ContentSafetyLevel, Dict],
                                 privacy_result: Dict[str, Any]) -> EthicalAssessment:
        """Fallback rule-based verification when LangChain is not available."""
        score = 50.0
        rationale_parts = []
        ethical_tags = []
        
        # Base scoring
        if len(submission.description) >= 50:
            score += 10
            rationale_parts.append("Substantial description provided")
        
        if submission.metadata:
            score += 10
            rationale_parts.append("Metadata available")
        
        if submission.attachment_url:
            score += 15
            rationale_parts.append("Supporting documentation attached")
        
        # Verification type specific scoring
        if submission.verification_type == VerificationType.POAT:
            # Check for educational content
            if any(word in submission.description.lower() for word in 
                   ["learn", "study", "educate", "teach", "course", "tutorial"]):
                score += 20
                ethical_tags.append("educational")
            
            if any(word in submission.description.lower() for word in 
                   ["open source", "contribution", "community", "collaborate"]):
                score += 15
                ethical_tags.append("community_contribution")
        
        elif submission.verification_type == VerificationType.POST:
            # Check for legitimate credentials
            if any(word in submission.description.lower() for word in 
                   ["university", "college", "school", "institution", "organization"]):
                score += 20
                ethical_tags.append("legitimate_institution")
            
            if any(word in submission.description.lower() for word in 
                   ["certificate", "diploma", "degree", "license", "credential"]):
                score += 15
                ethical_tags.append("formal_credential")
        
        # Adjust for bias and content issues
        if bias_result.get("bias_detected"):
            score = min(score * 0.8, 70)
            rationale_parts.append(f"Potential bias detected: {bias_result.get('detected_biases')}")
            ethical_tags.append("bias_concern")
        
        if content_result[0] == ContentSafetyLevel.CAUTION:
            score = min(score * 0.85, 75)
            rationale_parts.append("Content requires caution")
            ethical_tags.append("caution_content")
        
        # Determine verdict
        if score >= 80:
            verdict = EthicalVerdict.APPROVED
            rationale_parts.append("High confidence in submission validity")
        elif score >= 60:
            verdict = EthicalVerdict.FLAGGED
            rationale_parts.append("Submission requires human review")
        elif score >= 40:
            verdict = EthicalVerdict.NEEDS_CONTEXT
            rationale_parts.append("More information needed")
        else:
            verdict = EthicalVerdict.REJECTED
            rationale_parts.append("Submission does not meet criteria")
        
        return EthicalAssessment(
            verdict=verdict,
            score=score,
            confidence=0.7,
            rationale="; ".join(rationale_parts),
            ethical_tags=ethical_tags,
            bias_detection=bias_result,
            privacy_check=privacy_result,
            human_rights_check=content_result[1]
        )
    
    async def assess_activity(self, activity_data: Dict[str, Any]) -> Dict[str, Any]:
        """Assess an activity submission (legacy method for backward compatibility)."""
        submission = ProofSubmission(
            submission_id=activity_data.get("submission_id", ""),
            user_address=activity_data.get("user_address", ""),
            verification_type=VerificationType.POAT,
            title=activity_data.get("title", ""),
            description=activity_data.get("description", ""),
            metadata=activity_data.get("metadata", {}),
            context=activity_data.get("context", {})
        )
        
        assessment = await self.verify_proof(submission)
        return assessment.to_dict()
    
    async def explain_concept(self, concept: str, user_level: str = "beginner") -> str:
        """Explain a human rights or DRP concept."""
        if self.explanation_chain:
            try:
                result = await self.explanation_chain.ainvoke({
                    "concept": concept,
                    "user_level": user_level
                })
                return result
            except Exception as e:
                logger.error(f"Error explaining concept: {e}")
        
        # Fallback explanations
        explanations = {
            "what is drp": {
                "beginner": "DRP (Decentralized Rights Protocol) is a system that uses blockchain technology to verify and reward activities that advance human rights and social justice. It allows people to prove their contributions to society and earn tokens for their positive impact.",
                "intermediate": "DRP is a decentralized protocol that creates a verification layer for human rights activities. It uses Proof of Activity (PoAT) and Proof of Status (PoST) mechanisms to establish trust and distribute governance tokens ($RIGHTS) and reward tokens ($DeRi) based on verified contributions.",
                "advanced": "DRP implements a decentralized identity and reputation system where individuals can submit verifiable proofs of activities that advance human rights. The protocol uses a combination of AI verification (Elder AI), community governance, and blockchain technology to create a trustless system for recognizing and rewarding positive social contributions."
            },
            "proof of activity": {
                "beginner": "Proof of Activity (PoAT) is a way to show that you've done something positive for society, like learning new skills, contributing to open-source projects, creating educational content, or participating in community initiatives. When verified, you earn rewards for your contributions.",
                "intermediate": "PoAT is a verification mechanism that allows users to submit evidence of digital activities that advance human rights and social justice. Activities are categorized (learning, development, content, productivity, web3) and assessed by Elder AI before being recorded on the blockchain.",
                "advanced": "PoAT implements a cryptographic verification system where each activity submission is hashed and signed, then assessed by AI models trained on human rights principles. Approved activities trigger token distribution and are recorded as immutable proofs on the DRP blockchain."
            },
            "proof of status": {
                "beginner": "Proof of Status (PoST) is a way to verify your identity or credentials, like being a student, farmer, or member of a human rights organization. This verification gives you governance rights in the DRP system.",
                "intermediate": "PoST is a credential verification system that establishes identity or organizational status for governance participation. Categories include Citizen/Resident, Student, Farmer, NGO Partner, and Cooperative Member, each with different verification requirements.",
                "advanced": "PoST uses decentralized identity verification combined with AI-assisted document analysis to establish trustworthy credentials. Successful verification grants governance weight and access to council proposal creation, enabling participation in DRP governance decisions."
            }
        }
        
        # Try to find the concept
        concept_lower = concept.lower()
        for key, levels in explanations.items():
            if key in concept_lower:
                return levels.get(user_level, levels["beginner"])
        
        return f"I can provide an explanation of {concept} at the {user_level} level. This is a concept related to human rights, blockchain, or the Decentralized Rights Protocol."
    
    async def query_knowledge(self, query: str, context: Optional[Dict] = None) -> Dict[str, Any]:
        """Query the human rights knowledge base."""
        # Search knowledge base
        results = []
        if self.knowledge_base:
            results = self.knowledge_base.search_knowledge(query, k=5)
        
        # Format results
        formatted_results = []
        for result in results:
            if isinstance(result, dict):
                formatted_results.append({
                    "content": result.get("content", ""),
                    "source": result.get("metadata", {}).get("source", "Unknown"),
                    "title": result.get("metadata", {}).get("title", "Untitled"),
                    "relevance": result.get("relevance", 0.8)
                })
        
        return {
            "query": query,
            "results": formatted_results,
            "count": len(formatted_results),
            "sources": [r["source"] for r in formatted_results]
        }
    
    async def health_check(self) -> Dict[str, Any]:
        """Check the health and capabilities of the service."""
        capabilities = ["verify_proof", "assess_activity", "explain_concept"]
        
        if LANGCHAIN_AVAILABLE:
            capabilities.extend(["query_knowledge", "ai_verification"])
        
        if self.knowledge_base:
            capabilities.append("human_rights_knowledge")
        
        return {
            "status": "healthy",
            "provider": self.provider,
            "langchain_available": LANGCHAIN_AVAILABLE,
            "knowledge_base_available": self.knowledge_base is not None,
            "capabilities": capabilities,
            "timestamp": datetime.utcnow().isoformat()
        }
    
    async def close(self):
        """Clean up resources."""
        if hasattr(self, 'client') and self.client:
            await self.client.aclose()


# ============================================================================
# FACTORY FUNCTION
# ============================================================================

def create_ethical_langchain_service(provider: str = "huggingface",
                                    huggingface_key: Optional[str] = None,
                                    openai_key: Optional[str] = None,
                                    nvidia_nim_key: Optional[str] = None) -> EthicalLangChainService:
    """
    Factory function to create an Ethical LangChain Service instance.
    
    Args:
        provider: AI provider to use
        huggingface_key: HuggingFace API key
        openai_key: OpenAI API key
        nvidia_nim_key: NVIDIA NIM API key
    
    Returns:
        Configured EthicalLangChainService instance
    """
    return EthicalLangChainService(
        provider=provider,
        huggingface_key=huggingface_key,
        openai_key=openai_key,
        nvidia_nim_key=nvidia_nim_key,
        use_vector_store=True
    )


# ============================================================================
# MODULE EXPORTS
# ============================================================================

__all__ = [
    "EthicalLangChainService",
    "EthicalAssessment", 
    "ProofSubmission",
    "HumanRightsFilter",
    "BiasDetector",
    "PrivacyGuard",
    "HumanRightsKnowledgeBase",
    "EthicalVerdict",
    "VerificationType",
    "ContentSafetyLevel",
    "EthicalConfig",
    "create_ethical_langchain_service"
]


if __name__ == "__main__":
    # Test the service
    import asyncio
    
    async def test_service():
        logger.info("Testing Ethical LangChain Service...")
        
        # Create service
        service = create_ethical_langchain_service(
            provider="huggingface",
            huggingface_key=None  # Will use fallback
        )
        
        # Test health check
        health = await service.health_check()
        logger.info(f"Health check: {health}")
        
        # Test concept explanation
        explanation = await service.explain_concept("what is drp", "beginner")
        logger.info(f"Explanation: {explanation[:200]}...")
        
        # Test knowledge query
        knowledge = await service.query_knowledge("human rights verification")
        logger.info(f"Knowledge results: {knowledge['count']} found")
        
        # Test proof verification
        submission = ProofSubmission(
            submission_id="test_001",
            user_address="0x123...abc",
            verification_type=VerificationType.POAT,
            title="Open Source Contribution",
            description="I contributed to a human rights documentation project on GitHub by adding accessibility features for people with disabilities.",
            metadata={"url": "https://github.com/humanrights/docs", "type": "contribution"},
            context={"user_level": "intermediate"}
        )
        
        assessment = await service.verify_proof(submission)
        logger.info(f"Assessment: {assessment.verdict.value}, Score: {assessment.score}")
        
        # Clean up
        await service.close()
    
    asyncio.run(test_service())