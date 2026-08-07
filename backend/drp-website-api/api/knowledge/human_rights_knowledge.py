"""
DRP Human Rights Knowledge Base

A comprehensive knowledge base for human rights information, DRP concepts,
and ethical AI guidelines. This serves as the foundation for the RAG (Retrieval 
Augmented Generation) system in the Ethical LangChain Service.

Author: DRP Development Team
Version: 1.0.0
Date: August 7, 2026
"""

import json
import os
from typing import List, Dict, Any, Optional
from dataclasses import dataclass, field
import logging

logger = logging.getLogger(__name__)


@dataclass
class KnowledgeDocument:
    """A single document in the knowledge base."""
    id: str
    title: str
    content: str
    source: str
    category: str
    tags: List[str] = field(default_factory=list)
    metadata: Dict[str, Any] = field(default_factory=dict)
    importance: int = 1  # 1-5 scale
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "source": self.source,
            "category": self.category,
            "tags": self.tags,
            "metadata": self.metadata,
            "importance": self.importance
        }


class HumanRightsKnowledgeBase:
    """
    Comprehensive knowledge base for human rights and DRP concepts.
    
    This knowledge base includes:
    - Universal Declaration of Human Rights (UDHR)
    - International human rights law
    - DRP-specific documentation
    - Ethical AI guidelines
    - Social justice concepts
    - Blockchain and decentralization concepts
    """
    
    def __init__(self, load_from_file: bool = True):
        self.documents: List[KnowledgeDocument] = []
        self.categories: Dict[str, List[KnowledgeDocument]] = {}
        self.tags_index: Dict[str, List[KnowledgeDocument]] = {}
        self._initialize_base_knowledge()
        
        if load_from_file:
            self._load_additional_knowledge()
        
        self._build_indexes()
        logger.info(f"Human Rights Knowledge Base initialized with {len(self.documents)} documents")
    
    def _initialize_base_knowledge(self):
        """Initialize the base knowledge documents."""
        
        # ========================================================================
        # UNIVERSAL DECLARATION OF HUMAN RIGHTS
        # ========================================================================
        udhr_documents = [
            KnowledgeDocument(
                id="udhr_001",
                title="UDHR Preamble",
                content="""The Universal Declaration of Human Rights (UDHR) is a milestone document 
                in the history of human rights. Drafted by representatives with different legal 
                and cultural backgrounds from all regions of the world, the Declaration was 
                proclaimed by the United Nations General Assembly in Paris on 10 December 1948 
                as a common standard of achievements for all peoples and all nations.
                
                The Preamble states: "Whereas recognition of the inherent dignity and of the equal 
                and inalienable rights of all members of the human family is the foundation of 
                freedom, justice and peace in the world, Whereas disregard and contempt for human 
                rights have resulted in barbarous acts which have outraged the conscience of 
                mankind, and the advent of a world in which human beings shall enjoy freedom of 
                speech and belief and freedom from fear and want has been proclaimed as the 
                highest aspiration of the common people..."
                """,
                source="Universal Declaration of Human Rights",
                category="foundational_documents",
                tags=["udhr", "human_rights", "united_nations", "foundational"],
                importance=5
            ),
            KnowledgeDocument(
                id="udhr_article_01",
                title="UDHR Article 1: Equality and Dignity",
                content="""Article 1: All human beings are born free and equal in dignity and rights. 
                They are endowed with reason and conscience and should act towards one another 
                in a spirit of brotherhood.""",
                source="Universal Declaration of Human Rights",
                category="foundational_rights",
                tags=["equality", "dignity", "reason", "conscience", "brotherhood"],
                importance=5
            ),
            KnowledgeDocument(
                id="udhr_article_02",
                title="UDHR Article 2: Non-Discrimination",
                content="""Article 2: Everyone is entitled to all the rights and freedoms set forth in 
                this Declaration, without distinction of any kind, such as race, colour, sex, 
                language, religion, political or other opinion, national or social origin, 
                property, birth or other status. Furthermore, no distinction shall be made on 
                the basis of the political, jurisdictional or international status of the country 
                or territory to which a person belongs, whether it be independent, trust or non-self-
governing.""",
                source="Universal Declaration of Human Rights",
                category="non_discrimination",
                tags=["non_discrimination", "equality", "universal_rights", "race", "gender", "religion"],
                importance=5
            ),
            KnowledgeDocument(
                id="udhr_article_03",
                title="UDHR Article 3: Right to Life, Liberty, Security",
                content="""Article 3: Everyone has the right to life, liberty and security of person.""",
                source="Universal Declaration of Human Rights",
                category="fundamental_rights",
                tags=["life", "liberty", "security", "fundamental_rights"],
                importance=5
            ),
            KnowledgeDocument(
                id="udhr_article_18",
                title="UDHR Article 18: Freedom of Thought, Conscience, Religion",
                content="""Article 18: Everyone has the right to freedom of thought, conscience and religion; 
                this right includes freedom to change his religion or belief, and freedom, either 
                alone or in community with others and in public or private, to manifest his 
                religion or belief in teaching, practice, worship and observance.""",
                source="Universal Declaration of Human Rights",
                category="freedom_rights",
                tags=["freedom_thought", "conscience", "religion", "belief", "worship"],
                importance=4
            ),
            KnowledgeDocument(
                id="udhr_article_19",
                title="UDHR Article 19: Freedom of Opinion and Expression",
                content="""Article 19: Everyone has the right to freedom of opinion and expression; this right 
                includes freedom to hold opinions without interference and to seek, receive and 
                impart information and ideas through any media and regardless of frontiers.""",
                source="Universal Declaration of Human Rights",
                category="freedom_rights",
                tags=["freedom_expression", "opinion", "information", "media", "communication"],
                importance=4
            ),
            KnowledgeDocument(
                id="udhr_article_23",
                title="UDHR Article 23: Right to Work and Fair Conditions",
                content="""Article 23: (1) Everyone has the right to work, to free choice of employment, to just 
                and favourable conditions of work and to protection against unemployment. 
                (2) Everyone, without any discrimination, has the right to equal pay for equal work. 
                (3) Everyone who works has the right to just and favourable remuneration ensuring 
                for himself and his family an existence worthy of human dignity, and 
                supplemented, if necessary, by other means of social protection. 
                (4) Everyone has the right to form and to join trade unions for the protection 
                of his interests.""",
                source="Universal Declaration of Human Rights",
                category="economic_rights",
                tags=["work", "employment", "fair_conditions", "equal_pay", "labor_rights"],
                importance=4
            )
        ]
        
        # ========================================================================
        # INTERNATIONAL HUMAN RIGHTS LAW
        # ========================================================================
        international_law = [
            KnowledgeDocument(
                id="iccpr_001",
                title="International Covenant on Civil and Political Rights (ICCPR)",
                content="""The International Covenant on Civil and Political Rights (ICCPR) is a key 
                international human rights treaty, adopted by the United Nations General 
                Assembly in 1966. It commits its parties to respect the civil and political rights 
                of individuals, including the right to life, freedom of religion, freedom of speech, 
                freedom of assembly, electoral rights and rights to due process and a fair trial.
                
                The ICCPR is part of the International Bill of Human Rights, along with the 
                International Covenant on Economic, Social and Cultural Rights (ICESCR) and 
                the Universal Declaration of Human Rights (UDHR).
                
                Key provisions include: prohibition of torture and cruel treatment, prohibition 
                of slavery and forced labor, right to liberty and security of person, right to 
                humane treatment when deprived of liberty, right to a fair trial, prohibition of 
                retroactive criminal legislation, recognition as a person before the law, and 
                freedom of movement.""",
                source="International Covenant on Civil and Political Rights",
                category="international_law",
                tags=["iccpr", "civil_rights", "political_rights", "un_treaty"],
                importance=4
            ),
            KnowledgeDocument(
                id="icescr_001",
                title="International Covenant on Economic, Social and Cultural Rights (ICESCR)",
                content="""The International Covenant on Economic, Social and Cultural Rights (ICESCR) 
                is another key international human rights treaty, adopted by the United Nations 
                General Assembly in 1966. It commits its parties to work toward the granting of 
                economic, social, and cultural rights (ESCR) to individuals, including labor rights 
                and the right to health, the right to education, and the right to an adequate standard 
                of living.
                
                Part of the International Bill of Human Rights, the ICESCR requires states to 
                take steps "to the maximum of their available resources" to achieve progressively the 
                full realization of the rights recognized in the Covenant.
                
                Key rights include: right to work, right to form and join trade unions, right to 
                social security, right to family life, right to adequate standard of living, right 
                to health, right to education, and right to participate in cultural life.""",
                source="International Covenant on Economic, Social and Cultural Rights",
                category="international_law",
                tags=["icescr", "economic_rights", "social_rights", "cultural_rights", "un_treaty"],
                importance=4
            )
        ]
        
        # ========================================================================
        # DRP-SPECIFIC KNOWLEDGE
        # ========================================================================
        drp_knowledge = [
            KnowledgeDocument(
                id="drp_overview",
                title="DRP Overview: Decentralized Rights Protocol",
                content="""The Decentralized Rights Protocol (DRP) is a revolutionary system that leverages 
                blockchain technology to create a verification layer for human rights activities 
                and social contributions. DRP enables individuals and organizations to submit 
                verifiable proofs of activities that advance human rights, social justice, and 
                community development.
                
                Core Components:
                1. Proof of Activity (PoAT): Verify digital contributions and reward with $DeRi tokens
                2. Proof of Status (PoST): Verify identity/credentials and grant governance rights
                3. Elder AI: Ethical AI system for verification and assessment
                4. DRP Blockchain: Immutable record of verified proofs and transactions
                5. Governance System: Community-driven decision making with $RIGHTS tokens
                
                Mission: To create a decentralized, transparent, and accountable system that 
                recognizes and rewards positive social contributions while advancing human rights 
                and social justice globally.
                
                Vision: A world where every individual's contributions to human rights and social 
                justice are recognized, valued, and rewarded, creating a more equitable and just society.""",
                source="DRP Documentation",
                category="drp_core",
                tags=["drp", "decentralized", "human_rights", "blockchain", "verification"],
                importance=5
            ),
            KnowledgeDocument(
                id="drp_poat",
                title="DRP Proof of Activity (PoAT)",
                content="""Proof of Activity (PoAT) is DRP's mechanism for verifying and rewarding digital 
                contributions that advance human rights and social justice. PoAT allows users to 
                submit evidence of activities they have completed, which are then assessed and 
                verified by the Elder AI system.
                
                Activity Categories:
                1. Learning: Educational activities, courses, research, study
                2. Developer: Coding contributions, open source, software development
                3. Content: Creating educational or advocacy content, writing, media
                4. Productivity: Organizing, managing projects, coordination
                5. Web3: Blockchain development, smart contracts, decentralized applications
                
                Verification Process:
                1. User submits activity with title, description, and supporting evidence
                2. Elder AI assesses the submission using ethical guidelines
                3. AI provides score (0-100) and verdict (approved/flagged/rejected)
                4. Approved activities are recorded on blockchain
                5. User receives $DeRi tokens based on activity impact and quality
                6. Activities can be appealed if user disagrees with assessment
                
                Reward System:
                - Rewards are calculated based on activity type, quality, impact, and duration
                - Each category has different reward weights (learning: 10-20, developer: 50-100, etc.)
                - High-quality, impactful activities receive higher rewards
                - Rewards are distributed in $DeRi tokens
                
                Use Cases:
                - Verifying completion of human rights courses and workshops
                - Recognizing open source contributions to social justice projects
                - Rewarding creation of educational content about human rights
                - Tracking community organizing and advocacy work
                - Documenting blockchain development for social good""",
                source="DRP Documentation",
                category="drp_verification",
                tags=["poat", "proof_of_activity", "verification", "rewards", "deri_tokens"],
                importance=5
            ),
            KnowledgeDocument(
                id="drp_post",
                title="DRP Proof of Status (PoST)",
                content="""Proof of Status (PoST) is DRP's identity verification system that establishes 
                credentials and governance rights within the DRP ecosystem. PoST allows 
                individuals and organizations to verify their status or affiliation, which 
                grants them access to governance features and decision-making power.
                
                Verification Categories:
                1. Citizen/Resident: Government-issued ID verification
                2. Student: Educational institution verification
                3. Farmer: Agricultural cooperative membership
                4. NGO Partner: Non-governmental organization affiliation
                5. Cooperative Member: Worker cooperative membership
                
                Verification Process:
                1. User selects verification category
                2. User provides issuing organization/institution details
                3. User uploads credential proof (ID scan, certificate, letter, etc.)
                4. Elder AI performs initial assessment with human rights focus
                5. AI cross-checks authenticity with DRP partner databases
                6. Verification may require additional human review for complex cases
                7. Successful verification grants governance weight and $RIGHTS tokens
                
                Governance Benefits:
                - Right to create council proposals
                - Voting power in DRP governance decisions
                - Access to governance discussions and working groups
                - Ability to participate in community decision-making
                - Governance weight based on verification level and contributions
                
                Verification Requirements:
                - Clear, legible documentation
                - Legitimate issuing organizations
                - No fraudulent or stolen credentials
                - Compliance with human rights principles
                - Partner reference codes for accelerated verification
                
                Security and Privacy:
                - All credential documents are encrypted
                - Sensitive information is not stored permanently
                - User data is protected according to privacy regulations
                - Verification can be appealed if rejected""",
                source="DRP Documentation", 
                category="drp_verification",
                tags=["post", "proof_of_status", "governance", "rights_tokens", "verification"],
                importance=5
            ),
            KnowledgeDocument(
                id="drp_governance",
                title="DRP Governance System",
                content="""The DRP Governance System is a decentralized, community-driven approach to 
                decision-making and protocol development. It ensures that DRP remains 
                accountable to its users and aligned with its mission of advancing human rights.
                
                Governance Tokens:
                - $RIGHTS: Governance tokens earned through PoST verification
                - $DeRi: Reward tokens earned through PoAT activities
                - Governance weight determines voting power and proposal creation rights
                
                Governance Components:
                1. Council Proposals: Users with sufficient governance weight can create proposals
                2. Community Voting: All users can vote on proposals based on their governance weight
                3. Working Groups: Specialized teams focused on specific areas (AI, blockchain, etc.)
                4. Appeal System: Mechanism for challenging AI decisions and governance outcomes
                5. Transparency: All governance actions are recorded on blockchain
                
                Proposal Types:
                - Protocol Upgrades: Changes to DRP's technical infrastructure
                - Policy Changes: Modifications to verification and reward policies
                - Partnership Proposals: New collaborations and integrations
                - Funding Requests: Allocation of community funds
                - Ethical Guidelines: Updates to AI and human rights principles
                
                Voting Process:
                1. Proposal submission with detailed description and rationale
                2. Discussion period for community feedback
                3. Voting period where users cast their votes
                4. Result calculation based on governance weight
                5. Implementation if proposal passes threshold
                
                Safeguards:
                - Minimum governance weight requirements for proposal creation
                - Time-locked voting periods to prevent rushing
                - Appeal mechanisms for controversial decisions
                - Emergency protocols for harmful proposals
                - Human oversight for critical decisions""",
                source="DRP Documentation",
                category="drp_governance",
                tags=["governance", "rights_tokens", "voting", "proposals", "community"],
                importance=4
            ),
            KnowledgeDocument(
                id="drp_elder_ai",
                title="DRP Elder AI: Ethical AI Verification System",
                content="""Elder AI is DRP's ethical artificial intelligence system designed specifically for 
                verifying proof submissions while upholding human rights principles. Unlike 
                traditional AI systems, Elder AI is built with human rights at its core and 
                incorporates multiple safeguards to ensure fairness, transparency, and accountability.
                
                Core Principles:
                1. Human Rights First: All decisions prioritize human rights and dignity
                2. Fairness and Non-Discrimination: Equal treatment for all users regardless of background
                3. Transparency: All decisions are explainable and auditable
                4. Privacy Protection: User data is handled with maximum confidentiality
                5. Accountability: AI decisions can be reviewed and appealed
                
                Architecture:
                - Content Filters: Block hate speech, violence, discrimination, and human rights violations
                - Bias Detectors: Identify and mitigate potential bias in submissions
                - Privacy Guards: Protect sensitive user information
                - Knowledge Base: Human rights and DRP-specific information for context
                - LangChain Integration: Advanced reasoning and retrieval-augmented generation
                - Fallback Mechanisms: Rule-based assessment when AI is unavailable
                
                Verification Workflow:
                1. Privacy Check: Ensure no sensitive data is exposed
                2. Human Rights Filter: Block content violating human rights
                3. Bias Detection: Identify potential discrimination or bias
                4. Knowledge Retrieval: Find relevant human rights context
                5. AI Assessment: Use LangChain for ethical reasoning
                6. Scoring: Calculate verification score and confidence
                7. Decision: Provide verdict with detailed rationale
                8. Audit: Record all decisions for transparency
                
                Assessment Criteria:
                - Authenticity: Is the proof genuine and verifiable?
                - Relevance: Does it advance human rights or social justice?
                - Impact: What is the potential positive impact?
                - Quality: How well-documented and substantial is the proof?
                - Alignment: Does it align with DRP's mission and values?
                
                Human Oversight:
                - All rejected submissions can be appealed
                - Flagged submissions receive human review
                - Complex cases escalate to community council
                - Regular audits of AI decisions
                - Continuous improvement from user feedback
                
                Model Selection:
                - Primary: Mistral AI models via NVIDIA NIM
                - Fallback: Open-source models from HuggingFace
                - Future: DRP-specific fine-tuned models
                - All models must pass ethical evaluation before deployment""",
                source="DRP Documentation",
                category="drp_ai",
                tags=["elder_ai", "ethical_ai", "verification", "langchain", "nvidia_nim"],
                importance=5
            )
        ]
        
        # ========================================================================
        # ETHICAL AI GUIDELINES
        # ========================================================================
        ethical_ai = [
            KnowledgeDocument(
                id="ai_ethics_principles",
                title="DRP Ethical AI Principles",
                content="""The Decentralized Rights Protocol's Ethical AI Principles establish the framework 
                for all artificial intelligence systems used within DRP. These principles ensure that 
                AI serves human rights rather than undermining them.
                
                1. Human Rights First:
                All AI decisions must be filtered through human rights impact assessment. 
                AI systems must prioritize the protection and advancement of human rights above 
                all other considerations. No AI system in DRP can override fundamental human rights.
                
                2. Transparency and Accountability:
                AI systems must be explainable, auditable, and accountable. All AI decisions 
                include clear rationale, and users have the right to understand and challenge 
                decisions that affect them.
                
                3. Decentralization and User Control:
                Users maintain control over their data and AI interactions. Users can appeal 
                AI decisions, opt-out of AI processing, and own their verification data.
                
                4. Fairness and Non-Discrimination:
                AI systems must be fair and non-discriminatory across all demographic groups. 
                Bias detection, fairness testing, and regular audits ensure equitable treatment.
                
                5. Privacy and Data Protection:
                User data is sacred and must be protected with strong encryption, minimal 
                collection, and strict retention policies. All AI processing respects user 
                privacy and complies with data protection regulations.
                
                Implementation:
                - Human rights filters block harmful content
                - Bias detectors identify and mitigate potential discrimination
                - Privacy guards prevent exposure of sensitive information
                - Knowledge base provides human rights context
                - Audit logging ensures transparency and accountability
                - Appeal mechanisms allow users to challenge decisions
                
                Monitoring:
                - Fairness metrics across demographic groups
                - Bias detection alerts and analysis
                - Privacy violation monitoring
                - User satisfaction and appeal rates
                - Regular third-party audits""",
                source="DRP Ethical AI Guidelines",
                category="ai_ethics",
                tags=["ethics", "ai_principles", "human_rights", "fairness", "transparency"],
                importance=5
            ),
            KnowledgeDocument(
                id="ai_content_filters",
                title="Ethical AI Content Filters",
                content="""DRP's Ethical AI uses multiple content filters to ensure that all processed content 
                aligns with human rights principles and community values. These filters work in 
                combination to create a robust content safety system.
                
                Human Rights Filter:
                - Blocks: Content promoting violence, hatred, exploitation, discrimination, 
                  misinformation, or human rights violations
                - Allows: Educational content, human rights advocacy, social justice initiatives, 
                  community building, personal development
                
                Content Safety Levels:
                1. SAFE: Content is appropriate and aligns with human rights
                2. CAUTION: Content may have some concerns but doesn't violate core principles
                3. UNSAFE: Content violates human rights or community standards
                4. ILLEGAL: Content violates laws or promotes illegal activities
                
                Filtering Process:
                1. Privacy Check: Ensure no sensitive personal data is exposed
                2. Human Rights Scan: Check for violations of human rights principles
                3. Bias Detection: Identify potential discrimination or unfair treatment
                4. Context Analysis: Consider the broader context of the content
                5. Community Standards: Apply DRP's ethical guidelines
                
                False Positive Mitigation:
                - Content flagged as unsafe can be appealed
                - Human reviewers assess borderline cases
                - Context and intent are considered
                - Users can provide additional information
                - System learns from appeal outcomes
                
                Banned Categories:
                - Hate speech and discriminatory content
                - Violence and threats
                - Exploitation and abuse
                - Misinformation and propaganda
                - Human rights violations
                - Illegal activities
                
                Allowed Categories:
                - Education and learning
                - Human rights advocacy
                - Community development
                - Social justice initiatives
                - Open source contributions
                - Research and documentation
                - Personal growth and development""",
                source="DRP Ethical AI Guidelines",
                category="ai_ethics",
                tags=["content_filters", "safety", "moderation", "human_rights", "bias_detection"],
                importance=4
            )
        ]
        
        # ========================================================================
        # SOCIAL JUSTICE AND HUMAN RIGHTS CONCEPTS
        # ========================================================================
        social_justice = [
            KnowledgeDocument(
                id="social_justice_overview",
                title="Social Justice: Overview and Principles",
                content="""Social justice is the concept of creating a fair and equal society in which each 
                individual matters, their rights are recognized and protected, and they are able 
                to meet their basic needs and have opportunities to reach their full potential.
                
                Core Principles:
                1. Equity: Fair distribution of resources, opportunities, and responsibilities
                2. Access: Equal access to education, healthcare, employment, and basic services
                3. Participation: Meaningful involvement in decision-making processes
                4. Rights: Protection and promotion of human rights for all individuals
                5. Dignity: Respect for the inherent worth and dignity of every person
                
                Social Justice vs. Equality:
                - Equality: Treating everyone the same
                - Equity: Giving everyone what they need to succeed
                - Social justice focuses on equity, recognizing that people have different 
                  circumstances and need different levels of support
                
                Key Areas of Social Justice:
                1. Economic Justice: Fair distribution of economic resources and opportunities
                2. Racial Justice: Ending systemic racism and promoting racial equality
                3. Gender Justice: Achieving gender equality and ending gender-based discrimination
                4. Environmental Justice: Fair treatment and meaningful involvement in environmental decisions
                5. Criminal Justice: Fair and equitable treatment in the criminal justice system
                6. Education Justice: Equal access to quality education for all
                7. Healthcare Justice: Universal access to healthcare services
                
                Social Justice in Technology:
                - Digital Divide: Bridging the gap in access to technology
                - Algorithmic Fairness: Ensuring AI and algorithms don't perpetuate bias
                - Data Privacy: Protecting user data and respecting privacy rights
                - Accessibility: Making technology accessible to people with disabilities
                - Inclusive Design: Designing technology that serves diverse populations
                
                DRP's Role in Social Justice:
                - Recognizing and rewarding contributions to social justice
                - Creating economic opportunities through token rewards
                - Promoting transparency and accountability
                - Building decentralized systems that empower individuals
                - Supporting marginalized communities and voices""",
                source="Social Justice Principles",
                category="social_justice",
                tags=["social_justice", "equity", "human_rights", "fairness", "justice"],
                importance=4
            ),
            KnowledgeDocument(
                id="intersectionality",
                title="Intersectionality: Understanding Overlapping Systems of Discrimination",
                content="""Intersectionality is a framework for understanding how various social identities 
                such as race, gender, sexuality, class, and disability intersect and how these 
                intersections create unique experiences of privilege and oppression. 
                
                Originated by legal scholar Kimberlé Crenshaw in 1989, intersectionality 
                highlights that people's lived experiences cannot be reduced to single aspects 
                of their identity. Instead, multiple identities interact to shape individuals' 
                experiences of discrimination and privilege.
                
                Key Concepts:
                1. Multiple Identities: People have multiple, simultaneous social identities
                2. Intersecting Systems: Different forms of discrimination (racism, sexism, etc.) 
                   interact and compound each other
                3. Unique Experiences: The combination of identities creates unique experiences 
                   that cannot be understood by looking at each identity separately
                4. Structural Inequality: Intersectionality focuses on systemic, structural inequalities 
                   rather than individual bias
                
                Examples:
                - A Black woman's experience is not just the sum of being Black and being a woman
                - A disabled person of color faces unique barriers that combine ableism and racism
                - A low-income LGBTQ+ person may experience discrimination based on all these identities
                
                Why Intersectionality Matters:
                1. Comprehensive Understanding: Helps understand complex experiences of discrimination
                2. Effective Solutions: Enables development of solutions that address multiple forms of 
                   discrimination simultaneously
                3. Inclusive Advocacy: Ensures advocacy efforts don't inadvertently exclude or harm 
                   certain groups
                4. Policy Development: Informs policies that consider the complexity of lived experiences
                
                Intersectionality in AI:
                - AI systems must consider how different identities intersect in user experiences
                - Training data must represent diverse, intersecting identities
                - Bias detection must look for compounded discrimination
                - Fairness metrics must account for intersectional impacts
                
                DRP's Approach:
                - Collect data on intersecting identities (where users choose to share)
                - Analyze reward distribution across intersectional groups
                - Ensure verification processes don't disadvantage intersectional communities
                - Support projects and activities that address intersectional issues""",
                source="Social Justice Theory",
                category="social_justice",
                tags=["intersectionality", "discrimination", "privilege", "oppression", "social_justice"],
                importance=4
            )
        ]
        
        # ========================================================================
        # BLOCKCHAIN AND DECENTRALIZATION CONCEPTS
        # ========================================================================
        blockchain_concepts = [
            KnowledgeDocument(
                id="blockchain_basics",
                title="Blockchain Technology: Basics and Principles",
                content="""Blockchain is a decentralized, distributed ledger technology that records transactions 
                across multiple computers in a way that the registered transactions cannot be altered 
                retroactively, without the alteration of all subsequent blocks and the consensus of 
                the network.
                
                Key Characteristics:
                1. Decentralization: No single point of control or failure
                2. Immutability: Once recorded, data cannot be easily changed
                3. Transparency: All transactions are visible to network participants
                4. Consensus: Network participants agree on the validity of transactions
                5. Security: Cryptographic protection against tampering
                6. Trustless: Participants don't need to trust each other, just the system
                
                How Blockchain Works:
                1. Transaction Initiation: A user requests a transaction
                2. Transaction Verification: Network nodes validate the transaction
                3. Block Creation: Valid transactions are grouped into a block
                4. Consensus: Network reaches agreement on the block's validity
                5. Block Addition: The block is added to the chain
                6. Chain Update: All nodes update their copy of the ledger
                
                Types of Blockchains:
                1. Public Blockchains: Open to anyone (Bitcoin, Ethereum)
                2. Private Blockchains: Restricted access, permissioned
                3. Consortium Blockchains: Controlled by a group of organizations
                4. Hybrid Blockchains: Combine public and private elements
                
                DRP's Blockchain:
                - Public blockchain for transparency and accountability
                - Proof-of-Activity consensus mechanism
                - Records all verified proofs and transactions
                - Immutable history of contributions and rewards
                - Smart contracts for automated reward distribution
                - Decentralized governance for protocol changes
                
                Benefits for Human Rights:
                - Transparency: All actions are publicly verifiable
                - Immutability: Records cannot be altered or deleted
                - Censorship Resistance: No single entity can control the network
                - Trustless: Users don't need to trust DRP, just the blockchain
                - Empowerment: Individuals have control over their own data and proofs
                - Accountability: All actions are permanently recorded""",
                source="Blockchain Technology",
                category="blockchain",
                tags=["blockchain", "decentralization", "transparency", "immutability", "trustless"],
                importance=4
            ),
            KnowledgeDocument(
                id="decentralization_benefits",
                title="Decentralization: Benefits for Human Rights and Social Justice",
                content="""Decentralization is the process of distributing or dispersing functions, powers, people, 
                or things away from a central location or authority. In the context of technology and 
                governance, decentralization offers significant benefits for human rights and social justice.
                
                Benefits of Decentralization:
                1. Reduced Power Concentration: Prevents any single entity from having too much control
                2. Increased Resilience: Systems are more robust against failures and attacks
                3. Enhanced Transparency: Open systems allow for greater scrutiny and accountability
                4. Greater Accessibility: Lower barriers to entry for marginalized communities
                5. Improved Inclusivity: More voices can participate in decision-making
                6. Resistance to Censorship: Harder for authorities to suppress information or actions
                7. User Empowerment: Individuals have more control over their data and identity
                
                Decentralization in DRP:
                - Decentralized Verification: No single entity controls proof verification
                - Decentralized Governance: Community members participate in decision-making
                - Decentralized Identity: Users control their own identity and credentials
                - Decentralized Rewards: Token distribution is automated and transparent
                - Decentralized Data: User data is stored across the network, not in a central database
                
                Challenges and Solutions:
                Challenge: Coordination in decentralized systems can be difficult
                Solution: Clear protocols, incentives, and governance mechanisms
                
                Challenge: Quality control without central authority
                Solution: Community review, reputation systems, and AI assistance
                
                Challenge: Preventing malicious actors from exploiting the system
                Solution: Economic incentives, proof requirements, and ethical guidelines
                
                Challenge: Ensuring accessibility for all users
                Solution: Low-cost participation, education, and support systems
                
                Decentralization and Human Rights:
                - Empowers marginalized communities to have a voice
                - Reduces dependence on potentially corrupt or biased central authorities
                - Creates systems that are inherently resistant to censorship
                - Enables individuals to control their own data and identity
                - Promotes transparency and accountability in governance
                - Facilitates cross-border collaboration and solidarity
                
                The Future of Decentralization:
                DRP represents a new paradigm where decentralized systems are used not just for 
                financial transactions, but for social good and human rights advancement. By 
                combining blockchain technology with ethical AI and community governance, DRP 
                demonstrates how decentralization can create more just, equitable, and transparent 
                systems for everyone.""",
                source="Decentralization Theory",
                category="blockchain",
                tags=["decentralization", "human_rights", "social_justice", "blockchain", "empowerment"],
                importance=4
            )
        ]
        
        # Combine all knowledge documents
        all_documents = (
            udhr_documents + international_law + drp_knowledge + 
            ethical_ai + social_justice + blockchain_concepts
        )
        
        self.documents = all_documents
        return all_documents
    
    def _load_additional_knowledge(self):
        """Load additional knowledge from external files."""
        # Check for knowledge base files
        knowledge_dir = os.path.join(os.path.dirname(__file__), "knowledge_files")
        if os.path.exists(knowledge_dir):
            for filename in os.listdir(knowledge_dir):
                if filename.endswith(".json"):
                    try:
                        filepath = os.path.join(knowledge_dir, filename)
                        with open(filepath, 'r', encoding='utf-8') as f:
                            data = json.load(f)
                            
                        # Convert to KnowledgeDocument
                        for doc_data in data:
                            doc = KnowledgeDocument(
                                id=doc_data.get("id", ""),
                                title=doc_data.get("title", ""),
                                content=doc_data.get("content", ""),
                                source=doc_data.get("source", "Unknown"),
                                category=doc_data.get("category", "general"),
                                tags=doc_data.get("tags", []),
                                metadata=doc_data.get("metadata", {}),
                                importance=doc_data.get("importance", 1)
                            )
                            self.documents.append(doc)
                            
                    except Exception as e:
                        logger.error(f"Error loading knowledge file {filename}: {e}")
    
    def _build_indexes(self):
        """Build category and tag indexes for efficient lookup."""
        self.categories = {}
        self.tags_index = {}
        
        for doc in self.documents:
            # Index by category
            if doc.category not in self.categories:
                self.categories[doc.category] = []
            self.categories[doc.category].append(doc)
            
            # Index by tags
            for tag in doc.tags:
                tag_lower = tag.lower()
                if tag_lower not in self.tags_index:
                    self.tags_index[tag_lower] = []
                if doc not in self.tags_index[tag_lower]:
                    self.tags_index[tag_lower].append(doc)
    
    def search(self, query: str, category: Optional[str] = None, 
               tags: Optional[List[str]] = None, limit: int = 10) -> List[KnowledgeDocument]:
        """Search the knowledge base for relevant documents."""
        query_lower = query.lower()
        results = []
        
        # Filter by category if specified
        documents_to_search = self.documents
        if category and category in self.categories:
            documents_to_search = self.categories[category]
        
        # Filter by tags if specified
        if tags:
            tag_results = []
            for tag in tags:
                tag_lower = tag.lower()
                if tag_lower in self.tags_index:
                    if not tag_results:
                        tag_results = self.tags_index[tag_lower].copy()
                    else:
                        # Intersect with existing results
                        tag_results = [doc for doc in tag_results if doc in self.tags_index[tag_lower]]
            
            if tag_results:
                documents_to_search = tag_results
        
        # Search for matching documents
        for doc in documents_to_search:
            if query_lower in doc.content.lower() or query_lower in doc.title.lower():
                results.append(doc)
            else:
                # Check if any of the query words are in the document
                query_words = query_lower.split()
                doc_words = set(doc.content.lower().split() + doc.title.lower().split())
                if any(word in doc_words for word in query_words):
                    results.append(doc)
        
        # Sort by importance and relevance
        results.sort(key=lambda doc: (
            -doc.importance,  # Higher importance first
            doc.title.lower().find(query_lower)  # Better title matches first
        ))
        
        return results[:limit]
    
    def get_by_id(self, doc_id: str) -> Optional[KnowledgeDocument]:
        """Get a document by its ID."""
        for doc in self.documents:
            if doc.id == doc_id:
                return doc
        return None
    
    def search_knowledge(self, query: str, k: int = 3) -> List[Dict[str, Any]]:
        """Search the knowledge base for relevant information.
        
        This method provides compatibility with the EthicalLangChainService interface.
        
        Args:
            query: Search query string
            k: Maximum number of results to return
            
        Returns:
            List of dictionaries with content, metadata, and relevance
        """
        # Use the existing search method
        results = self.search(query, limit=k)
        
        # Format results to match expected interface
        formatted_results = []
        for doc in results:
            formatted_results.append({
                "content": doc.content,
                "metadata": {
                    "title": doc.title,
                    "source": doc.source,
                    "category": doc.category,
                    "tags": doc.tags,
                    "importance": doc.importance
                },
                "relevance": 1.0
            })
        
        return formatted_results
    
    def get_by_category(self, category: str) -> List[KnowledgeDocument]:
        """Get all documents in a category."""
        return self.categories.get(category, [])
    
    def get_by_tag(self, tag: str) -> List[KnowledgeDocument]:
        """Get all documents with a specific tag."""
        tag_lower = tag.lower()
        return self.tags_index.get(tag_lower, [])
    
    def get_random_document(self, category: Optional[str] = None) -> Optional[KnowledgeDocument]:
        """Get a random document from the knowledge base."""
        import random
        
        if category and category in self.categories:
            docs = self.categories[category]
        else:
            docs = self.documents
        
        return random.choice(docs) if docs else None
    
    def get_statistics(self) -> Dict[str, Any]:
        """Get statistics about the knowledge base."""
        category_counts = {category: len(docs) for category, docs in self.categories.items()}
        tag_counts = {tag: len(docs) for tag, docs in self.tags_index.items()}
        
        return {
            "total_documents": len(self.documents),
            "total_categories": len(self.categories),
            "total_tags": len(self.tags_index),
            "category_counts": category_counts,
            "top_tags": sorted(tag_counts.items(), key=lambda x: x[1], reverse=True)[:10]
        }
    
    def export_to_json(self, filepath: str):
        """Export the knowledge base to a JSON file."""
        data = [doc.to_dict() for doc in self.documents]
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        logger.info(f"Knowledge base exported to {filepath}")
    
    def import_from_json(self, filepath: str):
        """Import knowledge from a JSON file."""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            new_docs = []
            for doc_data in data:
                doc = KnowledgeDocument(
                    id=doc_data.get("id", ""),
                    title=doc_data.get("title", ""),
                    content=doc_data.get("content", ""),
                    source=doc_data.get("source", "Unknown"),
                    category=doc_data.get("category", "general"),
                    tags=doc_data.get("tags", []),
                    metadata=doc_data.get("metadata", {}),
                    importance=doc_data.get("importance", 1)
                )
                new_docs.append(doc)
            
            # Add new documents
            existing_ids = {doc.id for doc in self.documents}
            for doc in new_docs:
                if doc.id not in existing_ids:
                    self.documents.append(doc)
            
            # Rebuild indexes
            self._build_indexes()
            logger.info(f"Imported {len(new_docs)} documents from {filepath}")
            
        except Exception as e:
            logger.error(f"Error importing knowledge from {filepath}: {e}")


