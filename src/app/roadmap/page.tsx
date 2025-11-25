'use client'

import { Calendar, CheckCircle, Clock, Target } from 'lucide-react'
import { ParticleBackground } from '@/components/particle-background'

const roadmapItems = [
  {
    quarter: 'Q4 2025',
    title: 'Foundation Phase',
    status: 'completed',
    description: 'Core protocol development and initial testing',
    features: [
      'Core blockchain architecture design',
      'Quantum-safe cryptography implementation',
      'Initial consensus mechanism',
      'Basic smart contract framework',
      'Developer documentation v1.0',
    ],
    icon: CheckCircle,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    quarter: 'Q1 2026',
    title: 'Testnet Launch',
    status: 'completed',
    description: 'Public testnet launch and community feedback',
    features: [
      'Public testnet deployment',
      'Community testing program',
      'Bug fixes and optimizations',
      'Security audit phase 1',
      'Governance framework implementation',
    ],
    icon: CheckCircle,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    quarter: 'Q1 2026',
    title: 'Mainnet Preparation',
    status: 'current',
    description: 'Final preparations for mainnet launch',
    features: [
      'Security audit phase 2',
      'Performance optimizations',
      'Final testing and bug fixes',
      'Token distribution preparation',
      'Partnership announcements',
    ],
    icon: Clock,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    quarter: 'Q2 2026',
    title: 'Mainnet Launch',
    status: 'upcoming',
    description: 'Mainnet launch and initial partnerships',
    features: [
      'Mainnet deployment',
      'Token launch and distribution',
      'Initial validator onboarding',
      'First human rights organizations integration',
      'Community governance activation',
    ],
    icon: Target,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    quarter: 'Q2 2026',
    title: 'Ecosystem Growth',
    status: 'upcoming',
    description: 'Expanding the DRP ecosystem and partnerships',
    features: [
      'SDK releases for major languages',
      'Mobile application development',
      'Integration with major NGOs',
      'Advanced governance features',
      'Cross-chain interoperability',
    ],
    icon: Target,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    quarter: 'Q3 2026',
    title: 'Global Expansion',
    status: 'upcoming',
    description: 'Scaling globally and adding advanced features',
    features: [
      'Multi-language support',
      'Regional validator networks',
      'Advanced privacy features',
      'AI-powered verification tools',
      'International partnerships',
    ],
    icon: Target,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
  },
]

const upcomingFeatures = [
  {
    title: 'Mobile SDK',
    description: 'Native mobile SDKs for iOS and Android development',
    timeline: 'Q1 2026',
  },
  {
    title: 'Cross-Chain Bridge',
    description: 'Interoperability with other blockchain networks',
    timeline: 'Q1 2026',
  },
  {
    title: 'AI Verification',
    description: 'Machine learning-powered content verification',
    timeline: 'Q2 2026',
  },
  {
    title: 'Privacy Layer',
    description: 'Advanced zero-knowledge proof implementation',
    timeline: 'Q2 2026',
  },
]

export default function RoadmapPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-neutral-950 via-primary-950 to-neutral-950 overflow-hidden">
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
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl">
            Development Roadmap
          </h1>
          <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-400">
            Our journey to build the future of human rights protection through blockchain technology
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-neutral-200 dark:bg-neutral-700"></div>
          
          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <div key={item.quarter} className="relative flex items-start">
                {/* Timeline dot */}
                <div className={`absolute left-4 top-6 w-3 h-3 rounded-full ${item.bgColor} border-2 border-white dark:border-neutral-900 flex items-center justify-center`}>
                  <item.icon className={`w-2 h-2 ${item.color}`} />
                </div>
                
                {/* Content */}
                <div className="ml-12 flex-1">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${item.bgColor} ${item.color}`}>
                    <Calendar className="w-4 h-4 mr-2" />
                    {item.quarter}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                    {item.description}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <div className={`w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0 ${item.color.replace('text-', 'bg-')}`}></div>
                        <span className="text-sm text-neutral-600 dark:text-neutral-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Features */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Upcoming Features
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400">
              Exciting features and improvements coming to the DRP ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingFeatures.map((feature, index) => (
              <div key={index} className="rounded-2xl bg-white dark:bg-neutral-900 p-8 shadow-sm ring-1 ring-neutral-200 dark:ring-neutral-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-200">
                    {feature.timeline}
                  </span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Community Involvement */}
        <div className="mt-24 p-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Help Shape Our Future</h2>
            <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
              Our roadmap is community-driven. Join our Discord to suggest features, 
              vote on priorities, and help us build the future of human rights protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://discord.gg/k8auUAqF"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors"
              >
                Join Discord
              </a>
              <a
                href="https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors"
              >
                Contribute on GitHub
              </a>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}