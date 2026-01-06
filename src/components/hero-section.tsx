import Link from 'next/link'
import { ArrowRight, Download, Shield, Users, Globe, Zap } from 'lucide-react'
import { ParticleBackground } from '@/components/particle-background'

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
    <div className="relative overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #312e81, #581c87)' }}>
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-bounce delay-500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-400/15 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl animate-fade-in-up">
            Decentralized Rights Protocol
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-gradient-x">
              Quantum-Safe Blockchain for Human Rights
            </span>
          </h1>
          <div className="mt-6 text-lg leading-8 text-neutral-300 animate-fade-in-up delay-200 space-y-3">
            <p className="font-medium">
              Decentralized Rights Protocol (DRP) is a quantum-safe blockchain platform that protects human rights through AI-verified consensus mechanisms. DRP uses Proof of Status (PoST) for identity verification and Proof of Activity (PoAT) to reward real-world contributions, creating a sustainable, human-rights-centered blockchain ecosystem.
            </p>
            <p>
              Built with NIST-approved post-quantum cryptography (CRYSTALS-Kyber and CRYSTALS-Dilithium), DRP ensures long-term security against quantum computing threats while prioritizing human dignity, environmental responsibility, and transparent governance.
            </p>
          </div>
          <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-in-up delay-300">
            <Link
              href="/whitepaper"
              className="group rounded-md bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-lg hover:bg-neutral-50 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center gap-2">
                Read Whitepaper
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              href="/docs"
              className="group text-sm font-semibold leading-6 text-white hover:text-neutral-300 transition-colors duration-300"
            >
              View Documentation <span className="group-hover:translate-x-1 transition-transform inline-block" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        
        {/* Enhanced Features Grid - Glassmorphism Cards */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={feature.title} className="group relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 hover:border-white/30 animate-fade-in-up" style={{ animationDelay: `${400 + index * 100}ms` }}>
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white mb-3">
                  <div className="p-3 rounded-xl bg-white/10 group-hover:bg-white/20 group-hover:shadow-lg transition-all duration-300">
                    <feature.icon className="h-6 w-6 flex-none text-blue-400 group-hover:text-purple-400 group-hover:scale-110 transition-all duration-300" aria-hidden="true" />
                  </div>
                  {feature.title}
                </dt>
                <dd className="flex flex-auto flex-col text-sm leading-6 text-neutral-300">
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