# ============================================================================
# SINGLETON INSTANCE
# ============================================================================

# Create a singleton instance of the knowledge base
_knowledge_base: Optional[HumanRightsKnowledgeBase] = None


def get_knowledge_base() -> HumanRightsKnowledgeBase:
    """Get the singleton knowledge base instance."""
    global _knowledge_base
    if _knowledge_base is None:
        _knowledge_base = HumanRightsKnowledgeBase()
    return _knowledge_base


def reset_knowledge_base():
    """Reset the knowledge base singleton (useful for testing)."""
    global _knowledge_base
    _knowledge_base = None


# ============================================================================
# EXPORTS
# ============================================================================

__all__ = [
    "HumanRightsKnowledgeBase",
    "KnowledgeDocument",
    "get_knowledge_base",
    "reset_knowledge_base"
]


if __name__ == "__main__":
    # Test the knowledge base
    kb = get_knowledge_base()
    
    print("Human Rights Knowledge Base Test")
    print("=" * 50)
    
    # Get statistics
    stats = kb.get_statistics()
    print(f"Total documents: {stats['total_documents']}")
    print(f"Total categories: {stats['total_categories']}")
    print(f"Total tags: {stats['total_tags']}")
    print(f"Categories: {list(stats['category_counts'].keys())}")
    print(f"Top tags: {stats['top_tags'][:5]}")
    
    # Test search
    print("\nSearch Test:")
    results = kb.search("human rights verification", limit=3)
    for i, doc in enumerate(results):
        print(f"{i+1}. {doc.title} ({doc.source})")
        print(f"   Relevance: Content contains search terms")
        print()
    
    # Test category lookup
    print("Category Test:")
    drp_docs = kb.get_by_category("drp_core")
    print(f"DRP Core documents: {len(drp_docs)}")
    for doc in drp_docs:
        print(f"  - {doc.title}")
    
    # Test tag lookup
    print("\nTag Test:")
    ethics_docs = kb.get_by_tag("ethics")
    print(f"Ethics tagged documents: {len(ethics_docs)}")
    for doc in ethics_docs[:3]:
        print(f"  - {doc.title}")
    
    # Test random document
    print("\nRandom Document Test:")
    random_doc = kb.get_random_document()
    if random_doc:
        print(f"Title: {random_doc.title}")
        print(f"Source: {random_doc.source}")
        print(f"Content preview: {random_doc.content[:100]}...")