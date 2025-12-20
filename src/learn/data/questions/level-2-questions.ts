/**
 * Level 2 Questions - Intermediate Level
 * Unique questions for DRP-specific concepts
 */

import { LessonQuestions } from './question-schema'

export const level2Questions: LessonQuestions[] = [
  {
    lessonId: '2-1',
    lessonSlug: 'drp-architecture',
    level: 2,
    questions: [
      {
        id: 'q2-1-1',
        lessonId: '2-1',
        lessonSlug: 'drp-architecture',
        questionType: 'multiple-choice',
        questionText: 'What is the primary purpose of DRP\'s Protocol Layer?',
        options: [
          'User interface rendering',
          'Core business logic and smart contracts for rights management',
          'Network node discovery',
          'Consensus mechanism execution'
        ],
        correctAnswer: 1,
        explanation: 'The Protocol Layer contains the core smart contracts that handle rights management, royalty distribution, and activity proof verification. It\'s where the business logic of DRP resides.',
        rewardDeRi: 8,
        difficulty: 2,
        tags: ['drp-architecture', 'protocol-layer']
      },
      {
        id: 'q2-1-2',
        lessonId: '2-1',
        lessonSlug: 'drp-architecture',
        questionType: 'scenario',
        questionText: 'A music streaming platform wants to automatically pay artists when songs are played. Which DRP component would handle this?',
        options: [
          'Network Layer',
          'Consensus Layer',
          'Royalty Distribution Contract in the Protocol Layer',
          'Application Layer only'
        ],
        correctAnswer: 2,
        explanation: 'The Royalty Distribution Contract, part of the Protocol Layer, automatically calculates and distributes royalties based on predefined rules. It executes when activity proofs are verified, ensuring timely payments to creators.',
        rewardDeRi: 8,
        difficulty: 3,
        tags: ['royalty-distribution', 'smart-contracts', 'use-cases']
      },
      {
        id: 'q2-1-3',
        lessonId: '2-1',
        lessonSlug: 'drp-architecture',
        questionType: 'what-if',
        questionText: 'What would happen if DRP\'s layered architecture didn\'t separate the Protocol Layer from the Consensus Layer?',
        options: [
          'The system would be more efficient',
          'Changes to consensus mechanisms would require rewriting rights management code',
          'Transaction fees would decrease',
          'The network would be more secure'
        ],
        correctAnswer: 1,
        explanation: 'Separation of concerns allows independent development and updates. Without it, changes to consensus would require modifying rights management code, making the system harder to maintain and upgrade.',
        rewardDeRi: 8,
        difficulty: 3,
        tags: ['architecture', 'separation-of-concerns', 'modularity']
      },
      {
        id: 'q2-1-4',
        lessonId: '2-1',
        lessonSlug: 'drp-architecture',
        questionType: 'concept-matching',
        questionText: 'Which DRP component stores digital rights ownership and maps content to rights holders?',
        options: [
          'Royalty Distribution Contract',
          'Rights Registry Contract',
          'Activity Proof Contract',
          'Token Economics Contract'
        ],
        correctAnswer: 1,
        explanation: 'The Rights Registry Contract is the central registry that stores digital rights ownership, maps content to rights holders, manages rights transfers, and maintains metadata about registered content.',
        rewardDeRi: 8,
        difficulty: 2,
        tags: ['rights-registry', 'smart-contracts']
      },
      {
        id: 'q2-1-5',
        lessonId: '2-1',
        lessonSlug: 'drp-architecture',
        questionType: 'multiple-choice',
        questionText: 'What makes DRP\'s architecture suitable for building decentralized applications?',
        options: [
          'It requires centralized servers',
          'The Application Layer provides APIs and interfaces for developers to build DApps',
          'It only supports web applications',
          'Developers must write consensus code'
        ],
        correctAnswer: 1,
        explanation: 'DRP\'s Application Layer provides APIs, interfaces, and developer tools that allow developers to build DApps without needing to understand the underlying consensus or protocol layers, enabling rapid development.',
        rewardDeRi: 8,
        difficulty: 2,
        tags: ['dapps', 'application-layer', 'developer-tools']
      }
    ]
  },
  {
    lessonId: '2-2',
    lessonSlug: 'post-poat-consensus',
    level: 2,
    questions: [
      {
        id: 'q2-2-1',
        lessonId: '2-2',
        lessonSlug: 'post-poat-consensus',
        questionType: 'multiple-choice',
        questionText: 'What does PoST stand for in DRP\'s consensus mechanism?',
        options: [
          'Proof of Stake and Time',
          'Proof of Storage and Trust',
          'Proof of Stake Transaction',
          'Proof of Secure Time'
        ],
        correctAnswer: 0,
        explanation: 'PoST stands for Proof of Stake + Time, combining stake amount (40%) with network participation time (60%) to select validators. This ensures both economic commitment and long-term network participation.',
        rewardDeRi: 8,
        difficulty: 2,
        tags: ['post', 'consensus', 'validator-selection']
      },
      {
        id: 'q2-2-2',
        lessonId: '2-2',
        lessonSlug: 'post-poat-consensus',
        questionType: 'scenario',
        questionText: 'A validator wants to increase their chances of being selected to create blocks. What should they focus on?',
        options: [
          'Only increasing their stake amount',
          'Both increasing stake and maintaining long-term network participation',
          'Only participating for short periods',
          'Avoiding network participation'
        ],
        correctAnswer: 1,
        explanation: 'PoST considers both stake (40%) and participation time (60%), so validators should both stake tokens and maintain consistent, long-term participation to maximize their validator score.',
        rewardDeRi: 8,
        difficulty: 3,
        tags: ['post', 'validator-incentives', 'staking']
      },
      {
        id: 'q2-2-3',
        lessonId: '2-2',
        lessonSlug: 'post-poat-consensus',
        questionType: 'what-if',
        questionText: 'What would happen if DRP only used Proof of Stake without the Time component?',
        options: [
          'Network security would improve',
          'Short-term stakers could dominate, reducing long-term commitment',
          'Transaction speed would increase',
          'Energy consumption would rise'
        ],
        correctAnswer: 1,
        explanation: 'Without the Time component, validators could stake large amounts temporarily and then withdraw, reducing long-term network commitment. The Time component encourages sustained participation and network stability.',
        rewardDeRi: 8,
        difficulty: 3,
        tags: ['post', 'consensus-design', 'network-stability']
      },
      {
        id: 'q2-2-4',
        lessonId: '2-2',
        lessonSlug: 'post-poat-consensus',
        questionType: 'concept-matching',
        questionText: 'What is the primary purpose of PoAT (Proof of Activity) in DRP?',
        options: [
          'To validate blockchain transactions',
          'To verify and reward real-world activities that create value',
          'To select block validators',
          'To encrypt transaction data'
        ],
        correctAnswer: 1,
        explanation: 'PoAT verifies real-world activities (like content creation or consumption) and rewards contributors with $DeRi tokens. It bridges blockchain rewards with actual value creation in the physical world.',
        rewardDeRi: 8,
        difficulty: 2,
        tags: ['poat', 'activity-proofs', 'rewards']
      },
      {
        id: 'q2-2-5',
        lessonId: '2-2',
        lessonSlug: 'post-poat-consensus',
        questionType: 'multiple-choice',
        questionText: 'How does DRP\'s hybrid consensus (PoST + PoAT) differ from traditional consensus mechanisms?',
        options: [
          'It only uses Proof of Work',
          'It combines validator selection with real-world activity verification',
          'It doesn\'t require validators',
          'It uses centralized validation'
        ],
        correctAnswer: 1,
        explanation: 'DRP\'s hybrid approach combines PoST (for efficient block validation) with PoAT (for rewarding real-world value creation). This creates a system that is both efficient for consensus and connected to actual value generation.',
        rewardDeRi: 8,
        difficulty: 3,
        tags: ['hybrid-consensus', 'post', 'poat', 'innovation']
      }
    ]
  },
  {
    lessonId: '2-3',
    lessonSlug: 'elder-quorum-system',
    level: 2,
    questions: [
      {
        id: 'q2-3-1',
        lessonId: '2-3',
        lessonSlug: 'elder-quorum-system',
        questionType: 'multiple-choice',
        questionText: 'What is the Elder Quorum in DRP?',
        options: [
          'A group of validators',
          'A council of experienced network participants who make governance decisions',
          'A type of smart contract',
          'A consensus algorithm'
        ],
        correctAnswer: 1,
        explanation: 'The Elder Quorum is a governance mechanism consisting of experienced network participants who make important protocol decisions. Membership is based on stake, activity, and community contribution, with rotating membership to prevent centralization.',
        rewardDeRi: 8,
        difficulty: 2,
        tags: ['elder-quorum', 'governance']
      },
      {
        id: 'q2-3-2',
        lessonId: '2-3',
        lessonSlug: 'elder-quorum-system',
        questionType: 'scenario',
        questionText: 'A proposal to change DRP\'s royalty distribution formula needs approval. Which governance mechanism would handle this?',
        options: [
          'PoST validators',
          'Elder Quorum through proposal and voting process',
          'Individual node operators',
          'External regulators'
        ],
        correctAnswer: 1,
        explanation: 'The Elder Quorum handles governance decisions through a proposal and voting system. They review proposals, vote on changes, and execute approved modifications to the protocol.',
        rewardDeRi: 8,
        difficulty: 3,
        tags: ['governance', 'proposals', 'voting']
      },
      {
        id: 'q2-3-3',
        lessonId: '2-3',
        lessonSlug: 'elder-quorum-system',
        questionType: 'what-if',
        questionText: 'What would happen if Elder Quorum membership never rotated?',
        options: [
          'Governance would be more efficient',
          'Centralization risk would increase, potentially leading to abuse of power',
          'Decision-making would be faster',
          'Network security would improve'
        ],
        correctAnswer: 1,
        explanation: 'Without rotation, the same members would control governance indefinitely, creating centralization risks and potential abuse. Rotation ensures fresh perspectives and prevents power concentration.',
        rewardDeRi: 8,
        difficulty: 3,
        tags: ['governance', 'centralization', 'rotation']
      },
      {
        id: 'q2-3-4',
        lessonId: '2-3',
        lessonSlug: 'elder-quorum-system',
        questionType: 'concept-matching',
        questionText: 'What criteria determine Elder Quorum membership?',
        options: [
          'Only stake amount',
          'Stake amount, network activity, and community contribution',
          'Only network participation time',
          'Random selection'
        ],
        correctAnswer: 1,
        explanation: 'Elder Quorum membership is based on multiple factors: stake amount (economic commitment), network activity (participation), and community contribution (value added). This ensures qualified, committed members.',
        rewardDeRi: 8,
        difficulty: 2,
        tags: ['elder-quorum', 'membership-criteria']
      },
      {
        id: 'q2-3-5',
        lessonId: '2-3',
        lessonSlug: 'elder-quorum-system',
        questionType: 'multiple-choice',
        questionText: 'What is a key advantage of DRP\'s Elder Quorum governance model?',
        options: [
          'It requires no decision-making process',
          'It enables decentralized, community-driven protocol evolution',
          'It centralizes all decisions',
          'It eliminates the need for voting'
        ],
        correctAnswer: 1,
        explanation: 'The Elder Quorum enables decentralized governance where experienced community members make decisions through transparent proposal and voting processes, allowing the protocol to evolve based on community needs.',
        rewardDeRi: 8,
        difficulty: 2,
        tags: ['governance', 'decentralization', 'community-driven']
      }
    ]
  },
  {
    lessonId: '2-4',
    lessonSlug: 'activity-proofs',
    level: 2,
    questions: [
      {
        id: 'q2-4-1',
        lessonId: '2-4',
        lessonSlug: 'activity-proofs',
        questionType: 'multiple-choice',
        questionText: 'What is an Activity Proof in DRP?',
        options: [
          'A type of cryptocurrency',
          'Cryptographic evidence that real-world value-creating activities occurred',
          'A consensus mechanism',
          'A smart contract template'
        ],
        correctAnswer: 1,
        explanation: 'An Activity Proof is a cryptographically signed record that demonstrates a real-world activity occurred, who performed it, when it happened, and what value was created. It bridges blockchain rewards with actual value creation.',
        rewardDeRi: 8,
        difficulty: 2,
        tags: ['activity-proofs', 'poat']
      },
      {
        id: 'q2-4-2',
        lessonId: '2-4',
        lessonSlug: 'activity-proofs',
        questionType: 'scenario',
        questionText: 'An artist creates a digital song and wants to prove ownership and receive rewards. What should they generate?',
        options: [
          'A transaction hash',
          'A Content Creation Activity Proof',
          'A validator signature',
          'A block hash'
        ],
        correctAnswer: 1,
        explanation: 'A Content Creation Activity Proof cryptographically proves the artist created the content, when it was created, and links it to their identity. This enables them to register rights and receive rewards.',
        rewardDeRi: 8,
        difficulty: 3,
        tags: ['activity-proofs', 'content-creation', 'rights']
      },
      {
        id: 'q2-4-3',
        lessonId: '2-4',
        lessonSlug: 'activity-proofs',
        questionType: 'what-if',
        questionText: 'What would happen if Activity Proofs could be easily forged without cryptographic verification?',
        options: [
          'The system would be more efficient',
          'Fake activities would be rewarded, devaluing the token and undermining trust',
          'Transaction costs would decrease',
          'Network speed would increase'
        ],
        correctAnswer: 1,
        explanation: 'Without cryptographic verification, attackers could create fake activity proofs to claim rewards without actually contributing value. This would devalue the token, waste network resources, and destroy trust in the system.',
        rewardDeRi: 8,
        difficulty: 3,
        tags: ['activity-proofs', 'security', 'fraud-prevention']
      },
      {
        id: 'q2-4-4',
        lessonId: '2-4',
        lessonSlug: 'activity-proofs',
        questionType: 'concept-matching',
        questionText: 'What information does an Activity Proof contain?',
        options: [
          'Only the activity type',
          'Activity type, performer identity, timestamp, value created, and cryptographic signature',
          'Only the timestamp',
          'Only the performer identity'
        ],
        correctAnswer: 1,
        explanation: 'An Activity Proof contains comprehensive information: what activity occurred, who performed it, when it happened, what value was created, and a cryptographic signature for verification. This ensures complete and verifiable records.',
        rewardDeRi: 8,
        difficulty: 2,
        tags: ['activity-proofs', 'data-structure']
      },
      {
        id: 'q2-4-5',
        lessonId: '2-4',
        lessonSlug: 'activity-proofs',
        questionType: 'multiple-choice',
        questionText: 'How do Activity Proofs connect blockchain rewards to real-world value?',
        options: [
          'They don\'t - blockchain is separate from real-world value',
          'They cryptographically verify real activities, enabling fair reward distribution',
          'They only work for digital activities',
          'They require manual verification'
        ],
        correctAnswer: 1,
        explanation: 'Activity Proofs use cryptographic verification to prove real-world activities occurred, creating a trustless bridge between actual value creation and blockchain rewards. This ensures contributors are fairly compensated.',
        rewardDeRi: 8,
        difficulty: 2,
        tags: ['activity-proofs', 'value-creation', 'rewards']
      }
    ]
  }
]

