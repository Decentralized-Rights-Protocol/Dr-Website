'use client'

import Link from 'next/link'
import { Code, Terminal, BookOpen, ArrowLeft, Copy } from 'lucide-react'
import { useState } from 'react'

const codeExamples = [
  {
    title: 'Basic Node Setup',
    description: 'Initialize and run a DRP node',
    language: 'python',
    code: `# Install dependencies
pip install -r requirements.txt

# Initialize node
from drp.node import DRPNode

node = DRPNode(
    host='0.0.0.0',
    port=8080,
    testnet=True
)

# Start node
node.start()`,
  },
  {
    title: 'Proof of Status Verification',
    description: 'Verify user status in the network',
    language: 'python',
    code: `from drp.consensus import verify_status

# Verify user status
user_id = "user_12345"
status = verify_status(user_id)

if status.is_verified:
    print(f"User {user_id} has status: {status.level}")
    print(f"Voting power: {status.voting_power}")
else:
    print("User status not verified")`,
  },
  {
    title: 'Submit Activity Proof',
    description: 'Submit proof of activity for rewards',
    language: 'python',
    code: `from drp.consensus import submit_activity

# Create activity proof
activity = {
    "type": "node_operation",
    "duration": 3600,  # 1 hour
    "energy_source": "renewable",
    "contributions": [
        "processed_transactions",
        "maintained_network"
    ]
}

# Submit proof
result = submit_activity(user_id="user_12345", activity=activity)

if result.success:
    print(f"Activity verified! Reward: {result.reward} $DeRi")
else:
    print(f"Activity rejected: {result.reason}")`,
  },
  {
    title: 'Post-Quantum Key Generation',
    description: 'Generate quantum-safe cryptographic keys',
    language: 'python',
    code: `from drp.crypto import generate_kyber_keys

# Generate CRYSTALS-Kyber key pair
public_key, private_key = generate_kyber_keys()

print(f"Public Key: {public_key.hex()}")
print(f"Private Key: {private_key.hex()}")

# Key pair is quantum-resistant and ready for use`,
  },
  {
    title: 'Transaction Signing',
    description: 'Sign a transaction with post-quantum signature',
    language: 'python',
    code: `from drp.crypto import sign_transaction, verify_signature

# Create transaction
transaction = {
    "from": "user_12345",
    "to": "user_67890",
    "amount": 100.0,
    "token": "DeRi"
}

# Sign transaction
signature = sign_transaction(transaction, private_key)

# Verify signature
is_valid = verify_signature(transaction, signature, public_key)

if is_valid:
    print("Transaction signature is valid")
    # Submit transaction to network
else:
    print("Invalid signature")`,
  },
  {
    title: 'AI Verification Check',
    description: 'Check AI verification status for activity',
    language: 'python',
    code: `from drp.ai import AIElder

# Initialize AI Elder
ai_elder = AIElder()

# Verify activity
activity_data = {
    "user_id": "user_12345",
    "activity_type": "governance_vote",
    "timestamp": "2024-01-15T10:30:00Z",
    "details": {...}
}

verification = ai_elder.verify(activity_data)

if verification.is_legitimate:
    print(f"Activity verified by AI. Score: {verification.reputation_score}")
else:
    print(f"Activity flagged: {verification.reason}")`,
  },
]

export default function ExamplesPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Documentation
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl mb-4">
            Examples & Demos
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Practical code examples to get you started with the Decentralized Rights Protocol.
          </p>
        </div>

        {/* Quick Start */}
        <div className="mb-16 p-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl text-white">
          <div className="flex items-center gap-4 mb-4">
            <Terminal className="h-8 w-8" />
            <h2 className="text-2xl font-bold">Quick Start</h2>
          </div>
          <p className="text-primary-100 mb-6">
            Clone the repository and run the testnet node to get started immediately.
          </p>
          <div className="bg-neutral-900/50 p-4 rounded-lg font-mono text-sm mb-6">
            <div className="text-neutral-400"># Clone repository</div>
            <div className="text-green-400">git clone https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain.git</div>
            <div className="text-neutral-400 mt-2"># Install dependencies</div>
            <div className="text-green-400">pip install -r requirements.txt</div>
            <div className="text-neutral-400 mt-2"># Run testnet node</div>
            <div className="text-blue-400">python src/node.py</div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="space-y-12">
          {codeExamples.map((example, index) => (
            <section key={index} className="bg-white dark:bg-neutral-900 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                    {example.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {example.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-sm font-mono text-neutral-600 dark:text-neutral-400">
                  {example.language}
                </div>
              </div>
              <div className="relative">
                <pre className="bg-neutral-900 rounded-lg p-4 overflow-x-auto">
                  <code className="text-green-400 text-sm font-mono">{example.code}</code>
                </pre>
                <button
                  onClick={() => handleCopy(example.code, index)}
                  className="absolute top-4 right-4 p-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-neutral-400 hover:text-white transition-colors"
                  title="Copy code"
                >
                  {copiedIndex === index ? (
                    <span className="text-green-400 text-xs">✓</span>
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </section>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <BookOpen className="h-8 w-8 text-primary-600 dark:text-primary-400 mb-4" />
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              Full Documentation
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Explore comprehensive guides and API references.
            </p>
            <Link
              href="/docs"
              className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
            >
              View Docs
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Link>
          </div>
          <div className="p-6 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <Code className="h-8 w-8 text-secondary-600 dark:text-secondary-400 mb-4" />
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              GitHub Repository
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Browse the source code and contribute to the project.
            </p>
            <a
              href="https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-secondary-600 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300 font-medium"
            >
              Visit GitHub
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
