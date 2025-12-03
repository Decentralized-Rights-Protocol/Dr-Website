'use client'

import Link from 'next/link'
import { BookOpen, Code, Zap, Users, ArrowRight } from 'lucide-react'
import { ParticleBackground } from '@/components/particle-background'

const docSections = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of DRP and set up your development environment',
    href: '/docs/getting-started',
    icon: BookOpen,
    color: 'bg-primary-600',
    topics: ['Python 3.10+ Setup', 'Testnet Node', 'Basic P2P Networking', 'First Steps'],
  },
  {
    title: 'Consensus & AI',
    description: 'Understand Proof of Status, Proof of Activities, and AI verification',
    href: '/docs/consensus',
    icon: Code,
    color: 'bg-secondary-600',
    topics: ['Proof of Status (PoS)', 'Proof of Activities (PoA)', 'AI Elders', 'Verification System'],
  },
  {
    title: 'Post-Quantum Security',
    description: 'Quantum-resistant cryptography and security features',
    href: '/docs/security',
    icon: Zap,
    color: 'bg-accent-600',
    topics: ['CRYSTALS-Kyber', 'CRYSTALS-Dilithium', 'Key Management', 'Quantum Resistance'],
  },
  {
    title: 'Repository Structure',
    description: 'Explore the Dr-Blockchain codebase and modules',
    href: '/docs/repository',
    icon: Code,
    color: 'bg-primary-600',
    topics: ['Source Code', 'Tests', 'Examples', 'Scripts'],
  },
  {
    title: 'Examples & Demos',
    description: 'Practical examples and post-quantum security demos',
    href: '/docs/examples',
    icon: BookOpen,
    color: 'bg-secondary-600',
    topics: ['Post-Quantum Demo', 'Testnet Examples', 'AI Verification', 'Best Practices'],
  },
  {
    title: 'Community',
    description: 'Join the developer community and contribute to DRP',
    href: '/docs/community',
    icon: Users,
    color: 'bg-accent-600',
    topics: ['Contributing', 'Discord', 'GitHub', 'Research'],
  },
]

export default function DocsPage() {
  return (
    <div className="relative min-h-screen style={{ background: "linear-gradient(to bottom right, #1e3a8a, #312e81, #581c87)" }} overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl animate-bounce delay-500"></div>
      </div>
      
      <div className="relative z-10 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl animate-fade-in-up">
            DRP Documentation
          </h1>
          <p className="mt-4 text-xl text-neutral-300 animate-fade-in-up delay-200">
            Everything you need to build with the Decentralized Rights Protocol
          </p>
        </div>

        {/* Quick Start */}
        <div className="mb-16 p-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl text-white">
          <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
          <p className="text-primary-100 mb-6">
            Get up and running with DRP in minutes. Clone the repository and start building on our testnet.
          </p>
          <div className="bg-neutral-900/50 p-4 rounded-lg font-mono text-sm mb-6">
            <div className="text-neutral-400"># Clone the DRP Blockchain repository</div>
            <div className="text-green-400">git clone https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain.git</div>
            <div className="text-neutral-400 mt-2"># Install dependencies</div>
            <div className="text-green-400">pip install -r requirements.txt</div>
            <div className="text-neutral-400 mt-2"># Run the testnet node</div>
            <div className="text-blue-400">python src/node.py</div>
          </div>
          <Link
            href="/docs/getting-started"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {docSections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="group relative rounded-2xl bg-white dark:bg-neutral-900 p-8 shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-700 hover:ring-primary-600 dark:hover:ring-primary-400 transition-all duration-200 hover:shadow-lg"
            >
              <div className="flex items-center gap-x-4 mb-4">
                <div className={`${section.color} p-3 rounded-lg`}>
                  <section.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {section.title}
                </h3>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                {section.description}
              </p>
              <div className="space-y-1">
                {section.topics.map((topic) => (
                  <div key={topic} className="text-sm text-neutral-500 dark:text-neutral-500">
                    • {topic}
                  </div>
                ))}
              </div>
              <ArrowRight className="absolute top-8 right-8 h-5 w-5 text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
            </Link>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-neutral-50 dark:bg-neutral-800 p-8">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
              Need Help?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Our community is here to help you succeed. Join our Discord server or check out our FAQ.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/community"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                Join Discord
              </Link>
              <Link
                href="/docs/faq"
                className="inline-flex items-center px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-sm font-medium rounded-md text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                View FAQ
              </Link>
            </div>
          </div>

          <div className="rounded-2xl bg-neutral-50 dark:bg-neutral-800 p-8">
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">
              Contribute
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Help improve our documentation and make DRP more accessible to developers worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 transition-colors"
              >
                Edit on GitHub
              </Link>
              <Link
                href="/docs/contributing"
                className="inline-flex items-center px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-sm font-medium rounded-md text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 transition-colors"
              >
                Contributing Guide
              </Link>
              <Link
                href="/docs/faq"
                className="inline-flex items-center px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-sm font-medium rounded-md text-neutral-700 dark:text-neutral-300 bg-white dark:bg-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 transition-colors"
              >
                View FAQ
              </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
