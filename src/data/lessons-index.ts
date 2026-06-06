import type { Lesson } from './lesson-types';
export type { Lesson, LessonSection } from './lesson-types';

export const LESSONS: Record<string, Lesson> = {

  // PATH 1: BLOCKCHAIN FOUNDATIONS
  'what-is-blockchain': {
    slug: 'what-is-blockchain', title: 'What is Blockchain?',
    subtitle: 'The foundational distributed ledger technology powering DRP and modern Web3',
    path: 1, pathName: 'Blockchain Foundations', pathIcon: 'Link',
    lessonNumber: 1, duration: '25 min', xp: 80, deri: 20, difficulty: 'Beginner',
    prerequisites: [], tags: ['Blockchain', 'Distributed Ledger', 'Fundamentals', 'Web3'],
    prevLesson: null, nextLesson: 'cryptography-and-hashing',
    keyTakeaways: ['A blockchain is an append-only distributed ledger secured by cryptography','Blocks chain together via hashes — changing one block invalidates all that follow','Decentralization removes single points of failure and censorship','DRP uses blockchain to store immutable proof of human rights and activity'],
    sections: [
      { type: 'intro', content: 'Imagine a Google Doc that thousands of computers maintain simultaneously — and once written, it can never be erased. That is the core idea of a blockchain: a shared, permanent record of truth that no single person or company controls.' },
      { type: 'concept', title: 'What is a Block?', content: 'A block is a container for data — like a page in a notebook. Every block holds: a batch of transactions or records, a timestamp, and a cryptographic fingerprint (hash) of the previous block. That fingerprint is what chains everything together.' },
      { type: 'diagram', title: 'How Blocks Chain Together', diagramType: 'flow', content: 'Each block references the previous block hash. Tamper with Block 2 and its hash changes — breaking every block that follows.', diagramData: { nodes: [{ id: 'g', label: 'Block #0\n(Genesis)', sublabel: 'Hash: 0x0000', color: '#00f2ff' },{ id: 'b1', label: 'Block #1', sublabel: 'Prev: 0x0000\nHash: 0xa1b2', color: '#0ea5e9' },{ id: 'b2', label: 'Block #2', sublabel: 'Prev: 0xa1b2\nHash: 0xc3d4', color: '#0ea5e9' },{ id: 'b3', label: 'Block #3', sublabel: 'Prev: 0xc3d4\nHash: 0xe5f6', color: '#10b981' }], edges: [{ from: 'g', to: 'b1', label: 'references' },{ from: 'b1', to: 'b2', label: 'references' },{ from: 'b2', to: 'b3', label: 'references' }] } },
      { type: 'concept', title: 'What Makes It Decentralized?', content: 'A blockchain runs on thousands of independent nodes simultaneously. Every node holds a full copy. To tamper with the chain, you would need to overpower 51% of all nodes at once — practically impossible for a large network. No single company or government controls it.' },
      { type: 'diagram', title: 'Centralized vs Decentralized', diagramType: 'comparison', content: 'A centralized system creates a single point of failure. A decentralized network distributes trust across thousands of nodes.', diagramData: { left: { title: 'Centralized (Traditional)', icon: '🏦', color: '#ef4444', points: ['Single server = single point of failure','Owner can modify or delete records','Downtime affects all users','Trust depends on the company'] }, right: { title: 'Decentralized (Blockchain)', icon: '🌐', color: '#10b981', points: ['Thousands of nodes worldwide','No single entity controls records','Network survives node failures','Trust is mathematical, not institutional'] } } },
      { type: 'callout', calloutType: 'drp', title: 'How DRP Uses This', content: 'DRP stores human rights verifications, activity proofs, and governance decisions on-chain. Because the blockchain is immutable, a proof of rights cannot be falsified by any government or corporation. Your rights become as permanent as the chain itself.' },
      { type: 'concept', title: 'Types of Blockchains', content: 'Public blockchains (Bitcoin, Ethereum) are open — anyone can read and participate. Private blockchains are controlled by organizations. DRP is designed as a public blockchain with governance controlled by verified participants — the Elder Quorum.' },
      { type: 'quiz', title: 'Check Your Understanding', content: 'If an attacker changes data inside Block #50, what happens to Block #51?', quizOptions: ['Nothing — blocks are independent',"Block #51's hash reference becomes invalid, breaking the chain",'Block #51 automatically updates to match','The network votes to accept the change'], quizAnswer: 1, quizExplanation: 'Block #51 stores the hash of Block #50. The moment Block #50 changes, its hash changes — making Block #51 wrong. This propagates forward, invalidating the entire chain. This is what makes blockchain tamper-evident.' },
      { type: 'callout', calloutType: 'info', title: 'Did You Know?', content: 'The first blockchain was introduced by Satoshi Nakamoto in 2008 as the backbone of Bitcoin. The concept has evolved far beyond currency — blockchains now power smart contracts, governance, identity verification, and human rights infrastructure like DRP.' },
    ],
  },

  'cryptography-and-hashing': {
    slug: 'cryptography-and-hashing', title: 'Cryptography & Hashing',
    subtitle: 'The mathematical security layer that makes blockchain trustless and tamper-proof',
    path: 1, pathName: 'Blockchain Foundations', pathIcon: 'Link',
    lessonNumber: 2, duration: '20 min', xp: 70, deri: 15, difficulty: 'Beginner',
    prerequisites: ['what-is-blockchain'], tags: ['Cryptography', 'Hashing', 'SHA-256', 'Public Key', 'Security'],
    prevLesson: 'what-is-blockchain', nextLesson: 'consensus-mechanisms',
    keyTakeaways: ['Hash functions convert any input into a fixed-length fingerprint — deterministic and one-way','SHA-256: changing one character flips ~50% of output bits (avalanche effect)','Public/private key pairs enable digital signatures without sharing secrets','DRP uses post-quantum CRYSTALS-Dilithium signatures — future-proof against quantum attacks'],
    sections: [
      { type: 'intro', content: 'Cryptography transforms a shared database into a system of mathematical trust. Two tools do the heavy lifting: hash functions and public-key cryptography. Once you understand these, DRP entire security model becomes clear.' },
      { type: 'concept', title: 'Hash Functions: Digital Fingerprints', content: 'A hash function takes any input and produces a fixed-length output. Three key properties: Deterministic (same input always gives same output), Avalanche Effect (change one character and ~50% of output bits flip), One-Way (you cannot reverse a hash to find the input).' },
      { type: 'diagram', title: 'The Avalanche Effect', diagramType: 'comparison', content: 'A tiny change in input produces a completely different hash — making all blockchain records tamper-evident.', diagramData: { left: { title: 'Input A', icon: '📄', color: '#0ea5e9', points: ['Input: "Hello DRP"','SHA-256 →','7f83b165...126d9069'] }, right: { title: 'Input B (1 char changed)', icon: '📄', color: '#ef4444', points: ['Input: "Hello DRp" (lowercase p)','SHA-256 →','3c5a9e2f...0b3d6 (completely different!)'] } } },
      { type: 'concept', title: 'Public-Key Cryptography', content: 'You have two keys: a public key (your address — share freely) and a private key (your secret — never share). When you sign a transaction with your private key, anyone with your public key can verify it is genuinely yours — without ever seeing your private key.' },
      { type: 'diagram', title: 'Digital Signature Flow', diagramType: 'flow', content: 'How private keys create proofs that public keys verify — the foundation of trustless transactions.', diagramData: { nodes: [{ id: 'tx', label: 'Transaction\nData', sublabel: '"Send 10 $DeRi"', color: '#00f2ff' },{ id: 'sign', label: 'Sign with\nPrivate Key', sublabel: '🔐 Secret', color: '#ef4444' },{ id: 'sig', label: 'Digital\nSignature', sublabel: '0x7f2a...', color: '#f59e0b' },{ id: 'verify', label: 'Verify with\nPublic Key', sublabel: '✅ Anyone can', color: '#10b981' }], edges: [{ from: 'tx', to: 'sign', label: 'input' },{ from: 'sign', to: 'sig', label: 'produces' },{ from: 'sig', to: 'verify', label: 'verified by' }] } },
      { type: 'callout', calloutType: 'drp', title: 'DRP Post-Quantum Security', content: 'Standard elliptic-curve cryptography will be breakable by quantum computers within 10-15 years. DRP uses CRYSTALS-Kyber for key encapsulation and CRYSTALS-Dilithium for signatures — both NIST-approved post-quantum algorithms. Your rights proofs stay secure in the quantum era.' },
      { type: 'quiz', title: 'Test Your Knowledge', content: 'Alice signs a transaction with her private key. Bob wants to verify it. What does Bob need?', quizOptions: ["Alice's private key","Alice's public key",'A password from Alice','Access to the blockchain database'], quizAnswer: 1, quizExplanation: 'Bob only needs the public key — which Alice can share openly. Anyone can confirm a signature using only the public key, while only the private key holder could have created it.' },
    ],
  },

  'consensus-mechanisms': {
    slug: 'consensus-mechanisms', title: 'Consensus Mechanisms',
    subtitle: 'How thousands of independent nodes agree on a single version of truth',
    path: 1, pathName: 'Blockchain Foundations', pathIcon: 'Link',
    lessonNumber: 3, duration: '25 min', xp: 80, deri: 20, difficulty: 'Beginner',
    prerequisites: ['what-is-blockchain'], tags: ['Consensus','PoW','PoS','PoAT','PoST'],
    prevLesson: 'cryptography-and-hashing', nextLesson: 'smart-contracts-101',
    keyTakeaways: ['Consensus lets decentralized networks agree without a central authority','PoW wastes energy; PoS uses economic stake; DRP uses human activity','PoAT rewards real-world contribution over capital accumulation','Elder Quorum adds human-layer governance on top of algorithmic consensus'],
    sections: [
      { type: 'intro', content: 'If thousands of computers hold a copy of the blockchain, how do they agree on which blocks are valid? This is the consensus problem — solving it makes blockchain possible. DRP invents its own mechanism designed around human activity.' },
      { type: 'concept', title: 'Proof of Work (PoW)', content: "Bitcoin approach: make block creation computationally expensive. Miners race to solve a puzzle. The winner adds the block and earns a reward. Attacking requires 51% of global computing power — secure, but burns massive electricity." },
      { type: 'concept', title: 'Proof of Stake (PoS)', content: "Ethereum approach: validators stake (lock up) crypto as collateral. Chosen proportionally to stake. Far more energy-efficient — Ethereum energy use dropped 99.95% after switching. DRP builds on this but adds a human dimension." },
      { type: 'diagram', title: 'Consensus Mechanisms Compared', diagramType: 'comparison', content: 'PoW, PoS, and DRP compared on key metrics.', diagramData: { columns: ['Mechanism','Security Model','Energy','Human Factor','DRP Use'], rows: [['Pickaxe PoW','Computational cost','🔴 Very High','❌ None','Not used'],['Gem PoS','Economic stake','🟢 Low','❌ None','Base layer'],['Activity PoAT','Real-world activity','🟢 Low','✅ Core','Primary'],['IdCard PoST','Verified identity','🟢 Low','✅ Core','Primary']] } },
      { type: 'callout', calloutType: 'drp', title: 'DRP Innovation: Proof of Activity (PoAT)', content: 'DRP asks you to prove real human activity — farming, teaching, healthcare, civic participation. Verified by AI scoring and peer witnesses. The more you contribute to society, the more governance weight you earn.' },
      { type: 'quiz', title: 'Quick Check', content: 'Why did Ethereum switch from Proof of Work to Proof of Stake?', quizOptions: ['PoS is faster','PoS reduced energy consumption by ~99.95% while maintaining security','PoS allows more validators','PoW was banned'], quizAnswer: 1, quizExplanation: 'The Ethereum Merge in September 2022 cut energy usage by ~99.95%. Environmental sustainability was the primary driver.' },
    ],
  },

  'smart-contracts-101': {
    slug: 'smart-contracts-101', title: 'Smart Contracts 101',
    subtitle: 'Self-executing code that runs on-chain without intermediaries',
    path: 1, pathName: 'Blockchain Foundations', pathIcon: 'Link',
    lessonNumber: 4, duration: '30 min', xp: 90, deri: 25, difficulty: 'Beginner',
    prerequisites: ['what-is-blockchain','cryptography-and-hashing'], tags: ['Smart Contracts','Solidity','DApps','Automation'],
    prevLesson: 'consensus-mechanisms', nextLesson: 'drp-architecture',
    keyTakeaways: ['Smart contracts execute automatically when conditions are met','They eliminate intermediaries — no lawyers, banks, or escrow needed','Once deployed, contract code is immutable and transparent','DRP uses smart contracts for rights issuance, token rewards, and governance voting'],
    sections: [
      { type: 'intro', content: 'A smart contract lives on the blockchain and runs automatically when conditions are triggered — no human intermediary required. Think of it as a vending machine: insert the right input, get the guaranteed output.' },
      { type: 'concept', title: 'How Smart Contracts Work', content: 'A developer writes contract code, deploys it to the blockchain, and it gets a permanent address. Anyone can call functions by sending transactions. The contract executes exactly as coded — no one can change it after deployment. All execution is on-chain and visible to everyone.' },
      { type: 'code', title: 'Rights Registry Contract', content: 'A minimal Solidity contract that registers rights proofs on-chain — the core logic DRP uses:', language: 'solidity', code: '// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract RightsRegistry {\n    mapping(address => bytes32) public rightsProofs;\n    event RightsVerified(address indexed citizen, bytes32 proofHash, uint256 timestamp);\n\n    function registerProof(address citizen, bytes32 proofHash) external onlyVerifier {\n        rightsProofs[citizen] = proofHash;\n        emit RightsVerified(citizen, proofHash, block.timestamp);\n    }\n\n    function verifyRights(address citizen) external view returns (bytes32) {\n        return rightsProofs[citizen];\n    }\n}' },
      { type: 'callout', calloutType: 'drp', title: 'DRP Smart Contracts', content: 'DRP uses smart contracts for: Rights Issuance (on-chain credentials), Token Distribution (auto-distributing $DeRi on lesson completion), Elder Voting (proposals execute automatically at quorum), and Activity Proof Registration (recording PoAT/PoST proofs permanently).' },
      { type: 'quiz', title: 'Smart Contract Quiz', content: 'What happens to a smart contract after it is deployed to the blockchain?', quizOptions: ['The developer can update it anytime','It becomes immutable — the code cannot be changed','It expires after 1 year','Only admins can modify it'], quizAnswer: 1, quizExplanation: 'Once deployed, smart contract code is permanently stored on-chain and cannot be changed. This is both a feature (trustless, auditable) and a challenge (bugs are permanent). Thorough auditing before deployment is critical.' },
    ],
  },

  // PATH 2: DRP CORE PROTOCOL
  'drp-architecture': {
    slug: 'drp-architecture', title: 'DRP Architecture',
    subtitle: 'The layered system design that powers the Decentralized Rights Protocol',
    path: 2, pathName: 'DRP Core Protocol', pathIcon: 'Zap',
    lessonNumber: 1, duration: '25 min', xp: 80, deri: 20, difficulty: 'Intermediate',
    prerequisites: ['smart-contracts-101'], tags: ['Architecture','Cosmos SDK','OrbitDB','Layers'],
    prevLesson: 'smart-contracts-101', nextLesson: 'activity-proofs',
    keyTakeaways: ['DRP has 4 layers: Network, Consensus, Application, and Interface','Built on Cosmos SDK for modular, interoperable blockchain infrastructure','OrbitDB provides decentralized off-chain storage for large proof data','Post-quantum cryptography is baked into every layer from the start'],
    sections: [
      { type: 'intro', content: 'DRP is not a single piece of software — it is a layered system where each layer has a specific responsibility. Understanding the architecture helps you see how proof submission, consensus, storage, and governance all interact.' },
      { type: 'diagram', title: 'DRP System Architecture', diagramType: 'stack', content: 'Four distinct layers, each building on the one below — from raw network communication up to end-user interfaces.', diagramData: { layers: [{ name: 'Interface Layer', color: '#00f2ff', icon: 'Monitor', items: ['Web App','Mobile App','Developer APIs','Discord Bot'], description: 'User-facing entry points' },{ name: 'Application Layer', color: '#0ea5e9', icon: 'Settings', items: ['Smart Contracts','AI Scoring Engine','Rights Registry','Token Distribution'], description: 'Business logic and DRP protocols' },{ name: 'Consensus Layer', color: '#10b981', icon: 'Handshake', items: ['PoAT Engine','PoST Engine','Elder Quorum','Validator Network'], description: 'Agreement on valid state' },{ name: 'Network Layer', color: '#f59e0b', icon: '🌐', items: ['Cosmos SDK','P2P Networking','OrbitDB','IPFS Storage'], description: 'Raw communication and data' }] } },
      { type: 'concept', title: 'Why Cosmos SDK?', content: 'DRP is built on the Cosmos SDK — the same framework powering Cosmos Hub, Osmosis, and dozens of other chains. Cosmos gives DRP: modular architecture, native cross-chain communication via IBC, production-proven security, and a Tendermint BFT consensus base that DRP extends with PoAT/PoST.' },
      { type: 'concept', title: 'OrbitDB: Decentralized Storage', content: 'On-chain storage is expensive. Large proof documents and evidence live in OrbitDB — a peer-to-peer database built on IPFS. Data is content-addressed (identified by its hash). The on-chain layer stores only cryptographic commitments to this off-chain data.' },
      { type: 'callout', calloutType: 'drp', title: 'The AI Scoring Engine', content: 'Sitting within the Application Layer, the AI scoring engine evaluates submitted activity proofs — checking for fraud patterns and assigning trust scores that influence consensus weight. This is the Governance by Contribution model in action.' },
      { type: 'quiz', title: 'Architecture Check', content: 'Where does the AI Scoring Engine sit in DRP architecture?', quizOptions: ['Network Layer','Consensus Layer','Application Layer','Interface Layer'], quizAnswer: 2, quizExplanation: 'The AI Scoring Engine is Application Layer — it is higher-level business logic that processes submitted proofs before they reach the consensus mechanism.' },
    ],
  },

  'activity-proofs': {
    slug: 'activity-proofs', title: 'Activity Proofs (PoAT)',
    subtitle: 'Proof of Activity — how DRP verifies real human contribution',
    path: 2, pathName: 'DRP Core Protocol', pathIcon: 'Zap',
    lessonNumber: 2, duration: '35 min', xp: 100, deri: 30, difficulty: 'Intermediate',
    prerequisites: ['drp-architecture'], tags: ['PoAT','Activity','Verification','Governance'],
    prevLesson: 'drp-architecture', nextLesson: 'post-poat-consensus',
    keyTakeaways: ['PoAT rewards real-world contribution over capital accumulation','Activities verified by AI scoring + peer witness attestation','Activity types: farming, education, healthcare, civic, tech, environmental','PoAT weight directly influences governance voting power in the Elder Quorum'],
    sections: [
      { type: 'intro', content: 'What if the weight of your vote depended not on how much money you had, but on what you have actually done for society? That is the core idea of Proof of Activity (PoAT) — DRP most innovative mechanism, directly serving the mission of human rights infrastructure.' },
      { type: 'concept', title: 'What Counts as Activity?', content: 'DRP recognizes activity across six categories: Agricultural (farming, food production), Educational (teaching, mentoring), Healthcare (medical work, caregiving), Civic (voting, community organization), Technological (open source, infrastructure), and Environmental (conservation, clean energy).' },
      { type: 'diagram', title: 'PoAT Proof Submission Flow', diagramType: 'flow', content: 'How an activity proof goes from real-world action to on-chain verification.', diagramData: { nodes: [{ id: 'a', label: 'Real-World\nActivity', sublabel: 'e.g. Taught 30 students', color: '#00f2ff' },{ id: 'b', label: 'Submit\nProof', sublabel: 'Evidence + metadata', color: '#0ea5e9' },{ id: 'c', label: 'AI Scoring\nEngine', sublabel: 'Fraud detection\nTrust scoring', color: '#f59e0b' },{ id: 'd', label: 'Peer Witness\nAttestation', sublabel: '3+ community witnesses', color: '#10b981' },{ id: 'e', label: 'On-Chain\nRecord', sublabel: 'Immutable PoAT\n+XP +$DeRi', color: '#10b981' }], edges: [{ from: 'a', to: 'b', label: 'document' },{ from: 'b', to: 'c', label: 'auto-evaluate' },{ from: 'c', to: 'd', label: 'if score > threshold' },{ from: 'd', to: 'e', label: 'finalize' }] } },
      { type: 'callout', calloutType: 'drp', title: 'PoAT and Governance Power', content: 'Every verified PoAT proof contributes to your Activity Score. Your Activity Score determines your weight in Elder Quorum votes — the governance body that decides DRP upgrades, fund allocation, and rights dispute resolution.' },
      { type: 'quiz', title: 'PoAT Check', content: 'A farmer submits a PoAT proof. The AI scores it highly but only 2 of the required 3 peer witnesses attest. What happens?', quizOptions: ['Accepted — AI score was high enough','Rejected permanently','Held in pending state until a 3rd witness attests','The farmer loses governance rights'], quizAnswer: 2, quizExplanation: 'PoAT requires BOTH AI verification AND minimum peer attestation. A high AI score does not override the social proof requirement. The proof enters pending — the farmer can seek a third witness.' },
    ],
  },

  'post-poat-consensus': {
    slug: 'post-poat-consensus', title: 'Status Proofs (PoST)',
    subtitle: 'Proof of Status — verified identity and social standing on DRP',
    path: 2, pathName: 'DRP Core Protocol', pathIcon: 'Zap',
    lessonNumber: 3, duration: '25 min', xp: 80, deri: 20, difficulty: 'Intermediate',
    prerequisites: ['activity-proofs'], tags: ['PoST','Identity','Status','ZKP','Privacy'],
    prevLesson: 'activity-proofs', nextLesson: 'elder-quorum-system',
    keyTakeaways: ['PoST = Proof of Status — verified identity, role, and credentials','Status proofs are privacy-preserving using zero-knowledge proofs','Status types include citizenship, professional credentials, community roles','PoST + PoAT together form a complete human rights profile on DRP'],
    sections: [
      { type: 'intro', content: 'While PoAT tracks what you do, PoST tracks who you are — your verified status, roles, and credentials. Together they build a complete, privacy-preserving identity layer that gives DRP context to make fair governance and rights decisions.' },
      { type: 'concept', title: 'What is a Status Proof?', content: 'A status proof verifies a real-world credential without revealing all underlying data. Examples: Citizenship proof (you are a citizen — without exposing your ID number), Professional credential (you are a licensed doctor — without exposing your license number), Age bracket (you are over 18 — without revealing your exact birthdate).' },
      { type: 'callout', calloutType: 'drp', title: 'Zero-Knowledge Privacy', content: 'DRP uses zero-knowledge proofs (ZKPs) to let you prove status claims without revealing underlying data. You can prove "I am a verified healthcare worker" to a smart contract without publishing your credentials. This is a mathematical guarantee, not just a policy promise.' },
      { type: 'quiz', title: 'Status Proof Quiz', content: 'Using zero-knowledge proofs, what can a DRP user prove to the network?', quizOptions: ['Nothing — ZKPs are too complex','Everything — all data becomes public','Claims about themselves without revealing the underlying private data','Only their wallet balance'], quizAnswer: 2, quizExplanation: 'ZKPs allow proving statements like "I am over 18" or "I have a medical license" with mathematical certainty — without exposing the actual data. This enables privacy-preserving identity verification fundamental to DRP human rights mission.' },
    ],
  },

  'elder-quorum-system': {
    slug: 'elder-quorum-system', title: 'Elder Quorum System',
    subtitle: 'DRP governance layer — decentralized decision-making by verified contributors',
    path: 2, pathName: 'DRP Core Protocol', pathIcon: 'Zap',
    lessonNumber: 4, duration: '30 min', xp: 90, deri: 25, difficulty: 'Intermediate',
    prerequisites: ['post-poat-consensus'], tags: ['Governance','Elder Quorum','Voting','DAO'],
    prevLesson: 'post-poat-consensus', nextLesson: 'drp-development-kit',
    keyTakeaways: ['The Elder Quorum is composed of top PoAT/PoST contributors — not token holders','Voting power is based on verified human contribution','All governance decisions are transparent, on-chain, and auditable','Elder status is earned and can be revoked by community vote'],
    sections: [
      { type: 'intro', content: 'Most blockchain governance is controlled by those with the most tokens — the wealthy have the most say. DRP flips this. The Elder Quorum is DRP governing body, and membership is earned through verified real-world contribution, not capital.' },
      { type: 'concept', title: 'How Elders are Elected', content: 'To become an Elder: accumulate a minimum Activity Score through verified PoAT proofs, maintain a PoST profile in good standing, receive nomination from community members, pass a community vote with 66% approval. Elder status is held for 12-month terms and must be renewed through continued contribution.' },
      { type: 'callout', calloutType: 'drp', title: 'Project Lazarus: AI Elders', content: 'DRP introduces AI Elders — AI agents granted limited governance participation by the human Elder Quorum. They scan blockchains for lost/abandoned assets (Project Lazarus), identify systemic rights violations, and flag issues for human Elder review. AI Elders can propose, but cannot vote.' },
      { type: 'quiz', title: 'Elder Quorum Quiz', content: 'What is the primary basis for voting power in the DRP Elder Quorum?', quizOptions: ['Amount of $RIGHTS tokens held','Verified real-world human contribution (PoAT/PoST scores)','Longest time as a DRP user','Amount of $DeRi staked'], quizAnswer: 1, quizExplanation: 'DRP governance explicitly decouples power from capital. Voting weight comes from verified PoAT and PoST scores — real contribution to human welfare. This prevents wealthy actors from controlling a protocol designed to protect human rights.' },
    ],
  },

  // PATH 3: BUILDING ON DRP
  'drp-development-kit': {
    slug: 'drp-development-kit', title: 'DRP Development Kit',
    subtitle: 'Tools, SDKs, and APIs to start building on DRP today',
    path: 3, pathName: 'Building on DRP', pathIcon: 'Hammer',
    lessonNumber: 1, duration: '30 min', xp: 90, deri: 25, difficulty: 'Intermediate',
    prerequisites: ['elder-quorum-system'], tags: ['SDK','API','Development','JavaScript','Python'],
    prevLesson: 'elder-quorum-system', nextLesson: 'building-dapps',
    keyTakeaways: ['DRP SDK available for JavaScript/TypeScript and Python','REST API supports proof submission, querying, and token operations','Local testnet available via Docker for development','DRP CLI tool for proof management and contract interaction'],
    sections: [
      { type: 'intro', content: 'Ready to build? DRP provides a full developer toolkit — SDK, REST API, CLI tool, and local testnet. Whether you are building a rights verification dApp or integrating PoAT into your platform, this is your starting point.' },
      { type: 'code', title: 'Installing the DRP SDK', content: 'Get started with the DRP JavaScript/TypeScript SDK:', language: 'bash', code: '# Install via npm\nnpm install @drp/sdk\n\n# Or yarn\nyarn add @drp/sdk\n\n# Python SDK\npip install drp-sdk' },
      { type: 'code', title: 'Connecting to DRP Testnet', content: 'Initialize the DRP client and connect to the testnet:', language: 'typescript', code: "import { DRPClient } from '@drp/sdk';\n\nconst client = new DRPClient({\n  network: 'testnet',\n  endpoint: 'https://api-testnet.decentralizedrights.com',\n  signer: wallet.getSigner(),\n});\n\nconst profile = await client.rights.getProfile(address);\nconsole.log('Activity Score:', profile.activityScore);\n\nconst proof = await client.proofs.submitActivity({\n  type: 'educational',\n  evidence: { description: 'Taught blockchain basics to 30 students', duration: 90, location: 'Accra, Ghana' },\n  witnesses: [witness1.address, witness2.address, witness3.address],\n});" },
      { type: 'callout', calloutType: 'info', title: 'Local Development', content: 'Run a full DRP node locally: docker run -p 26657:26657 drp/node:testnet. Full blockchain environment for testing — no real tokens, no real consequences, full DRP functionality.' },
      { type: 'quiz', title: 'Dev Kit Check', content: 'You want to test a new PoAT submission feature before deploying. Which environment should you use?', quizOptions: ['DRP Mainnet — most realistic','DRP Testnet or local node — no real assets at risk','Ethereum mainnet','Skip testing and deploy directly'], quizAnswer: 1, quizExplanation: 'Always develop and test on testnet or local nodes. Mainnet transactions are permanent and use real tokens. Testnet mirrors mainnet behavior without financial risk.' },
    ],
  },

  'building-dapps': {
    slug: 'building-dapps', title: 'Building dApps on DRP',
    subtitle: 'Build decentralized applications that leverage DRP rights infrastructure',
    path: 3, pathName: 'Building on DRP', pathIcon: 'Hammer',
    lessonNumber: 2, duration: '40 min', xp: 110, deri: 35, difficulty: 'Intermediate',
    prerequisites: ['drp-development-kit'], tags: ['dApp','React','Web3','Integration'],
    prevLesson: 'drp-development-kit', nextLesson: 'contributing-to-drp',
    keyTakeaways: ['dApps connect to DRP via SDK and wallet extensions','Rights-gating: restrict features to users with verified proofs','Activity rewards: auto-distribute $DeRi for verified in-app actions','DRP ID can serve as universal login replacing traditional auth'],
    sections: [
      { type: 'intro', content: 'A dApp is a frontend that connects to blockchain backends instead of traditional servers. Building on DRP means your app inherits its rights infrastructure — user verification, activity rewards, and governance participation come out of the box.' },
      { type: 'code', title: 'Rights-Gated Content Example', content: 'Restrict a feature to users with a verified healthcare worker status proof:', language: 'typescript', code: "import { useDRP } from '@drp/react';\n\nfunction HealthcarePortal() {\n  const { profile, isConnected } = useDRP();\n  const hasHealthcareStatus = profile?.statusProofs\n    .some(p => p.type === 'healthcare' && p.verified);\n\n  if (!isConnected) return <ConnectWalletButton />;\n  if (!hasHealthcareStatus) {\n    return (\n      <div>\n        <p>This portal requires verified healthcare credentials.</p>\n        <a href=\"/verify/healthcare\">Get Verified →</a>\n      </div>\n    );\n  }\n  return <HealthcareDashboard profile={profile} />;\n}" },
      { type: 'callout', calloutType: 'drp', title: 'DRP ID: Universal Web3 Login', content: 'DRP ID can replace email/password auth across any participating dApp. A user connects their DRP wallet and their verified profile — PoAT scores, status proofs, Elder tier — is available instantly. No new signup required.' },
      { type: 'quiz', title: 'dApp Quiz', content: 'What is rights-gating in DRP dApps?', quizOptions: ['Charging users a fee to access features','Restricting app features based on verified DRP proof credentials','Blocking users from certain countries','Requiring $RIGHTS tokens'], quizAnswer: 1, quizExplanation: 'Rights-gating uses verified DRP proof status as an access condition. A healthcare platform can gate features to verified doctors. An education portal can gate advanced content to verified teachers.' },
    ],
  },

  'contributing-to-drp': {
    slug: 'contributing-to-drp', title: 'Contributing to DRP',
    subtitle: 'How to become a core contributor to the DRP open-source ecosystem',
    path: 3, pathName: 'Building on DRP', pathIcon: 'Hammer',
    lessonNumber: 3, duration: '25 min', xp: 80, deri: 20, difficulty: 'Intermediate',
    prerequisites: ['building-dapps'], tags: ['Open Source','Contributing','GitHub','Community'],
    prevLesson: 'building-dapps', nextLesson: 'testing-and-deployment',
    keyTakeaways: ['DRP is fully open source — all core code lives in the GitHub org','Contributions earn PoAT proofs — real governance weight from code contribution','Bug bounties reward security researchers with $DeRi','Governance proposals can change the protocol — any Elder can submit one'],
    sections: [
      { type: 'intro', content: 'DRP is open source and community-governed. Every code contribution shapes the protocol. Because DRP recognizes technological contribution as a valid PoAT category, contributing earns you governance weight — your code commits literally give you a voice in how DRP evolves.' },
      { type: 'concept', title: 'How to Contribute', content: 'Start with the GitHub org (github.com/Decentralized-Rights-Protocol). Pick up a good first issue, fork the repo, make your changes, submit a PR. Merged PRs earn contributor PoAT proofs. For larger changes, submit a DRP Improvement Proposal (DRIP) to the Elder Quorum.' },
      { type: 'callout', calloutType: 'drp', title: 'Tech PoAT: Your Code = Your Voice', content: 'Verified open source contributions to DRP earn Technology PoAT proofs. These accumulate into your Activity Score. A developer with 200 merged PRs has more governance weight than someone who just holds tokens. The people building DRP govern DRP.' },
      { type: 'quiz', title: 'Contribution Check', content: 'You want to submit a large architectural change to DRP. It is too big for a regular PR. What should you do?', quizOptions: ['Post it on Twitter','Force push to main branch','Submit a DRIP (DRP Improvement Proposal) to the Elder Quorum for governance review','Email the founder'], quizAnswer: 2, quizExplanation: 'Large protocol changes require a DRIP — DRP Improvement Proposal. The governance process ensures major changes have community buy-in and decentralized approval.' },
    ],
  },

  'testing-and-deployment': {
    slug: 'testing-and-deployment', title: 'Testing & Deployment',
    subtitle: 'Smart contract auditing, testnet deployment, and production launch on DRP',
    path: 3, pathName: 'Building on DRP', pathIcon: 'Hammer',
    lessonNumber: 4, duration: '35 min', xp: 100, deri: 30, difficulty: 'Intermediate',
    prerequisites: ['contributing-to-drp'], tags: ['Testing','Deployment','Auditing','Security'],
    prevLesson: 'contributing-to-drp', nextLesson: 'identity-access-management',
    keyTakeaways: ['Smart contract bugs are permanent — thorough testing is non-negotiable','Use Hardhat or Foundry for contract testing with DRP testing suite','Deploy to DRP testnet first, get a community audit, then mainnet','DRP has a bug bounty program — responsible disclosure earns $DeRi'],
    sections: [
      { type: 'intro', content: 'In traditional software, bugs can be patched. In blockchain, a deployed contract is permanent. A bug in a rights registry contract could lock people out of their verified proofs forever. Thorough testing is a moral responsibility.' },
      { type: 'code', title: 'Testing a DRP Contract with Hardhat', content: 'Example test for a rights proof contract:', language: 'typescript', code: "import { expect } from 'chai';\nimport { ethers } from 'hardhat';\n\ndescribe('RightsRegistry', () => {\n  it('registers a valid proof', async () => {\n    const [verifier, citizen] = await ethers.getSigners();\n    const Registry = await ethers.getContractFactory('RightsRegistry');\n    const registry = await Registry.deploy();\n\n    const proofHash = ethers.keccak256(ethers.toUtf8Bytes('proof_data'));\n    await registry.connect(verifier).registerProof(citizen.address, proofHash);\n\n    const stored = await registry.verifyRights(citizen.address);\n    expect(stored).to.equal(proofHash);\n  });\n\n  it('rejects registration from non-verifier', async () => {\n    await expect(\n      registry.connect(citizen).registerProof(citizen.address, proofHash)\n    ).to.be.revertedWith('AccessControl: missing role');\n  });\n});" },
      { type: 'callout', calloutType: 'warning', title: 'Always Audit Before Mainnet', content: 'DRP requires a community audit period before any contract touches mainnet. Deploy to testnet, submit for audit in #audits Discord, wait 30 days minimum, address all critical findings, then request Elder Quorum approval for mainnet deployment.' },
      { type: 'quiz', title: 'Deployment Quiz', content: 'Why is thorough testing especially critical for blockchain smart contracts vs regular web apps?', quizOptions: ['Blockchain testing tools are harder to use','Smart contracts are immutable once deployed — bugs cannot be patched after launch','Blockchain users are more technical','DRP has stricter regulations'], quizAnswer: 1, quizExplanation: 'A web app can be hotfixed in minutes. A smart contract bug affecting rights proofs could permanently corrupt records. The only mitigation is preventing the bug from deploying in the first place.' },
    ],
  },

  // PATH 4: REAL-WORLD APPLICATIONS
  'identity-access-management': {
    slug: 'identity-access-management', title: 'Identity & Access Management',
    subtitle: 'DRP as the identity layer for fair, verifiable access control',
    path: 4, pathName: 'Real-World Applications', pathIcon: 'Globe',
    lessonNumber: 1, duration: '30 min', xp: 90, deri: 25, difficulty: 'Intermediate',
    prerequisites: ['testing-and-deployment'], tags: ['Identity','SSI','Access Control','Privacy'],
    prevLesson: 'testing-and-deployment', nextLesson: 'supply-chain-applications',
    keyTakeaways: ['DRP enables self-sovereign identity — you own your credentials, not a company','Decentralized ID replaces fragmented logins with one universal verifiable identity','Access control based on proven status, not arbitrary admin decisions','Privacy-preserving: prove what is needed, nothing more'],
    sections: [
      { type: 'intro', content: 'Today your identity is fragmented across dozens of platforms, each holding a slice of your data. Facebook knows your social graph. LinkedIn knows your work history. The government knows your legal status. None of these talk to each other — and you control none of them. DRP identity layer changes this fundamentally.' },
      { type: 'concept', title: 'Self-Sovereign Identity (SSI)', content: 'SSI means you hold your own credentials. No company can revoke them. No government can seize them. You present them when you choose. DRP implements SSI through PoST — your professional credentials, community roles, and verified attributes live in your DRP wallet.' },
      { type: 'callout', calloutType: 'drp', title: 'Real Use Case: Ghana Pilot', content: 'DRP Ghana validation pilot aims to register smallholder farmers with verified PoAT and PoST profiles. These profiles enable access to agricultural subsidies, microloans, and land registration — without requiring physical ID documents that many lack. DRP becomes identity infrastructure for populations excluded from formal systems.' },
      { type: 'quiz', title: 'Identity Quiz', content: 'What is self-sovereign identity in the DRP context?', quizOptions: ['Identity managed by the DRP company','Identity you own and control — credentials in your wallet, shared selectively','Identity verified by government agencies','A premium paid tier for verified users'], quizAnswer: 1, quizExplanation: 'Self-sovereign identity means ownership stays with the individual. Your DRP proof credentials live in your wallet, cannot be revoked by any company, and you choose what to reveal and when.' },
    ],
  },

  'supply-chain-applications': {
    slug: 'supply-chain-applications', title: 'Supply Chain Applications',
    subtitle: 'Transparent, verifiable supply chains using DRP activity proofs',
    path: 4, pathName: 'Real-World Applications', pathIcon: 'Globe',
    lessonNumber: 2, duration: '35 min', xp: 100, deri: 30, difficulty: 'Intermediate',
    prerequisites: ['identity-access-management'], tags: ['Supply Chain','Agriculture','Traceability','Farmers'],
    prevLesson: 'identity-access-management', nextLesson: 'cross-chain-interoperability',
    keyTakeaways: ['DRP tracks human activity at every supply chain node — farm to consumer','Farmers earn PoAT proofs creating verifiable production records','Consumers can trace products to the exact verified contributor','Ethical sourcing becomes cryptographically verifiable, not just claimed'],
    sections: [
      { type: 'intro', content: '"Ethical sourcing", "fair trade", "sustainably grown" — these labels are everywhere but unverifiable. DRP changes this by creating a chain of activity proofs from production to consumer, where every human hand that touched a product has a verifiable, permanent record.' },
      { type: 'diagram', title: 'DRP Supply Chain Flow', diagramType: 'flow', content: 'From farm to consumer, each participant contribution is recorded as a PoAT proof — creating an unbreakable chain of custody.', diagramData: { nodes: [{ id: 'a', label: 'Sprout Farmer', sublabel: 'PoAT: Agricultural\nKwame, Ghana', color: '#10b981' },{ id: 'b', label: 'Factory Processor', sublabel: 'PoAT: Industrial\nVerified facility', color: '#0ea5e9' },{ id: 'c', label: 'Truck Transport', sublabel: 'PoAT: Logistics\nRoute verified', color: '#f59e0b' },{ id: 'd', label: 'Store Retailer', sublabel: 'PoST: Licensed\nRetail verified', color: '#00f2ff' },{ id: 'e', label: 'User Consumer', sublabel: 'Scans → full\nproof chain', color: '#ec4899' }], edges: [{ from: 'a', to: 'b', label: 'harvested' },{ from: 'b', to: 'c', label: 'packaged' },{ from: 'c', to: 'd', label: 'delivered' },{ from: 'd', to: 'e', label: 'sold' }] } },
      { type: 'quiz', title: 'Supply Chain Quiz', content: 'How would DRP make an "ethically sourced" claim actually verifiable?', quizOptions: ['Publishing a PDF report each year','Storing PoAT proofs from each farmer on-chain — scannable by anyone, anytime','Getting a third-party certification sticker','By the company signing an oath'], quizAnswer: 1, quizExplanation: 'With DRP, each farmer has on-chain PoAT proofs for their agricultural work. Anyone — consumers, journalists, regulators — can verify the claim without trusting the company word.' },
    ],
  },

  'cross-chain-interoperability': {
    slug: 'cross-chain-interoperability', title: 'Cross-Chain Interoperability',
    subtitle: 'How DRP proofs travel across blockchains via IBC and bridge protocols',
    path: 4, pathName: 'Real-World Applications', pathIcon: 'Globe',
    lessonNumber: 3, duration: '40 min', xp: 110, deri: 35, difficulty: 'Advanced',
    prerequisites: ['supply-chain-applications'], tags: ['IBC','Interoperability','Cosmos','Cross-chain'],
    prevLesson: 'supply-chain-applications', nextLesson: 'enterprise-integration',
    keyTakeaways: ['DRP uses IBC for native cross-chain proof portability','Your rights proof on DRP is recognized by any IBC-compatible chain','Bridge contracts extend DRP reach to EVM chains','Cross-chain identity means one verified profile, everywhere in Web3'],
    sections: [
      { type: 'intro', content: 'Web3 is a multi-chain world. If DRP only works on one chain, its impact is limited. Cross-chain interoperability lets your DRP rights proof travel wherever you do in Web3.' },
      { type: 'concept', title: 'IBC: The Internet of Blockchains', content: 'IBC (Inter-Blockchain Communication) is the native cross-chain protocol of the Cosmos ecosystem. Just as HTTP enables communication between web servers, IBC enables blockchains to send authenticated messages to each other. Because DRP is built on Cosmos SDK, it gets IBC compatibility natively.' },
      { type: 'callout', calloutType: 'drp', title: 'Your DRP ID in DeFi', content: 'Use your DRP verified identity to access undercollateralized loans on a DeFi protocol. Your PoAT proofs demonstrate income history. Your PoST credentials establish identity. The DeFi protocol on another chain reads your DRP proofs via IBC — no bank, no credit score, just cryptographic proof.' },
      { type: 'quiz', title: 'Interoperability Quiz', content: 'What does IBC enable for DRP?', quizOptions: ['International Blockchain Council — a regulatory body','Inter-Blockchain Communication — lets DRP proofs be recognized on other Cosmos chains','Integrated Bridge Contract — a token swap mechanism','Immutable Block Cache — a storage optimization'], quizAnswer: 1, quizExplanation: 'IBC (Inter-Blockchain Communication) is Cosmos native cross-chain protocol. For DRP, rights proofs created on DRP can be transmitted to and recognized by any other IBC-compatible chain.' },
    ],
  },

  'enterprise-integration': {
    slug: 'enterprise-integration', title: 'Enterprise Integration',
    subtitle: 'Integrating DRP into institutional systems — NGOs, governments, corporations',
    path: 4, pathName: 'Real-World Applications', pathIcon: 'Globe',
    lessonNumber: 4, duration: '35 min', xp: 110, deri: 40, difficulty: 'Advanced',
    prerequisites: ['cross-chain-interoperability'], tags: ['Enterprise','NGO','Government','API','Compliance'],
    prevLesson: 'cross-chain-interoperability', nextLesson: 'advanced-drp-concepts',
    keyTakeaways: ['DRP provides enterprise-grade APIs for institutional integration','Compliance modules meet GDPR, CCPA, and other regulatory requirements','NGO integration enables verifying beneficiary status transparently','Government integration enables verifiable public service delivery records'],
    sections: [
      { type: 'intro', content: 'DRP most transformative potential lies in institutional adoption. When NGOs verify beneficiaries, when governments record public services, when corporations certify supply chains — all on DRP — it creates a global verified record of human welfare.' },
      { type: 'concept', title: 'DRP Enterprise API', content: 'The DRP Enterprise API provides: Bulk Proof Verification (verify thousands of status proofs at once), Batch Registration (register activity proofs for large groups), Audit Trails (complete on-chain audit logs), Compliance Exports (GDPR-compliant data exports), and Webhooks (real-time notifications when proofs are created or updated).' },
      { type: 'callout', calloutType: 'drp', title: 'Case Study: Humanitarian Aid Distribution', content: 'A humanitarian organization using DRP: registers beneficiaries via PoST proofs (verified displacement status), records aid distribution as PoAT proofs, makes all distribution transparent to donors, prevents double-claiming across multiple aid organizations. Result: zero fraudulent distributions, full donor transparency, verified impact reports.' },
      { type: 'quiz', title: 'Enterprise Quiz', content: 'An NGO distributes food aid in three countries and wants to prevent the same person claiming aid multiple times. How does DRP help?', quizOptions: ['DRP cannot help — this requires a central database','DRP PoST identity proofs create a unique cross-border verifiable identity — preventing double-claiming without a central authority','The NGO needs to build their own blockchain','DRP only works within single countries'], quizAnswer: 1, quizExplanation: 'DRP decentralized identity is global. A person PoST proof is recognized across all DRP-integrated systems regardless of country — filling the infrastructure gap for humanitarian operations.' },
    ],
  },

  // PATH 5: DRP ELDER
  'advanced-drp-concepts': {
    slug: 'advanced-drp-concepts', title: 'Advanced DRP Concepts',
    subtitle: 'Deep technical dive — post-quantum security, ZKPs, and protocol internals',
    path: 5, pathName: 'DRP Elder', pathIcon: 'Crown',
    lessonNumber: 1, duration: '45 min', xp: 150, deri: 50, difficulty: 'Advanced',
    prerequisites: ['enterprise-integration'], tags: ['Post-Quantum','ZKP','CRYSTALS','Advanced'],
    prevLesson: 'enterprise-integration', nextLesson: 'economic-models',
    keyTakeaways: ['CRYSTALS-Kyber and CRYSTALS-Dilithium are DRP post-quantum cryptographic primitives','SHA3-256 is the primary hash function throughout DRP','Zero-knowledge proofs allow privacy-preserving verification of status claims','The AI scoring engine uses federated learning to protect individual privacy'],
    sections: [
      { type: 'intro', content: 'Welcome to the Elder track. This is where we go deep on the cryptographic and algorithmic foundations that make DRP secure, private, and future-proof. This lesson assumes comfort with cryptography fundamentals.' },
      { type: 'concept', title: 'CRYSTALS-Kyber: Post-Quantum Key Exchange', content: 'Traditional key exchange (Diffie-Hellman, ECDH) relies on discrete logarithm problems — which quantum computers can solve using Shor algorithm. CRYSTALS-Kyber is a NIST-standardized key encapsulation mechanism based on the Module Learning With Errors (MLWE) problem. No known quantum algorithm achieves a meaningful speedup against MLWE. DRP uses Kyber-1024 (highest security level).' },
      { type: 'concept', title: 'CRYSTALS-Dilithium: Post-Quantum Signatures', content: 'Where Kyber handles key exchange, Dilithium handles digital signatures. Also lattice-based (MLWE), NIST-standardized. DRP uses Dilithium3 for all transaction signing. Signatures are ~2.5KB (larger than ECDSA 64 bytes) — the trade-off for 30+ years of quantum resistance.' },
      { type: 'diagram', title: 'DRP Security Stack', diagramType: 'stack', content: 'Every layer of DRP security, from hash function to governance.', diagramData: { layers: [{ name: 'Governance Security', color: '#00f2ff', icon: 'Crown', items: ['Elder Quorum 66% threshold','Time-locked proposals','Emergency pause mechanism'], description: 'Human governance layer' },{ name: 'Application Security', color: '#0ea5e9', icon: 'Settings', items: ['Smart contract audits','AI fraud detection','Rate limiting + replay protection'], description: 'Protocol logic security' },{ name: 'Signature Layer', color: '#10b981', icon: 'Pen', items: ['CRYSTALS-Dilithium3','2.5KB signatures','Quantum-resistant'], description: 'Transaction authentication' },{ name: 'Key Exchange', color: '#f59e0b', icon: 'Key', items: ['CRYSTALS-Kyber-1024','MLWE hardness','NIST standardized'], description: 'Secure channel establishment' },{ name: 'Hash Foundation', color: '#ef4444', icon: '#', items: ['SHA3-256 primary','SHA-256 fallback','Keccak-256 for EVM compat'], description: 'Foundational fingerprinting' }] } },
      { type: 'callout', calloutType: 'drp', title: 'Federated AI Scoring', content: 'DRP AI scoring engine uses federated learning — the model trains on participants data without that data ever leaving their devices. Only gradient updates are aggregated on-chain. Privacy and accuracy simultaneously.' },
      { type: 'quiz', title: 'Advanced Cryptography Quiz', content: 'Why does DRP use SHA3-256 as its primary hash function instead of SHA-256?', quizOptions: ['SHA3-256 is faster','SHA3-256 uses a completely different internal structure (Keccak sponge) providing diversity against attacks that might affect SHA-2','SHA-256 is deprecated','SHA3-256 produces shorter hashes'], quizAnswer: 1, quizExplanation: 'SHA3-256 (Keccak) uses a fundamentally different construction compared to SHA-256 (Merkle-Damgard). A theoretical weakness in SHA-2 would not apply to SHA-3. Design diversity is prudent security engineering for a protocol designed to last decades.' },
    ],
  },

  'economic-models': {
    slug: 'economic-models', title: 'DRP Economic Models',
    subtitle: '$RIGHTS, $DeRi, tokenomics, and the incentive architecture of DRP',
    path: 5, pathName: 'DRP Elder', pathIcon: 'Crown',
    lessonNumber: 2, duration: '40 min', xp: 140, deri: 45, difficulty: 'Advanced',
    prerequisites: ['advanced-drp-concepts'], tags: ['Tokenomics','$RIGHTS','$DeRi','Economics'],
    prevLesson: 'advanced-drp-concepts', nextLesson: 'governance-mechanisms',
    keyTakeaways: ['$RIGHTS is the governance token — earned through contribution, not purchased','$DeRi is the utility token — earned through activity and learning','Dual-token model separates governance from utility to prevent plutocracy','Token supply governed by contribution, not speculation'],
    sections: [
      { type: 'intro', content: 'Token economics determine who is incentivized to do what. Get them wrong and you get speculation, plutocracy, or abandonment. DRP dual-token model was designed with one goal: align financial incentives with human welfare contribution.' },
      { type: 'concept', title: '$RIGHTS: The Governance Token', content: '$RIGHTS is DRP governance token. It is NOT primarily traded for profit — it represents verified contribution and governance participation rights. $RIGHTS is earned through: accumulated PoAT proofs, Elder Quorum participation, and long-term protocol contribution. $RIGHTS cannot be purchased directly on open markets at launch — it must be earned. This prevents governance capture by wealthy actors.' },
      { type: 'concept', title: '$DeRi: The Utility Token', content: '$DeRi is DRP utility token — liquid, tradeable, and earned through learning, activity, and participation. Used for: paying transaction fees on DRP, accessing premium API features, tipping contributors, and governance proposals (requiring a $DeRi deposit to prevent spam). You earn $DeRi by completing these lessons.' },
      { type: 'diagram', title: 'Dual Token Economic Flow', diagramType: 'flow', content: 'How $RIGHTS and $DeRi flow through the DRP ecosystem.', diagramData: { nodes: [{ id: 'a', label: 'Activity Human\nActivity', sublabel: 'PoAT proofs', color: '#10b981' },{ id: 'b', label: 'Zap $DeRi\nEarned', sublabel: 'Utility token', color: '#f59e0b' },{ id: 'c', label: '🗳️ $RIGHTS\nAccumulated', sublabel: 'Governance token', color: '#00f2ff' },{ id: 'd', label: 'Crown Elder\nQuorum', sublabel: 'Protocol decisions', color: '#ec4899' },{ id: 'e', label: 'Settings DRP\nServices', sublabel: 'Fees in $DeRi', color: '#0ea5e9' }], edges: [{ from: 'a', to: 'b', label: 'rewards' },{ from: 'a', to: 'c', label: 'earns governance' },{ from: 'c', to: 'd', label: 'enables voting' },{ from: 'b', to: 'e', label: 'pays for' },{ from: 'e', to: 'a', label: 'funds' }] } },
      { type: 'quiz', title: 'Economics Quiz', content: 'Why can $RIGHTS not be purchased directly on open markets at DRP launch?', quizOptions: ['Technical limitation','To prevent plutocracy — wealthy actors buying governance power without contributing to human welfare','Regulatory concerns','$RIGHTS has no monetary value'], quizAnswer: 1, quizExplanation: 'If $RIGHTS could be bought, someone with enough money could purchase control of a human rights protocol — defeating its purpose entirely. The earn through contribution only model is a deliberate anti-plutocracy design decision.' },
    ],
  },

  'governance-mechanisms': {
    slug: 'governance-mechanisms', title: 'Governance Mechanisms',
    subtitle: 'Deep dive into DRP decentralized governance architecture',
    path: 5, pathName: 'DRP Elder', pathIcon: 'Crown',
    lessonNumber: 3, duration: '35 min', xp: 140, deri: 50, difficulty: 'Advanced',
    prerequisites: ['economic-models'], tags: ['Governance','DRIP','Voting','Proposals','On-Chain'],
    prevLesson: 'economic-models', nextLesson: 'future-of-drp',
    keyTakeaways: ['All governance is on-chain — proposals, votes, and execution are transparent','Three-tier governance: Community Proposals → Elder Review → On-chain Execution','Emergency mechanisms protect the protocol during critical security events','AI Elders can propose but not vote — they assist human decision-making'],
    sections: [
      { type: 'intro', content: 'Governance is how a decentralized protocol evolves without a CEO. Done right, it is the most powerful decision-making system in existence — transparent, accountable, and resistant to capture. DRP governance is a three-tier system with checks at every level.' },
      { type: 'diagram', title: 'DRP Governance Flow', diagramType: 'flow', content: 'From community idea to on-chain protocol change — the full DRP governance process.', diagramData: { nodes: [{ id: 'a', label: '💡 Community\nIdea', sublabel: 'Forum discussion', color: '#00f2ff' },{ id: 'b', label: '📋 DRIP\nProposal', sublabel: '$DeRi deposit required', color: '#0ea5e9' },{ id: 'c', label: 'Crown Elder\nReview', sublabel: '14-day deliberation', color: '#f59e0b' },{ id: 'd', label: '🗳️ On-chain\nVote', sublabel: '7-day window', color: '#10b981' },{ id: 'e', label: '⏰ 48hr\nTimelock', sublabel: 'Emergency veto window', color: '#ec4899' },{ id: 'f', label: 'Settings Auto\nExecution', sublabel: 'Smart contract executes', color: '#10b981' }], edges: [{ from: 'a', to: 'b', label: 'formalize' },{ from: 'b', to: 'c', label: 'submit' },{ from: 'c', to: 'd', label: 'approve for vote' },{ from: 'd', to: 'e', label: 'if 66% pass' },{ from: 'e', to: 'f', label: 'if no veto' }] } },
      { type: 'callout', calloutType: 'warning', title: 'Emergency Governance', content: 'For critical security vulnerabilities, the Security Council (5 senior Elders) can pause specific contracts for up to 72 hours. The full Elder Quorum must then vote within 72 hours to approve the fix or lift the pause. No single entity has unilateral power.' },
      { type: 'quiz', title: 'Governance Quiz', content: 'What is the purpose of the 48-hour timelock between a successful governance vote and execution?', quizOptions: ['To give developers time to write the code','To allow an emergency veto window — if a malicious proposal somehow passed, the community can respond','Required by regulation','To allow validators to prepare'], quizAnswer: 1, quizExplanation: 'The timelock is a final safety valve. Even if a malicious proposal achieved 66% votes through a coordinated attack, the 48-hour window allows the broader community and Security Council to identify and veto it before execution.' },
    ],
  },

  'future-of-drp': {
    slug: 'future-of-drp', title: 'The Future of DRP',
    subtitle: 'Roadmap, vision, and the long-term impact of rights infrastructure',
    path: 5, pathName: 'DRP Elder', pathIcon: 'Crown',
    lessonNumber: 4, duration: '30 min', xp: 150, deri: 55, difficulty: 'Advanced',
    prerequisites: ['governance-mechanisms'], tags: ['Roadmap','Vision','Future','Impact','Global'],
    prevLesson: 'governance-mechanisms', nextLesson: null,
    keyTakeaways: ['DRP Phase 1: Ghana validation pilot with 10,000 registered participants','Phase 2: Multi-country rollout across West Africa and Global South','Phase 3: Global mainnet with IBC cross-chain rights portability','Long-term vision: DRP as the identity and rights infrastructure layer for all of humanity'],
    sections: [
      { type: 'intro', content: 'You have made it to the final lesson — the Elder tier. You now understand blockchain fundamentals, DRP architecture, cryptographic security, economic models, and governance. This last lesson is about where all of it is heading.' },
      { type: 'diagram', title: 'DRP Roadmap', diagramType: 'timeline', content: 'From testnet launch to global rights infrastructure.', diagramData: { events: [{ phase: 'Phase 0', title: 'Testnet Launch', date: '2025 Q3', status: 'active', items: ['FastAPI backend on Render','DRP Discord bot active','Learn module live','SDK alpha release'] },{ phase: 'Phase 1', title: 'Ghana Pilot', date: '2025 Q4', status: 'upcoming', items: ['10,000 participant target','Smallholder farmer PoAT','Government partnership pilot','Mobile-first verification app'] },{ phase: 'Phase 2', title: 'Regional Expansion', date: '2026', status: 'future', items: ['West Africa rollout','NGO integrations','Elder Quorum formation','$DeRi token generation event'] },{ phase: 'Phase 3', title: 'Global Mainnet', date: '2027+', status: 'future', items: ['IBC cross-chain live','$RIGHTS governance live','Enterprise API v2','UN agency partnerships'] }] } },
      { type: 'concept', title: 'Project Lazarus: Restoring Lost Assets', content: 'AI Elders continuously scan major blockchains for lost or abandoned assets — wallets dormant for 7+ years, assets sent to burn addresses, inheritance cases where private keys were lost. Through DRP ethical recovery framework, legitimate heirs can present PoST proofs to claim these assets through a governance process. Estimated $20B+ in recoverable on-chain assets.' },
      { type: 'callout', calloutType: 'drp', title: 'The Bigger Picture', content: 'DRP ultimate vision: a world where every human has a verifiable, portable, self-sovereign identity and rights record — not subject to any government whim or corporation terms of service. Where humanitarian aid finds its recipients without fraud. Where governance rewards contribution over capital. Where your rights are as permanent and portable as mathematics. That is what you have just learned to build.' },
      { type: 'quiz', title: 'Final Elder Quiz', content: 'You have completed all 5 DRP learning paths. What does this represent in the DRP ecosystem?', quizOptions: ['Nothing — it is just educational','A verified on-chain credential showing comprehensive DRP knowledge, PoAT proof, and eligibility for Elder tier consideration','A certificate PDF','Access to a paid premium tier'], quizAnswer: 1, quizExplanation: 'Completing all 5 paths creates a verifiable on-chain learning credential. Combined with your accumulated XP and $DeRi, this contributes to your Activity Score and makes you eligible to begin the Elder nomination process. Your learning is permanent, portable, and recognized by the protocol itself. Congratulations, Elder.' },
    ],
  },
};

export const LESSON_SLUGS = Object.keys(LESSONS);
export const getLessonBySlug = (slug: string): Lesson | undefined => LESSONS[slug];

export const PATHS = [
  { id: 1, name: 'Blockchain Foundations', icon: 'Link', color: '#0ea5e9', lessons: ['what-is-blockchain','cryptography-and-hashing','consensus-mechanisms','smart-contracts-101'] },
  { id: 2, name: 'DRP Core Protocol', icon: 'Zap', color: '#00f2ff', lessons: ['drp-architecture','activity-proofs','post-poat-consensus','elder-quorum-system'] },
  { id: 3, name: 'Building on DRP', icon: 'Hammer', color: '#10b981', lessons: ['drp-development-kit','building-dapps','contributing-to-drp','testing-and-deployment'] },
  { id: 4, name: 'Real-World Applications', icon: 'Globe', color: '#f59e0b', lessons: ['identity-access-management','supply-chain-applications','cross-chain-interoperability','enterprise-integration'] },
  { id: 5, name: 'DRP Elder', icon: 'Crown', color: '#ec4899', lessons: ['advanced-drp-concepts','economic-models','governance-mechanisms','future-of-drp'] },
];
