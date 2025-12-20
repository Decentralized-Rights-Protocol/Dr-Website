/**
 * Level 4 Questions - Expert Level
 * Unique questions for enterprise and advanced DRP concepts
 */

import { LessonQuestions } from './question-schema'

export const level4Questions: LessonQuestions[] = [
  {
    lessonId: '4-1',
    lessonSlug: 'enterprise-integration',
    level: 4,
    questions: [
      {
        id: 'q4-1-1',
        lessonId: '4-1',
        lessonSlug: 'enterprise-integration',
        questionType: 'multiple-choice',
        questionText: 'What is a key challenge when integrating DRP into enterprise systems?',
        options: [
          'DRP doesn\'t work with enterprises',
          'Bridging traditional enterprise infrastructure with decentralized blockchain technology',
          'Enterprises don\'t need DRP',
          'Integration is always simple'
        ],
        correctAnswer: 1,
        explanation: 'Enterprises have legacy systems, compliance requirements, and centralized architectures. Integrating DRP requires bridging these with decentralized blockchain technology while maintaining security and compliance.',
        rewardDeRi: 15,
        difficulty: 4,
        tags: ['enterprise', 'integration', 'challenges']
      },
      {
        id: 'q4-1-2',
        lessonId: '4-1',
        lessonSlug: 'enterprise-integration',
        questionType: 'scenario',
        questionText: 'A large corporation wants to use DRP for digital rights management but needs to comply with GDPR. What approach should they take?',
        options: [
          'Ignore compliance requirements',
          'Use DRP with privacy-preserving features, off-chain storage for sensitive data, and compliance-aware smart contracts',
          'Avoid using DRP',
          'Only use traditional systems'
        ],
        correctAnswer: 1,
        explanation: 'DRP can be integrated with compliance by using privacy-preserving features (zero-knowledge proofs), storing sensitive data off-chain, and designing smart contracts that respect data protection regulations while maintaining blockchain benefits.',
        rewardDeRi: 15,
        difficulty: 5,
        tags: ['enterprise', 'compliance', 'gdpr', 'privacy']
      },
      {
        id: 'q4-1-3',
        lessonId: '4-1',
        lessonSlug: 'enterprise-integration',
        questionType: 'what-if',
        questionText: 'What would happen if enterprises tried to use DRP without considering their existing IT infrastructure?',
        options: [
          'Integration would be seamless',
          'Compatibility issues, security gaps, and operational disruptions would likely occur',
          'Costs would decrease',
          'Performance would improve immediately'
        ],
        correctAnswer: 1,
        explanation: 'Without considering existing infrastructure, enterprises would face compatibility issues, security vulnerabilities, operational disruptions, and increased costs. Proper integration planning is essential.',
        rewardDeRi: 15,
        difficulty: 4,
        tags: ['enterprise', 'integration', 'infrastructure']
      },
      {
        id: 'q4-1-4',
        lessonId: '4-1',
        lessonSlug: 'enterprise-integration',
        questionType: 'concept-matching',
        questionText: 'What is a hybrid integration model for enterprise DRP adoption?',
        options: [
          'Using only blockchain',
          'Combining on-chain critical operations with off-chain enterprise systems and APIs',
          'Avoiding blockchain entirely',
          'Using only traditional systems'
        ],
        correctAnswer: 1,
        explanation: 'A hybrid model uses blockchain for critical operations (rights, payments) while maintaining enterprise systems for non-critical functions, using APIs to bridge them. This balances decentralization benefits with enterprise needs.',
        rewardDeRi: 15,
        difficulty: 4,
        tags: ['enterprise', 'hybrid-model', 'integration']
      },
      {
        id: 'q4-1-5',
        lessonId: '4-1',
        lessonSlug: 'enterprise-integration',
        questionType: 'multiple-choice',
        questionText: 'Why might enterprises choose DRP over traditional rights management?',
        options: [
          'DRP is always cheaper',
          'Transparency, automation, reduced intermediaries, and global accessibility',
          'DRP requires no changes',
          'Traditional systems don\'t work'
        ],
        correctAnswer: 1,
        explanation: 'Enterprises choose DRP for transparency (auditable records), automation (smart contracts), reduced intermediaries (lower costs), and global accessibility (borderless operations), though integration requires planning.',
        rewardDeRi: 15,
        difficulty: 4,
        tags: ['enterprise', 'benefits', 'adoption']
      }
    ]
  },
  {
    lessonId: '4-2',
    lessonSlug: 'supply-chain-applications',
    level: 4,
    questions: [
      {
        id: 'q4-2-1',
        lessonId: '4-2',
        lessonSlug: 'supply-chain-applications',
        questionType: 'multiple-choice',
        questionText: 'How can DRP improve supply chain transparency?',
        options: [
          'By hiding all information',
          'By creating immutable, verifiable records of product journey from origin to consumer',
          'By centralizing all data',
          'By eliminating tracking'
        ],
        correctAnswer: 1,
        explanation: 'DRP creates immutable blockchain records that track products through the supply chain, enabling all parties to verify authenticity, origin, and journey. This prevents fraud and ensures transparency.',
        rewardDeRi: 15,
        difficulty: 4,
        tags: ['supply-chain', 'transparency', 'tracking']
      },
      {
        id: 'q4-2-2',
        lessonId: '4-2',
        lessonSlug: 'supply-chain-applications',
        questionType: 'scenario',
        questionText: 'A food company wants to track produce from farm to store to ensure freshness and authenticity. How can DRP help?',
        options: [
          'DRP cannot track physical goods',
          'Use Activity Proofs to record each transfer, storage conditions, and verification at each supply chain stage',
          'Only track digital products',
          'Use traditional paper records'
        ],
        correctAnswer: 1,
        explanation: 'DRP can track physical goods by recording Activity Proofs at each stage: origin verification, transfer events, storage conditions, and quality checks. This creates an immutable, verifiable chain of custody.',
        rewardDeRi: 15,
        difficulty: 5,
        tags: ['supply-chain', 'activity-proofs', 'tracking']
      },
      {
        id: 'q4-2-3',
        lessonId: '4-2',
        lessonSlug: 'supply-chain-applications',
        questionType: 'what-if',
        questionText: 'What would happen if supply chain data was stored only in centralized databases?',
        options: [
          'Transparency would increase',
          'Data could be altered, single points of failure would exist, and trust would be reduced',
          'Security would improve',
          'Costs would decrease'
        ],
        correctAnswer: 1,
        explanation: 'Centralized databases can be altered, have single points of failure, and require trust in the central authority. Blockchain provides immutability, decentralization, and cryptographic verification.',
        rewardDeRi: 15,
        difficulty: 4,
        tags: ['supply-chain', 'centralization', 'trust']
      },
      {
        id: 'q4-2-4',
        lessonId: '4-2',
        lessonSlug: 'supply-chain-applications',
        questionType: 'concept-matching',
        questionText: 'What is provenance tracking in supply chains?',
        options: [
          'Tracking only current location',
          'Recording the complete history and origin of a product through all stages',
          'Tracking only digital products',
          'Avoiding any tracking'
        ],
        correctAnswer: 1,
        explanation: 'Provenance tracking records the complete history of a product: where it originated, how it was produced, all transfers, storage conditions, and verifications. DRP\'s immutability makes this reliable and tamper-proof.',
        rewardDeRi: 15,
        difficulty: 4,
        tags: ['supply-chain', 'provenance', 'tracking']
      },
      {
        id: 'q4-2-5',
        lessonId: '4-2',
        lessonSlug: 'supply-chain-applications',
        questionType: 'multiple-choice',
        questionText: 'How does DRP prevent counterfeit products in supply chains?',
        options: [
          'By hiding product information',
          'By creating cryptographic proofs of authenticity that cannot be forged',
          'By using only paper certificates',
          'By avoiding verification'
        ],
        correctAnswer: 1,
        explanation: 'DRP creates cryptographic proofs (Activity Proofs) that verify product authenticity at each stage. These proofs cannot be forged, and the immutable blockchain record prevents tampering, making counterfeiting detectable.',
        rewardDeRi: 15,
        difficulty: 4,
        tags: ['supply-chain', 'counterfeit', 'security']
      }
    ]
  },
  {
    lessonId: '4-3',
    lessonSlug: 'identity-access-management',
    level: 4,
    questions: [
      {
        id: 'q4-3-1',
        lessonId: '4-3',
        lessonSlug: 'identity-access-management',
        questionType: 'multiple-choice',
        questionText: 'What is self-sovereign identity in the context of DRP?',
        options: [
          'Identity controlled by a central authority',
          'Users control their own identity data without relying on intermediaries',
          'Identity stored only offline',
          'No identity management needed'
        ],
        correctAnswer: 1,
        explanation: 'Self-sovereign identity gives users control over their identity data. They can prove attributes (age, credentials) without revealing full identity, using cryptographic proofs, reducing reliance on centralized identity providers.',
        rewardDeRi: 15,
        difficulty: 4,
        tags: ['identity', 'self-sovereign', 'privacy']
      },
      {
        id: 'q4-3-2',
        lessonId: '4-3',
        lessonSlug: 'identity-access-management',
        questionType: 'scenario',
        questionText: 'A user wants to prove they are over 18 for content access without revealing their full identity. What DRP feature enables this?',
        options: [
          'Full identity disclosure',
          'Zero-knowledge proofs that verify age without revealing identity',
          'Traditional ID cards',
          'No verification possible'
        ],
        correctAnswer: 1,
        explanation: 'Zero-knowledge proofs allow users to prove they meet criteria (like age) without revealing their full identity. DRP can integrate such proofs for privacy-preserving access control.',
        rewardDeRi: 15,
        difficulty: 5,
        tags: ['identity', 'zero-knowledge-proofs', 'privacy']
      },
      {
        id: 'q4-3-3',
        lessonId: '4-3',
        lessonSlug: 'identity-access-management',
        questionType: 'what-if',
        questionText: 'What would happen if identity management relied entirely on centralized databases?',
        options: [
          'Privacy would improve',
          'Single points of failure, data breaches, and lack of user control would be major risks',
          'Security would be guaranteed',
          'Costs would always decrease'
        ],
        correctAnswer: 1,
        explanation: 'Centralized identity systems create single points of failure, are attractive targets for breaches, and give users no control. Decentralized identity on DRP distributes risk and returns control to users.',
        rewardDeRi: 15,
        difficulty: 4,
        tags: ['identity', 'centralization', 'security']
      },
      {
        id: 'q4-3-4',
        lessonId: '4-3',
        lessonSlug: 'identity-access-management',
        questionType: 'concept-matching',
        questionText: 'What is verifiable credentials in DRP identity management?',
        options: [
          'Unverifiable claims',
          'Cryptographically signed credentials that can be independently verified',
          'Paper certificates only',
          'Credentials that cannot be verified'
        ],
        correctAnswer: 1,
        explanation: 'Verifiable credentials are cryptographically signed claims (like diplomas, licenses) that can be independently verified without contacting the issuer. DRP\'s blockchain provides the infrastructure for this.',
        rewardDeRi: 15,
        difficulty: 4,
        tags: ['identity', 'verifiable-credentials', 'cryptography']
      },
      {
        id: 'q4-3-5',
        lessonId: '4-3',
        lessonSlug: 'identity-access-management',
        questionType: 'multiple-choice',
        questionText: 'How does DRP enable privacy-preserving access control?',
        options: [
          'By requiring full identity disclosure',
          'Through zero-knowledge proofs and selective disclosure of attributes',
          'By avoiding any verification',
          'By storing all data publicly'
        ],
        correctAnswer: 1,
        explanation: 'DRP enables privacy-preserving access control through zero-knowledge proofs (prove criteria without revealing data) and selective disclosure (share only necessary attributes), balancing security with privacy.',
        rewardDeRi: 15,
        difficulty: 5,
        tags: ['identity', 'privacy', 'access-control']
      }
    ]
  },
  {
    lessonId: '4-4',
    lessonSlug: 'cross-chain-interoperability',
    level: 4,
    questions: [
      {
        id: 'q4-4-1',
        lessonId: '4-4',
        lessonSlug: 'cross-chain-interoperability',
        questionType: 'multiple-choice',
        questionText: 'What is cross-chain interoperability?',
        options: [
          'Using only one blockchain',
          'The ability for different blockchain networks to communicate and share data/assets',
          'Avoiding blockchain entirely',
          'Using only traditional systems'
        ],
        correctAnswer: 1,
        explanation: 'Cross-chain interoperability enables different blockchains to communicate, share data, and transfer assets. This allows DRP to work with other networks, expanding functionality and user access.',
        rewardDeRi: 15,
        difficulty: 4,
        tags: ['interoperability', 'cross-chain', 'blockchain']
      },
      {
        id: 'q4-4-2',
        lessonId: '4-4',
        lessonSlug: 'cross-chain-interoperability',
        questionType: 'scenario',
        questionText: 'A user wants to use DRP rights management with assets on Ethereum. What enables this?',
        options: [
          'DRP only works on its own chain',
          'Cross-chain bridges or interoperability protocols that connect DRP with Ethereum',
          'Manual data entry',
          'It\'s impossible'
        ],
        correctAnswer: 1,
        explanation: 'Cross-chain bridges or interoperability protocols (like Polkadot, Cosmos, or specialized bridges) enable DRP to interact with Ethereum and other chains, allowing users to leverage assets across networks.',
        rewardDeRi: 15,
        difficulty: 5,
        tags: ['interoperability', 'bridges', 'ethereum']
      },
      {
        id: 'q4-4-3',
        lessonId: '4-4',
        lessonSlug: 'cross-chain-interoperability',
        questionType: 'what-if',
        questionText: 'What would happen if blockchains couldn\'t interoperate?',
        options: [
          'Ecosystem would be more connected',
          'Isolated networks, fragmented liquidity, and limited functionality would result',
          'Security would improve',
          'Transaction costs would decrease'
        ],
        correctAnswer: 1,
        explanation: 'Without interoperability, each blockchain operates in isolation, fragmenting users, assets, and functionality. Interoperability enables seamless cross-chain operations, expanding possibilities.',
        rewardDeRi: 15,
        difficulty: 4,
        tags: ['interoperability', 'ecosystem', 'fragmentation']
      },
      {
        id: 'q4-4-4',
        lessonId: '4-4',
        lessonSlug: 'cross-chain-interoperability',
        questionType: 'concept-matching',
        questionText: 'What is a cross-chain bridge?',
        options: [
          'A physical bridge',
          'A protocol that enables asset and data transfer between different blockchains',
          'A type of consensus mechanism',
          'A smart contract only'
        ],
        correctAnswer: 1,
        explanation: 'A cross-chain bridge is a protocol that locks assets on one chain and mints equivalent assets on another, or transfers data between chains, enabling interoperability between different blockchain networks.',
        rewardDeRi: 15,
        difficulty: 4,
        tags: ['interoperability', 'bridges', 'cross-chain']
      },
      {
        id: 'q4-4-5',
        lessonId: '4-4',
        lessonSlug: 'cross-chain-interoperability',
        questionType: 'multiple-choice',
        questionText: 'Why is cross-chain interoperability important for DRP\'s growth?',
        options: [
          'It limits DRP to one network',
          'It enables DRP to leverage assets and users from other chains, expanding ecosystem',
          'It reduces functionality',
          'It isolates DRP'
        ],
        correctAnswer: 1,
        explanation: 'Interoperability allows DRP to access users, assets, and functionality from other blockchains, expanding the ecosystem, increasing liquidity, and enabling more use cases than operating in isolation.',
        rewardDeRi: 15,
        difficulty: 4,
        tags: ['interoperability', 'ecosystem', 'growth']
      }
    ]
  }
]

