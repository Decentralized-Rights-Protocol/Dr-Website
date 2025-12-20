/**
 * Level 1 Questions - Foundation Level
 * Unique questions for blockchain fundamentals
 */

import { LessonQuestions } from './question-schema'

export const level1Questions: LessonQuestions[] = [
  {
    lessonId: '1-1',
    lessonSlug: 'what-is-blockchain',
    level: 1,
    questions: [
      {
        id: 'q1-1-1',
        lessonId: '1-1',
        lessonSlug: 'what-is-blockchain',
        questionType: 'multiple-choice',
        questionText: 'What makes blockchain data immutable?',
        options: [
          'Encryption of all data',
          'Linking blocks using cryptographic hashes',
          'Storing data on multiple servers',
          'Using passwords to protect blocks'
        ],
        correctAnswer: 1,
        explanation: 'Blocks are linked using cryptographic hashes of previous blocks. Each block contains the hash of the previous block, creating an unbreakable chain. If any block is altered, its hash changes, which breaks the link to the next block, making tampering immediately detectable.',
        rewardDeRi: 5,
        difficulty: 1,
        tags: ['immutability', 'hashing', 'blockchain-structure']
      },
      {
        id: 'q1-1-2',
        lessonId: '1-1',
        lessonSlug: 'what-is-blockchain',
        questionType: 'scenario',
        questionText: 'A company wants to track product authenticity from manufacturer to consumer. Which blockchain property is most critical for this use case?',
        options: [
          'Fast transaction speed',
          'Immutability and transparency',
          'Low transaction fees',
          'Anonymity of participants'
        ],
        correctAnswer: 1,
        explanation: 'Immutability ensures the product history cannot be altered, and transparency allows all parties to verify the authenticity. This makes blockchain ideal for supply chain tracking where trust and verifiability are essential.',
        rewardDeRi: 5,
        difficulty: 2,
        tags: ['use-cases', 'supply-chain', 'transparency']
      },
      {
        id: 'q1-1-3',
        lessonId: '1-1',
        lessonSlug: 'what-is-blockchain',
        questionType: 'what-if',
        questionText: 'What would happen if someone tried to modify a transaction in Block 5 of a blockchain?',
        options: [
          'Only Block 5 would be affected, other blocks remain unchanged',
          'The hash of Block 5 changes, breaking the chain link to Block 6',
          'All previous blocks would need to be recalculated',
          'Nothing would happen because blocks are independent'
        ],
        correctAnswer: 1,
        explanation: 'When Block 5 is modified, its hash changes. Since Block 6 contains the hash of Block 5 in its header, the link is broken. This makes tampering immediately detectable without needing to modify all subsequent blocks.',
        rewardDeRi: 5,
        difficulty: 2,
        tags: ['blockchain-security', 'hashing', 'tampering']
      },
      {
        id: 'q1-1-4',
        lessonId: '1-1',
        lessonSlug: 'what-is-blockchain',
        questionType: 'concept-matching',
        questionText: 'Which characteristic best describes blockchain\'s decentralized architecture?',
        options: [
          'A single server controls all transactions',
          'All nodes maintain copies and validate transactions independently',
          'Transactions are processed by a central authority',
          'Only selected nodes can participate in validation'
        ],
        correctAnswer: 1,
        explanation: 'In a decentralized blockchain, all participating nodes maintain a complete copy of the ledger and independently validate transactions. This eliminates single points of failure and removes the need for a central authority.',
        rewardDeRi: 5,
        difficulty: 1,
        tags: ['decentralization', 'network-architecture']
      },
      {
        id: 'q1-1-5',
        lessonId: '1-1',
        lessonSlug: 'what-is-blockchain',
        questionType: 'multiple-choice',
        questionText: 'What is the primary purpose of the "previous block hash" field in a block header?',
        options: [
          'To encrypt the block data',
          'To link blocks together and ensure chain integrity',
          'To store transaction fees',
          'To identify the block creator'
        ],
        correctAnswer: 1,
        explanation: 'The previous block hash creates the cryptographic link between blocks, forming the chain structure. This link ensures that any modification to a previous block would be detected, maintaining the integrity of the entire chain.',
        rewardDeRi: 5,
        difficulty: 1,
        tags: ['block-structure', 'chain-linking']
      }
    ]
  },
  {
    lessonId: '1-2',
    lessonSlug: 'cryptography-and-hashing',
    level: 1,
    questions: [
      {
        id: 'q1-2-1',
        lessonId: '1-2',
        lessonSlug: 'cryptography-and-hashing',
        questionType: 'multiple-choice',
        questionText: 'What is the avalanche effect in hash functions?',
        options: [
          'Hash functions produce the same output for similar inputs',
          'A small change in input produces a completely different hash output',
          'Hash functions are reversible',
          'Hash outputs are always shorter than inputs'
        ],
        correctAnswer: 1,
        explanation: 'The avalanche effect means that changing even a single bit in the input will produce a completely different hash output. This property ensures that similar inputs cannot be correlated by their hashes, providing strong security.',
        rewardDeRi: 5,
        difficulty: 1,
        tags: ['hashing', 'avalanche-effect', 'cryptography']
      },
      {
        id: 'q1-2-2',
        lessonId: '1-2',
        lessonSlug: 'cryptography-and-hashing',
        questionType: 'scenario',
        questionText: 'Alice wants to prove she created a document without revealing its contents. Which cryptographic technique should she use?',
        options: [
          'Symmetric encryption',
          'Hash function to create a digest',
          'Public key encryption',
          'Digital signature'
        ],
        correctAnswer: 3,
        explanation: 'Digital signatures allow Alice to prove ownership and authenticity without revealing the document content. She can sign the document hash with her private key, and anyone can verify it using her public key.',
        rewardDeRi: 5,
        difficulty: 2,
        tags: ['digital-signatures', 'privacy', 'authentication']
      },
      {
        id: 'q1-2-3',
        lessonId: '1-2',
        lessonSlug: 'cryptography-and-hashing',
        questionType: 'what-if',
        questionText: 'What would happen if hash functions were reversible (could be decrypted)?',
        options: [
          'Blockchain security would improve',
          'Blockchain immutability would be compromised',
          'Transaction speed would increase',
          'Network efficiency would improve'
        ],
        correctAnswer: 1,
        explanation: 'If hash functions were reversible, attackers could determine original inputs from hashes, breaking the one-way property. This would allow tampering with blockchain data, compromising immutability and security.',
        rewardDeRi: 5,
        difficulty: 2,
        tags: ['hash-security', 'one-way-functions']
      },
      {
        id: 'q1-2-4',
        lessonId: '1-2',
        lessonSlug: 'cryptography-and-hashing',
        questionType: 'concept-matching',
        questionText: 'Which property ensures that finding two different inputs with the same hash is computationally infeasible?',
        options: [
          'Deterministic property',
          'Collision resistance',
          'Avalanche effect',
          'One-way property'
        ],
        correctAnswer: 1,
        explanation: 'Collision resistance means it\'s extremely difficult to find two different inputs that produce the same hash output. This property is crucial for blockchain security, as it prevents attackers from creating fake transactions with the same hash as legitimate ones.',
        rewardDeRi: 5,
        difficulty: 2,
        tags: ['collision-resistance', 'hash-security']
      },
      {
        id: 'q1-2-5',
        lessonId: '1-2',
        lessonSlug: 'cryptography-and-hashing',
        questionType: 'multiple-choice',
        questionText: 'In blockchain, what is the Merkle root used for?',
        options: [
          'To encrypt transaction data',
          'To create a single hash representing all transactions in a block',
          'To identify the block creator',
          'To store the previous block hash'
        ],
        correctAnswer: 1,
        explanation: 'The Merkle root is a single hash that represents all transactions in a block. It\'s created by hashing pairs of transactions recursively until a single root hash remains. This allows efficient verification of whether a transaction is included in a block.',
        rewardDeRi: 5,
        difficulty: 2,
        tags: ['merkle-tree', 'block-structure']
      }
    ]
  },
  {
    lessonId: '1-3',
    lessonSlug: 'consensus-mechanisms',
    level: 1,
    questions: [
      {
        id: 'q1-3-1',
        lessonId: '1-3',
        lessonSlug: 'consensus-mechanisms',
        questionType: 'multiple-choice',
        questionText: 'What is the primary purpose of a consensus mechanism in blockchain?',
        options: [
          'To encrypt transactions',
          'To ensure all nodes agree on the state of the ledger',
          'To increase transaction speed',
          'To reduce storage requirements'
        ],
        correctAnswer: 1,
        explanation: 'Consensus mechanisms enable all nodes in a distributed network to agree on which transactions are valid and what the current state of the blockchain is, without requiring a central authority.',
        rewardDeRi: 5,
        difficulty: 1,
        tags: ['consensus', 'blockchain-fundamentals']
      },
      {
        id: 'q1-3-2',
        lessonId: '1-3',
        lessonSlug: 'consensus-mechanisms',
        questionType: 'scenario',
        questionText: 'A blockchain network needs to be energy-efficient while maintaining security. Which consensus mechanism would be most suitable?',
        options: [
          'Proof of Work (PoW)',
          'Proof of Stake (PoS)',
          'Proof of Authority (PoA)',
          'Delegated Proof of Stake (DPoS)'
        ],
        correctAnswer: 1,
        explanation: 'Proof of Stake is more energy-efficient than Proof of Work because it doesn\'t require intensive computational mining. Validators are chosen based on the amount of cryptocurrency they stake, making it both secure and energy-efficient.',
        rewardDeRi: 5,
        difficulty: 2,
        tags: ['proof-of-stake', 'energy-efficiency', 'consensus-comparison']
      },
      {
        id: 'q1-3-3',
        lessonId: '1-3',
        lessonSlug: 'consensus-mechanisms',
        questionType: 'what-if',
        questionText: 'What would happen if a blockchain network had no consensus mechanism?',
        options: [
          'Transactions would process faster',
          'Nodes would disagree on transaction validity, causing forks and inconsistencies',
          'The network would be more secure',
          'Storage requirements would decrease'
        ],
        correctAnswer: 1,
        explanation: 'Without consensus, different nodes would have different views of the blockchain state, leading to forks, double-spending, and an unreliable system. Consensus is essential for maintaining a single, agreed-upon version of the truth.',
        rewardDeRi: 5,
        difficulty: 2,
        tags: ['consensus-importance', 'network-integrity']
      },
      {
        id: 'q1-3-4',
        lessonId: '1-3',
        lessonSlug: 'consensus-mechanisms',
        questionType: 'concept-matching',
        questionText: 'In Proof of Work, what does "mining" refer to?',
        options: [
          'Storing blockchain data',
          'Solving cryptographic puzzles to validate transactions and create blocks',
          'Transferring cryptocurrency',
          'Encrypting transactions'
        ],
        correctAnswer: 1,
        explanation: 'Mining in Proof of Work involves solving computationally difficult cryptographic puzzles. The first miner to solve the puzzle gets to create the next block and receives a reward. This process secures the network but consumes significant energy.',
        rewardDeRi: 5,
        difficulty: 1,
        tags: ['proof-of-work', 'mining']
      },
      {
        id: 'q1-3-5',
        lessonId: '1-3',
        lessonSlug: 'consensus-mechanisms',
        questionType: 'multiple-choice',
        questionText: 'What is a "51% attack" in blockchain consensus?',
        options: [
          'When 51% of nodes go offline',
          'When a single entity controls more than 50% of the network\'s mining power or stake',
          'When 51% of transactions are invalid',
          'When the network processes 51% of its capacity'
        ],
        correctAnswer: 1,
        explanation: 'A 51% attack occurs when a single entity gains control of more than half the network\'s hashing power (PoW) or stake (PoS), allowing them to potentially reverse transactions, double-spend, or exclude certain transactions from blocks.',
        rewardDeRi: 5,
        difficulty: 2,
        tags: ['security', 'attacks', 'consensus-vulnerabilities']
      }
    ]
  },
  {
    lessonId: '1-4',
    lessonSlug: 'smart-contracts-101',
    level: 1,
    questions: [
      {
        id: 'q1-4-1',
        lessonId: '1-4',
        lessonSlug: 'smart-contracts-101',
        questionType: 'multiple-choice',
        questionText: 'What is a smart contract?',
        options: [
          'A legal document stored on blockchain',
          'Self-executing code that automatically enforces contract terms when conditions are met',
          'A type of cryptocurrency',
          'A consensus mechanism'
        ],
        correctAnswer: 1,
        explanation: 'Smart contracts are self-executing programs stored on blockchain that automatically execute when predefined conditions are met. They eliminate the need for intermediaries and ensure trustless execution of agreements.',
        rewardDeRi: 5,
        difficulty: 1,
        tags: ['smart-contracts', 'automation']
      },
      {
        id: 'q1-4-2',
        lessonId: '1-4',
        lessonSlug: 'smart-contracts-101',
        questionType: 'scenario',
        questionText: 'A company wants to automate royalty payments to artists when their music is streamed. Which blockchain feature would be most suitable?',
        options: [
          'Cryptocurrency transactions',
          'Smart contracts that trigger payments based on streaming data',
          'Consensus mechanisms',
          'Hash functions'
        ],
        correctAnswer: 1,
        explanation: 'Smart contracts can automatically execute payments when specific conditions (like streaming thresholds) are met. This eliminates manual processing and ensures timely, transparent royalty distribution.',
        rewardDeRi: 5,
        difficulty: 2,
        tags: ['smart-contracts', 'use-cases', 'automation']
      },
      {
        id: 'q1-4-3',
        lessonId: '1-4',
        lessonSlug: 'smart-contracts-101',
        questionType: 'what-if',
        questionText: 'What would happen if a smart contract had a bug that allowed unlimited token withdrawals?',
        options: [
          'The bug would be automatically fixed',
          'The contract would be paused by the network',
          'The bug would persist until the contract is upgraded or funds are drained',
          'Nodes would reject the contract'
        ],
        correctAnswer: 2,
        explanation: 'Smart contracts are immutable once deployed. If a bug exists, it cannot be easily fixed without upgrading the contract (if upgradeable) or deploying a new one. This is why thorough testing and auditing are critical before deployment.',
        rewardDeRi: 5,
        difficulty: 2,
        tags: ['smart-contract-security', 'immutability', 'bugs']
      },
      {
        id: 'q1-4-4',
        lessonId: '1-4',
        lessonSlug: 'smart-contracts-101',
        questionType: 'concept-matching',
        questionText: 'What does "gas" refer to in smart contract execution?',
        options: [
          'The fuel for blockchain nodes',
          'The fee paid to execute operations on the blockchain',
          'A type of cryptocurrency',
          'The consensus mechanism'
        ],
        correctAnswer: 1,
        explanation: 'Gas is the fee required to execute operations on blockchain networks like Ethereum. Each operation costs a certain amount of gas, which prevents spam and allocates network resources. Users pay gas fees in the native cryptocurrency.',
        rewardDeRi: 5,
        difficulty: 1,
        tags: ['gas', 'transaction-fees', 'ethereum']
      },
      {
        id: 'q1-4-5',
        lessonId: '1-4',
        lessonSlug: 'smart-contracts-101',
        questionType: 'multiple-choice',
        questionText: 'What is a key advantage of smart contracts over traditional contracts?',
        options: [
          'They are legally binding in all jurisdictions',
          'They automatically execute without intermediaries when conditions are met',
          'They are free to create',
          'They don\'t require code'
        ],
        correctAnswer: 1,
        explanation: 'Smart contracts automatically execute when conditions are met, eliminating the need for intermediaries like lawyers, escrow services, or payment processors. This reduces costs, speeds up execution, and ensures trustless enforcement.',
        rewardDeRi: 5,
        difficulty: 1,
        tags: ['smart-contract-advantages', 'automation', 'trustless']
      }
    ]
  }
]

