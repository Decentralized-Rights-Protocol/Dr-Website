import Link from 'next/link'
import { ArrowRight, Download, Shield, Users, Globe, Zap } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Quantum-Safe Security',
    description: 'Advanced cryptography protecting human rights data from future threats',
  },
  {
    icon: Users,
    title: 'Community Governance',
    description: 'Decentralized decision-making ensuring protocol serves global needs',
  },
  {
    icon: Globe,
    title: 'Global Impact',
    description: 'Cross-border solutions working across cultures and legal systems',
  },
  {
    icon: Zap,
    title: 'Real-time Verification',
    description: 'Instant verification and documentation of human rights violations',
  },
]

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-secondary-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Protecting Human Rights
            <span className="block bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent">
              Through Blockchain
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-neutral-300">
            The Decentralized Rights Protocol (DRP) is building a quantum-safe, transparent platform 
            to protect, verify, and advance human rights globally using cutting-edge blockchain technology.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/whitepaper"
              className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-primary-600 shadow-sm hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
            >
              Read Whitepaper
            </Link>
            <Link
              href="/docs"
              className="text-sm font-semibold leading-6 text-white hover:text-neutral-300 transition-colors"
            >
              View Documentation <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <feature.icon className="h-5 w-5 flex-none text-secondary-400" aria-hidden="true" />
                  {feature.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-300">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
