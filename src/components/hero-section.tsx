import Link from 'next/link'
import { ArrowRight, Download, Shield, Users, Globe, Zap } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'AI-Powered Governance',
    description: 'Ethical AI models govern protocol decisions with bias detection and transparent decision-making',
  },
  {
    icon: Users,
    title: 'Zero-Trust Security',
    description: 'Post-quantum cryptography with multi-party computation and privacy-preserving verification',
  },
  {
    icon: Globe,
    title: 'SDG Integration',
    description: 'Education credentialing, sustainable agriculture, renewable energy, and healthcare verification',
  },
  {
    icon: Zap,
    title: 'Dual-Token Economy',
    description: '$RIGHTS for governance and $DeRi for transactions with sustainable reward mechanisms',
  },
]

export function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-secondary-900">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] animate-pulse" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 animate-fade-in-up">
            <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white border border-white/20 hover:bg-white/20 transition-all duration-300">
              🚀 DRP v0.6 - Now Live
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl animate-fade-in-up delay-200">
            Decentralized Rights Protocol
            <span className="block bg-gradient-to-r from-secondary-400 to-accent-400 bg-clip-text text-transparent animate-gradient-x">
              AI-Powered Blockchain
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-neutral-300 animate-fade-in-up delay-300">
            Next-generation blockchain combining AI-verified consensus, IoT sensor validation, and dual-token economics 
            to accelerate UN Sustainable Development Goals while protecting human rights through decentralized governance.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-in-up delay-400">
            <Link
              href="/explorer"
              className="group rounded-md bg-white px-6 py-3 text-sm font-semibold text-primary-600 shadow-lg hover:bg-neutral-50 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 transform hover:scale-105"
            >
              <span className="flex items-center gap-2">
                Explore Blockchain
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              href="/learn"
              className="group text-sm font-semibold leading-6 text-white hover:text-neutral-300 transition-colors duration-300"
            >
              Learn & Earn <span className="group-hover:translate-x-1 transition-transform inline-block" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        
        {/* Enhanced Features Grid */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={feature.title} className="group flex flex-col animate-fade-in-up" style={{ animationDelay: `${500 + index * 100}ms` }}>
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white group-hover:text-secondary-300 transition-colors duration-300">
                  <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors duration-300">
                    <feature.icon className="h-5 w-5 flex-none text-secondary-400 group-hover:text-secondary-300 transition-colors duration-300" aria-hidden="true" />
                  </div>
                  {feature.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-300 group-hover:text-neutral-200 transition-colors duration-300">
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

