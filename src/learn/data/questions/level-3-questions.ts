/**
 * Level 3 Questions - Advanced Level
 * Unique questions for DRP development
 */

import { LessonQuestions } from './question-schema'

export const level3Questions: LessonQuestions[] = [
  {
    lessonId: '3-1',
    lessonSlug: 'drp-development-kit',
    level: 3,
    questions: [
      {
        id: 'q3-1-1',
        lessonId: '3-1',
        lessonSlug: 'drp-development-kit',
        questionType: 'multiple-choice',
        questionText: 'What is the primary purpose of DRP\'s Development Kit (SDK)?',
        options: [
          'To mine cryptocurrency',
          'To provide tools and libraries for building DRP applications',
          'To validate transactions',
          'To manage network consensus'
        ],
        correctAnswer: 1,
        explanation: 'The DRP Development Kit provides developers with tools, libraries, APIs, and documentation needed to build decentralized applications on the DRP platform, simplifying integration and development.',
        rewardDeRi: 12,
        difficulty: 3,
        tags: ['sdk', 'development', 'tools']
      },
      {
        id: 'q3-1-2',
        lessonId: '3-1',
        lessonSlug: 'drp-development-kit',
        questionType: 'scenario',
        questionText: 'A developer wants to integrate DRP rights management into their music streaming app. What should they use?',
        options: [
          'Only smart contracts directly',
          'DRP SDK which provides pre-built functions and APIs',
          'Manual blockchain interaction',
          'External third-party services'
        ],
        correctAnswer: 1,
        explanation: 'The DRP SDK provides pre-built functions, APIs, and abstractions that simplify integrating DRP functionality into applications, reducing development time and complexity compared to direct smart contract interaction.',
        rewardDeRi: 12,
        difficulty: 4,
        tags: ['sdk', 'integration', 'development']
      },
      {
        id: 'q3-1-3',
        lessonId: '3-1',
        lessonSlug: 'drp-development-kit',
        questionType: 'what-if',
        questionText: 'What would happen if developers had to interact with DRP smart contracts directly without an SDK?',
        options: [
          'Development would be faster',
          'Development complexity would increase significantly, requiring deep blockchain knowledge',
          'Applications would be more secure',
          'Transaction fees would decrease'
        ],
        correctAnswer: 1,
        explanation: 'Without an SDK, developers would need extensive blockchain knowledge, handle low-level contract interactions, manage errors manually, and write more boilerplate code, significantly increasing development complexity and time.',
        rewardDeRi: 12,
        difficulty: 4,
        tags: ['sdk', 'developer-experience', 'complexity']
      },
      {
        id: 'q3-1-4',
        lessonId: '3-1',
        lessonSlug: 'drp-development-kit',
        questionType: 'concept-matching',
        questionText: 'What components are typically included in DRP\'s Development Kit?',
        options: [
          'Only documentation',
          'Libraries, APIs, development tools, testing frameworks, and documentation',
          'Only smart contract code',
          'Only wallet software'
        ],
        correctAnswer: 1,
        explanation: 'A comprehensive SDK includes libraries for common operations, APIs for integration, development tools, testing frameworks, sample code, and thorough documentation to support developers throughout the development lifecycle.',
        rewardDeRi: 12,
        difficulty: 3,
        tags: ['sdk', 'components', 'developer-tools']
      },
      {
        id: 'q3-1-5',
        lessonId: '3-1',
        lessonSlug: 'drp-development-kit',
        questionType: 'multiple-choice',
        questionText: 'Why is the DRP SDK important for ecosystem growth?',
        options: [
          'It increases transaction fees',
          'It lowers the barrier to entry for developers, enabling more applications',
          'It restricts who can build on DRP',
          'It only works for experienced blockchain developers'
        ],
        correctAnswer: 1,
        explanation: 'By providing easy-to-use tools and abstractions, the SDK makes DRP accessible to a wider range of developers, not just blockchain experts. This accelerates ecosystem growth and innovation.',
        rewardDeRi: 12,
        difficulty: 3,
        tags: ['sdk', 'ecosystem', 'adoption']
      }
    ]
  },
  {
    lessonId: '3-2',
    lessonSlug: 'building-dapps',
    level: 3,
    questions: [
      {
        id: 'q3-2-1',
        lessonId: '3-2',
        lessonSlug: 'building-dapps',
        questionType: 'multiple-choice',
        questionText: 'What is a DApp (Decentralized Application)?',
        options: [
          'A traditional web application',
          'An application that runs on a blockchain network, using smart contracts and decentralized infrastructure',
          'A mobile app only',
          'A desktop application'
        ],
        correctAnswer: 1,
        explanation: 'A DApp is an application that leverages blockchain technology, using smart contracts for backend logic and decentralized infrastructure, providing benefits like transparency, immutability, and trustless execution.',
        rewardDeRi: 12,
        difficulty: 3,
        tags: ['dapps', 'blockchain-applications']
      },
      {
        id: 'q3-2-2',
        lessonId: '3-2',
        lessonSlug: 'building-dapps',
        questionType: 'scenario',
        questionText: 'A developer is building a DRP-based music platform. What architecture pattern should they use?',
        options: [
          'Fully centralized backend',
          'Hybrid: decentralized smart contracts for rights/royalties, traditional frontend for UX',
          'No backend at all',
          'Only blockchain, no frontend'
        ],
        correctAnswer: 1,
        explanation: 'Most DApps use a hybrid approach: smart contracts handle critical logic (rights, payments) on-chain, while traditional frontend/backend handle user experience, caching, and non-critical operations for better performance.',
        rewardDeRi: 12,
        difficulty: 4,
        tags: ['dapp-architecture', 'hybrid-design']
      },
      {
        id: 'q3-2-3',
        lessonId: '3-2',
        lessonSlug: 'building-dapps',
        questionType: 'what-if',
        questionText: 'What would happen if a DApp stored all data, including large media files, directly on-chain?',
        options: [
          'Performance would improve',
          'Transaction costs would be extremely high and the blockchain would become bloated',
          'Data would be more secure',
          'The app would load faster'
        ],
        correctAnswer: 1,
        explanation: 'Storing large files on-chain is prohibitively expensive and would bloat the blockchain. Best practice is to store only critical data (hashes, ownership) on-chain and large files off-chain (IPFS, cloud storage).',
        rewardDeRi: 12,
        difficulty: 4,
        tags: ['dapp-design', 'storage', 'cost-optimization']
      },
      {
        id: 'q3-2-4',
        lessonId: '3-2',
        lessonSlug: 'building-dapps',
        questionType: 'concept-matching',
        questionText: 'What is a key difference between traditional apps and DApps?',
        options: [
          'DApps are always faster',
          'DApps use smart contracts for backend logic, providing transparency and immutability',
          'DApps don\'t need user interfaces',
          'DApps only work offline'
        ],
        correctAnswer: 1,
        explanation: 'DApps use smart contracts (decentralized, immutable code) instead of traditional centralized servers. This provides transparency, immutability, and trustless execution, though it may trade off some performance.',
        rewardDeRi: 12,
        difficulty: 3,
        tags: ['dapps', 'smart-contracts', 'decentralization']
      },
      {
        id: 'q3-2-5',
        lessonId: '3-2',
        lessonSlug: 'building-dapps',
        questionType: 'multiple-choice',
        questionText: 'Why is user experience (UX) particularly important for DApps?',
        options: [
          'Blockchain interactions are complex, so good UX helps users understand and use DApps',
          'UX doesn\'t matter for DApps',
          'DApps are always easy to use',
          'Users don\'t interact with DApps'
        ],
        correctAnswer: 0,
        explanation: 'Blockchain interactions (wallets, transactions, gas fees) can be confusing for non-technical users. Good UX design, clear instructions, and helpful tooltips are essential to make DApps accessible and user-friendly.',
        rewardDeRi: 12,
        difficulty: 3,
        tags: ['dapps', 'ux', 'user-experience']
      }
    ]
  },
  {
    lessonId: '3-3',
    lessonSlug: 'contributing-to-drp',
    level: 3,
    questions: [
      {
        id: 'q3-3-1',
        lessonId: '3-3',
        lessonSlug: 'contributing-to-drp',
        questionType: 'multiple-choice',
        questionText: 'How can developers contribute to the DRP ecosystem?',
        options: [
          'Only by mining tokens',
          'By building DApps, improving documentation, reporting bugs, or contributing code',
          'Only by using DRP',
          'Only by investing money'
        ],
        correctAnswer: 1,
        explanation: 'Developers can contribute in many ways: building applications, improving documentation, reporting bugs, contributing code to open-source projects, creating tutorials, or participating in governance.',
        rewardDeRi: 12,
        difficulty: 3,
        tags: ['contributing', 'ecosystem', 'open-source']
      },
      {
        id: 'q3-3-2',
        lessonId: '3-3',
        lessonSlug: 'contributing-to-drp',
        questionType: 'scenario',
        questionText: 'A developer finds a bug in DRP\'s smart contract documentation. What should they do?',
        options: [
          'Ignore it',
          'Report it through official channels and optionally submit a fix',
          'Only tell friends',
          'Create a competing project'
        ],
        correctAnswer: 1,
        explanation: 'Contributors should report bugs through official channels (GitHub issues, forums) and can submit fixes via pull requests. This helps improve the ecosystem for everyone.',
        rewardDeRi: 12,
        difficulty: 3,
        tags: ['contributing', 'bug-reports', 'community']
      },
      {
        id: 'q3-3-3',
        lessonId: '3-3',
        lessonSlug: 'contributing-to-drp',
        questionType: 'what-if',
        questionText: 'What would happen if no one contributed to open-source DRP projects?',
        options: [
          'The ecosystem would grow faster',
          'Development would slow, bugs would persist, and innovation would stagnate',
          'The system would be more secure',
          'Transaction fees would decrease'
        ],
        correctAnswer: 1,
        explanation: 'Open-source projects rely on community contributions. Without them, development slows, bugs persist longer, features take longer to implement, and the ecosystem struggles to grow and innovate.',
        rewardDeRi: 12,
        difficulty: 3,
        tags: ['contributing', 'open-source', 'community']
      },
      {
        id: 'q3-3-4',
        lessonId: '3-3',
        lessonSlug: 'contributing-to-drp',
        questionType: 'concept-matching',
        questionText: 'What is a pull request in open-source contribution?',
        options: [
          'A request for payment',
          'A proposed code change submitted for review and integration',
          'A type of transaction',
          'A consensus mechanism'
        ],
        correctAnswer: 1,
        explanation: 'A pull request (PR) is a way to propose changes to a codebase. Contributors submit their code changes, which are reviewed by maintainers before being merged into the main project.',
        rewardDeRi: 12,
        difficulty: 3,
        tags: ['contributing', 'git', 'pull-requests']
      },
      {
        id: 'q3-3-5',
        lessonId: '3-3',
        lessonSlug: 'contributing-to-drp',
        questionType: 'multiple-choice',
        questionText: 'Why is community contribution important for DRP\'s success?',
        options: [
          'It increases centralization',
          'It enables faster development, diverse perspectives, and decentralized innovation',
          'It slows down development',
          'It only benefits contributors'
        ],
        correctAnswer: 1,
        explanation: 'Community contributions bring diverse perspectives, accelerate development, improve code quality through peer review, and ensure the protocol evolves to meet real-world needs, benefiting the entire ecosystem.',
        rewardDeRi: 12,
        difficulty: 3,
        tags: ['contributing', 'community', 'ecosystem']
      }
    ]
  },
  {
    lessonId: '3-4',
    lessonSlug: 'testing-and-deployment',
    level: 3,
    questions: [
      {
        id: 'q3-4-1',
        lessonId: '3-4',
        lessonSlug: 'testing-and-deployment',
        questionType: 'multiple-choice',
        questionText: 'Why is testing critical before deploying smart contracts?',
        options: [
          'Smart contracts are easy to fix after deployment',
          'Smart contracts are immutable once deployed, making bugs costly or impossible to fix',
          'Testing is optional',
          'Smart contracts don\'t need testing'
        ],
        correctAnswer: 1,
        explanation: 'Smart contracts are typically immutable once deployed. Bugs can lead to loss of funds, security vulnerabilities, or require expensive workarounds. Thorough testing is essential before deployment.',
        rewardDeRi: 12,
        difficulty: 3,
        tags: ['testing', 'smart-contracts', 'security']
      },
      {
        id: 'q3-4-2',
        lessonId: '3-4',
        lessonSlug: 'testing-and-deployment',
        questionType: 'scenario',
        questionText: 'A developer wants to test a DRP smart contract before mainnet deployment. What should they use?',
        options: [
          'Only mainnet',
          'Test networks (testnets) that simulate mainnet without real value',
          'No testing needed',
          'Only documentation'
        ],
        correctAnswer: 1,
        explanation: 'Testnets allow developers to deploy and test smart contracts in an environment that mirrors mainnet but uses valueless test tokens. This enables safe testing without risking real funds.',
        rewardDeRi: 12,
        difficulty: 4,
        tags: ['testing', 'testnets', 'deployment']
      },
      {
        id: 'q3-4-3',
        lessonId: '3-4',
        lessonSlug: 'testing-and-deployment',
        questionType: 'what-if',
        questionText: 'What would happen if a smart contract was deployed to mainnet without testing?',
        options: [
          'It would work perfectly',
          'Undiscovered bugs could cause loss of funds, security breaches, or contract failures',
          'Transaction fees would be lower',
          'The contract would be more secure'
        ],
        correctAnswer: 1,
        explanation: 'Without testing, bugs, security vulnerabilities, and logic errors remain undiscovered. These can lead to loss of funds, exploitation by attackers, or contract failures that cannot be easily fixed.',
        rewardDeRi: 12,
        difficulty: 4,
        tags: ['testing', 'security', 'risk-management']
      },
      {
        id: 'q3-4-4',
        lessonId: '3-4',
        lessonSlug: 'testing-and-deployment',
        questionType: 'concept-matching',
        questionText: 'What is a security audit in smart contract development?',
        options: [
          'A review of transaction history',
          'A comprehensive security review by experts to identify vulnerabilities',
          'A type of consensus mechanism',
          'A network upgrade'
        ],
        correctAnswer: 1,
        explanation: 'A security audit is a thorough review by security experts who analyze code for vulnerabilities, logic errors, and potential exploits. It\'s a critical step before deploying contracts handling significant value.',
        rewardDeRi: 12,
        difficulty: 3,
        tags: ['security', 'audits', 'smart-contracts']
      },
      {
        id: 'q3-4-5',
        lessonId: '3-4',
        lessonSlug: 'testing-and-deployment',
        questionType: 'multiple-choice',
        questionText: 'What is a best practice for DRP smart contract deployment?',
        options: [
          'Deploy immediately after writing code',
          'Test thoroughly, get security audits, deploy to testnet first, then mainnet',
          'Skip testing to save time',
          'Only test on mainnet'
        ],
        correctAnswer: 1,
        explanation: 'Best practice includes: comprehensive testing, security audits by experts, testnet deployment and validation, gradual mainnet rollout, and monitoring. This minimizes risks and ensures contract reliability.',
        rewardDeRi: 12,
        difficulty: 3,
        tags: ['deployment', 'best-practices', 'security']
      }
    ]
  }
]

