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
    <div className="relative overflow-hidden bg-background">
      {/* Layered gradient backdrop that adapts to theme */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 dark:from-primary/20 dark:via-accent/20 dark:to-secondary/20" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full blur-3xl animate-pulse bg-primary/20" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full blur-3xl animate-pulse delay-1000 bg-accent/20" />
        <div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full blur-2xl animate-bounce delay-500 bg-primary/10" />
        <div className="absolute bottom-1/4 right-1/4 h-24 w-24 rounded-full blur-xl animate-pulse delay-700 bg-secondary/15" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="animate-fade-in-up text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Decentralized Rights Protocol
            <span className="animate-gradient-x block bg-gradient-to-r from-primary/70 via-accent/70 to-secondary/70 bg-clip-text text-transparent">
              Quantum-Safe Blockchain for Human Rights
            </span>
          </h1>
          <div className="animate-fade-in-up mt-6 space-y-3 text-lg leading-8 text-foreground/70 delay-200">
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
              className="group transform rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <span className="flex items-center gap-2">
                Read Whitepaper
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              href="/docs"
              className="group text-sm font-semibold leading-6 text-foreground hover:text-foreground/80 transition-colors duration-300"
            >
              View Documentation <span className="group-hover:translate-x-1 transition-transform inline-block" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        
        {/* Enhanced Features Grid - Glassmorphism Cards */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={feature.title} className="group relative animate-fade-in-up rounded-2xl border border-border bg-card p-6 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-primary" style={{ animationDelay: `${400 + index * 100}ms` }}>
                <dt className="mb-3 flex items-center gap-x-3 text-base font-semibold leading-7 text-card-foreground">
                  <div className="rounded-xl p-3 bg-accent/20 group-hover:bg-accent/30 group-hover:shadow-lg transition-all duration-300">
                    <feature.icon className="h-6 w-6 flex-none text-primary transition-all duration-300 group-hover:scale-110" aria-hidden="true" />
                  </div>
                  {feature.title}
                </dt>
                <dd className="flex flex-auto flex-col text-sm leading-6 text-foreground/70">
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

