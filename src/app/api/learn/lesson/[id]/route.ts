import { NextRequest, NextResponse } from 'next/server';

// Mock lesson data - in production, this would come from a database
const lessons = {
  '1-1': {
    id: '1-1',
    title: 'What is Blockchain?',
    description: 'Master the fundamentals of blockchain technology and decentralized systems',
    content: `
      <h2>What is Blockchain?</h2>
      <p>A <strong>blockchain</strong> is a distributed ledger technology that maintains a continuously growing list of records, called blocks, that are linked and secured using cryptography.</p>
      
      <h3>Key Characteristics</h3>
      <ul>
        <li><strong>Decentralization:</strong> No single authority controls the network</li>
        <li><strong>Immutability:</strong> Once data is recorded, it cannot be changed</li>
        <li><strong>Transparency:</strong> All participants can view the entire history</li>
        <li><strong>Security:</strong> Cryptographic techniques protect the data</li>
      </ul>
      
      <h3>How Blockchain Works</h3>
      <p>Each block contains data, a hash (unique fingerprint), and the hash of the previous block, creating an unbreakable chain.</p>
      
      <h3>Real-World Applications</h3>
      <ul>
        <li>Cryptocurrency (Bitcoin, Ethereum)</li>
        <li>Supply Chain Management</li>
        <li>Digital Identity</li>
        <li>Smart Contracts</li>
      </ul>
    `,
    duration: 15,
    reward: 10,
    level: 1,
    module: 'blockchain-basics',
    quiz: {
      questions: [
        {
          id: 'q1',
          question: 'What is the primary characteristic that makes blockchain different from traditional databases?',
          options: [
            'It stores more data',
            'It is decentralized and immutable',
            'It is faster',
            'It uses less storage'
          ],
          correct: 1
        },
        {
          id: 'q2',
          question: 'What does the term "immutable" mean in blockchain context?',
          options: [
            'Data can be easily changed',
            'Data cannot be changed once recorded',
            'Data is temporary',
            'Data is encrypted'
          ],
          correct: 1
        },
        {
          id: 'q3',
          question: 'Which of the following is NOT a key characteristic of blockchain?',
          options: [
            'Decentralization',
            'Immutability',
            'Centralized control',
            'Transparency'
          ],
          correct: 2
        }
      ]
    }
  },
  '2-1': {
    id: '2-1',
    title: 'DRP Architecture',
    description: 'Understand the Decentralized Rights Protocol and its applications',
    content: `
      <h2>DRP Architecture</h2>
      <p>The <strong>Decentralized Rights Protocol (DRP)</strong> is a blockchain-based system designed to manage digital rights in a decentralized, transparent, and immutable manner.</p>
      
      <h3>DRP Architecture Layers</h3>
      <ol>
        <li><strong>Application Layer:</strong> DApps, User Interfaces, APIs</li>
        <li><strong>Protocol Layer:</strong> Rights Management, Smart Contracts</li>
        <li><strong>Consensus Layer:</strong> PoST + PoAT, Elder Quorum</li>
        <li><strong>Network Layer:</strong> P2P Communication, Node Discovery</li>
      </ol>
      
      <h3>Key DRP Components</h3>
      <ul>
        <li><strong>Smart Contracts:</strong> Automate rights management</li>
        <li><strong>Activity Proofs:</strong> Cryptographic evidence of real-world activities</li>
        <li><strong>Elder Quorum:</strong> Governance mechanism for experienced participants</li>
      </ul>
      
      <h3>DRP vs Traditional Systems</h3>
      <p>DRP eliminates intermediaries, reduces costs, and provides transparent, automated rights management.</p>
    `,
    duration: 20,
    reward: 15,
    level: 2,
    module: 'drp-architecture',
    quiz: {
      questions: [
        {
          id: 'q1',
          question: 'What are the four layers of DRP architecture?',
          options: [
            'Application, Protocol, Consensus, Network',
            'Frontend, Backend, Database, API',
            'User, System, Hardware, Software',
            'Input, Process, Output, Storage'
          ],
          correct: 0
        },
        {
          id: 'q2',
          question: 'What is the primary purpose of the Elder Quorum?',
          options: [
            'To mine new blocks',
            'To provide governance and make protocol decisions',
            'To store user data',
            'To process transactions'
          ],
          correct: 1
        },
        {
          id: 'q3',
          question: 'What does PoAT stand for in DRP consensus?',
          options: [
            'Proof of Authority Time',
            'Proof of Activity',
            'Proof of Available Time',
            'Proof of Advanced Technology'
          ],
          correct: 1
        }
      ]
    }
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const lessonId = params.id;
  
  const lesson = lessons[lessonId as keyof typeof lessons];
  
  if (!lesson) {
    return NextResponse.json(
      { error: 'Lesson not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(lesson);
}
