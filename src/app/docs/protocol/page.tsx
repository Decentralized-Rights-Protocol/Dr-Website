import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Code, Shield, Brain, Zap, Users, Globe, Lock, Cpu, Network, BookOpen, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'DRP Protocol Documentation - Technical Specifications',
  description: 'Comprehensive technical documentation for the Decentralized Rights Protocol (DRP) including architecture, consensus mechanisms, and implementation details.',
  openGraph: {
    title: 'DRP Protocol Documentation - Technical Specifications',
    description: 'Comprehensive technical documentation for the Decentralized Rights Protocol (DRP) including architecture, consensus mechanisms, and implementation details.',
  },
}

const protocolSections = [
  {
    title: 'Architecture Overview',
    description: 'High-level system architecture and component interactions',
    icon: Network,
    color: 'from-blue-500 to-cyan-500',
    topics: [
      'Modular Blockchain Design',
      'C++ Core Implementation',
      'Python SDK Integration',
      'Cross-Chain Compatibility',
      'API Layer Architecture'
    ]
  },
  {
    title: 'Quantum-Safe Cryptography',
    description: 'NIST-approved post-quantum cryptographic algorithms',
    icon: Shield,
    color: 'from-green-500 to-emerald-500',
    topics: [
      'CRYSTALS-Kyber (KEM)',
      'CRYSTALS-Dilithium (Signatures)',
      'Key Management System',
      'Quantum Resistance Analysis',
      'Migration Strategies'
    ]
  },
  {
    title: 'Consensus Mechanisms',
    description: 'Proof of Status and Proof of Activities algorithms',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    topics: [
      'Proof of Status (PoS)',
      'Proof of Activities (PoA)',
      'AI Verification System',
      'Human Effort Validation',
      'Consensus Finality'
    ]
  },
  {
    title: 'Token Economy',
    description: 'Dual-token model with $RIGHTS and $DeRi tokens',
    icon: Users,
    color: 'from-orange-500 to-red-500',
    topics: [
      '$RIGHTS Governance Token',
      '$DeRi Utility Token',
      'Token Distribution',
      'Staking Mechanisms',
      'Economic Incentives'
    ]
  },
  {
    title: 'Sustainability Framework',
    description: 'Environmental responsibility and clean energy rewards',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
    topics: [
      'Clean Energy Rewards',
      'Carbon Footprint Tracking',
      'Sustainable Mining',
      'Environmental Impact',
      'Green Technology Integration'
    ]
  },
  {
    title: 'AI Elders (Project Lazarus)',
    description: 'Cross-chain AI agents for asset recovery',
    icon: Cpu,
    color: 'from-indigo-500 to-purple-500',
    topics: [
      'AI Agent Architecture',
      'Cross-Chain Operations',
      'Asset Recovery Algorithms',
      'Machine Learning Models',
      'Ethical AI Guidelines'
    ]
  }
]

const technicalSpecs = [
  {
    category: 'Performance',
    specs: [
      { name: 'Transaction Throughput', value: '10,000+ TPS' },
      { name: 'Block Time', value: '2 seconds' },
      { name: 'Finality Time', value: '6 seconds' },
      { name: 'Network Latency', value: '< 100ms' }
    ]
  },
  {
    category: 'Security',
    specs: [
      { name: 'Quantum Resistance', value: 'NIST Level 3' },
      { name: 'Cryptographic Strength', value: '256-bit' },
      { name: 'Hash Algorithm', value: 'SHA-3' },
      { name: 'Signature Scheme', value: 'CRYSTALS-Dilithium' }
    ]
  },
  {
    category: 'Scalability',
    specs: [
      { name: 'Sharding Support', value: 'Yes' },
      { name: 'State Channels', value: 'Implemented' },
      { name: 'Sidechains', value: 'Planned' },
      { name: 'Cross-Chain', value: 'Native' }
    ]
  }
]

export default function ProtocolPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/docs"
                className="inline-flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Documentation
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                Technical Documentation
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl mb-6">
            DRP Protocol Documentation
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-4xl mx-auto">
            Comprehensive technical specifications for the Decentralized Rights Protocol (DRP) - 
            a quantum-safe blockchain platform designed for human rights protection and global impact.
          </p>
          
          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Code className="mr-3 h-5 w-5" />
              View Source Code
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
            <Link
              href="/whitepaper"
              className="inline-flex items-center px-6 py-3 text-lg font-semibold text-neutral-700 dark:text-neutral-300 border-2 border-neutral-300 dark:border-neutral-600 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-300"
            >
              <BookOpen className="mr-3 h-5 w-5" />
              Read Whitepaper
            </Link>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
            Technical Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {technicalSpecs.map((category, index) => (
              <div key={index} className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-6">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6 text-center">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.specs.map((spec, specIndex) => (
                    <div key={specIndex} className="flex justify-between items-center py-2 border-b border-neutral-200 dark:border-neutral-600 last:border-b-0">
                      <span className="text-neutral-600 dark:text-neutral-300 font-medium">
                        {spec.name}
                      </span>
                      <span className="text-neutral-900 dark:text-white font-semibold">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Protocol Sections */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
            Protocol Components
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {protocolSections.map((section, index) => (
              <div
                key={section.title}
                className="group bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${section.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <section.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                  {section.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4 text-sm leading-relaxed">
                  {section.description}
                </p>
                <ul className="space-y-2">
                  {section.topics.map((topic, topicIndex) => (
                    <li key={topicIndex} className="flex items-center text-sm text-neutral-500 dark:text-neutral-400">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Implementation Guide */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-700 p-8 mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-6 text-center">
            Quick Start Implementation
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                Prerequisites
              </h3>
              <ul className="space-y-2 text-neutral-600 dark:text-neutral-300">
                <li>• Python 3.10+ with pip</li>
                <li>• Node.js 18.x LTS</li>
                <li>• Git for version control</li>
                <li>• Docker (optional, for containerized deployment)</li>
                <li>• 8GB+ RAM recommended</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
                Installation Steps
              </h3>
              <div className="bg-neutral-900 rounded-lg p-4 text-sm font-mono text-green-400">
                <div># Clone the repository</div>
                <div>git clone https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain.git</div>
                <div className="mt-2"># Install dependencies</div>
                <div>pip install -r requirements.txt</div>
                <div className="mt-2"># Run testnet node</div>
                <div>python src/node.py</div>
              </div>
            </div>
          </div>
        </div>

        {/* API Reference */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">
            API Reference
          </h2>
          <p className="text-primary-100 mb-8 text-center max-w-3xl mx-auto">
            Access comprehensive API documentation and SDK guides for integrating with the DRP protocol.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain/tree/main/docs/api"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 text-lg font-semibold text-primary-600 bg-white rounded-xl hover:bg-neutral-50 transition-colors"
            >
              <Code className="mr-3 h-5 w-5" />
              API Documentation
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
            <a
              href="https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain/tree/main/examples"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-colors"
            >
              <BookOpen className="mr-3 h-5 w-5" />
              Code Examples
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
