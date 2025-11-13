'use client'

import * as React from 'react'
import { Shield, Brain, Zap, Users, Globe, Lock, Cpu, Network, Info, type LucideIcon } from 'lucide-react'

type Feature = {
  name: string
  description: string
  icon: LucideIcon
  color: string
  details: string
}

const features: Feature[] = [
  {
    name: 'Quantum-Safe Security',
    description: 'Built with NIST-approved CRYSTALS-Kyber and CRYSTALS-Dilithium algorithms for future-proof security against quantum attacks.',
    icon: Shield,
    color: 'from-blue-500 to-cyan-500',
    details: 'DRP uses post-quantum cryptography (PQC) standards including CRYSTALS-Kyber for key encapsulation and CRYSTALS-Dilithium for digital signatures. These algorithms are resistant to attacks from both classical and quantum computers, ensuring long-term security for the protocol. The implementation follows NIST PQC standards and is regularly audited for security.',
  },
  {
    name: 'AI-Verified Consensus',
    description: 'Proof of Status & Proof of Activities ensure trust by verifying real human effort with advanced AI systems.',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    details: 'The consensus mechanism combines Proof of Status (PoS) for identity verification and Proof of Activities (PoA) for contribution validation. AI Elders use machine learning to detect fraudulent activities, verify genuine contributions, and assign reputation scores. This creates a trust-based system where verified participants have greater influence in governance decisions.',
  },
  {
    name: 'Sustainability-First',
    description: 'Rewards participants for using clean energy and sustainable resources, promoting environmental responsibility.',
    icon: Zap,
    color: 'from-green-500 to-emerald-500',
    details: 'DRP incentivizes sustainable practices by rewarding nodes that use renewable energy sources. The protocol tracks energy consumption and carbon footprint, giving preference to participants who demonstrate environmental responsibility. This aligns with global sustainability goals and creates positive environmental impact while maintaining network security.',
  },
  {
    name: 'Human Rights Centered',
    description: 'Dual-token model with $RIGHTS for governance and $DeRi for utility, prioritizing human dignity and fairness.',
    icon: Users,
    color: 'from-orange-500 to-red-500',
    details: 'The dual-token system separates governance ($RIGHTS) from utility ($DeRi) to ensure fair participation. $RIGHTS tokens represent voting power and governance rights, while $DeRi tokens are used for transactions and rewards. This design promotes democratic participation and prevents centralization of power, ensuring the protocol serves human rights and dignity.',
  },
  {
    name: 'Global Impact',
    description: 'Designed to accelerate UN Sustainable Development Goals and protect human rights worldwide.',
    icon: Globe,
    color: 'from-indigo-500 to-blue-500',
    details: 'DRP is built with a mission to support the UN Sustainable Development Goals (SDGs), particularly those related to human rights, economic growth, and environmental sustainability. The protocol enables transparent governance, fair economic participation, and sustainable practices that can be scaled globally to create positive social and environmental impact.',
  },
  {
    name: 'Transparent Governance',
    description: 'Decentralized decision-making with community-driven governance and transparent voting mechanisms.',
    icon: Lock,
    color: 'from-gray-500 to-slate-500',
    details: 'All governance decisions are made through transparent, on-chain voting mechanisms. Proposals are publicly visible, voting is recorded immutably on the blockchain, and results are executed automatically through smart contracts. This ensures accountability, prevents manipulation, and empowers the community to shape the protocol\'s future.',
  },
  {
    name: 'AI Elders (Project Lazarus)',
    description: 'Cross-chain AI agents that ethically recover lost or abandoned digital assets with advanced machine learning.',
    icon: Cpu,
    color: 'from-violet-500 to-purple-500',
    details: 'AI Elders are autonomous AI agents that use advanced machine learning to identify and recover lost or abandoned digital assets across blockchains. They operate with ethical guidelines, verify ownership through multiple attestations, and ensure assets are returned to rightful owners. This project, named "Lazarus," aims to reduce the billions of dollars in lost crypto assets annually.',
  },
  {
    name: 'Modular Architecture',
    description: 'High-performance C++ core with modular blockchain architecture for scalability and flexibility.',
    icon: Network,
    color: 'from-teal-500 to-cyan-500',
    details: 'The DRP blockchain uses a modular architecture with a high-performance C++ core for consensus and networking. Modules can be independently updated, allowing for continuous improvement without disrupting the network. This architecture supports horizontal scaling, custom consensus mechanisms, and integration with other blockchain networks through standardized interfaces.',
  },
]

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const [showDetails, setShowDetails] = React.useState(false)

  return (
    <div
      className={`group relative bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-neutral-200 dark:border-neutral-700 animate-slide-up hover-lift ${`animate-stagger-${(index % 8) + 1}`}`}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
          <feature.icon className="h-6 w-6 text-white" />
        </div>
        <button
          onClick={(event) => {
            event.stopPropagation()
            setShowDetails((prev) => !prev)
          }}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          aria-label={`Show more details about ${feature.name}`}
          type="button"
        >
          <Info className="h-4 w-4" />
        </button>
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
        {feature.name}
      </h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-3">
        {feature.description}
      </p>

      {showDetails && (
        <div className="mt-4 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {feature.details}
          </p>
        </div>
      )}

      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  )
}

export function FeaturesSection() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
            Revolutionary Features
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
            DRP combines cutting-edge blockchain technology with AI verification to create a platform that truly serves humanity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={feature.name} feature={feature} index={index} />
          ))}
        </div>
        
        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl text-white font-semibold hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
            <span>Explore the Technology</span>
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
