'use client'

import { Shield, Eye, Heart, Users } from 'lucide-react'
import { ParticleBackground } from '@/components/particle-background'

const values = [
  {
    name: 'Transparency',
    description: 'Open-source technology and transparent governance processes that anyone can verify and participate in.',
    icon: Eye,
  },
  {
    name: 'Security',
    description: 'Quantum-safe cryptography and robust security measures to protect sensitive human rights data.',
    icon: Shield,
  },
  {
    name: 'Humanity',
    description: 'Every decision is guided by our commitment to protecting and advancing human rights globally.',
    icon: Heart,
  },
  {
    name: 'Community',
    description: 'Decentralized governance ensuring that the protocol serves the needs of human rights defenders worldwide.',
    icon: Users,
  },
]

export function MissionSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #312e81, #581c87)' }}>
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
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl animate-fade-in-up">
            Our Mission
          </h2>
          <p className="mt-4 text-lg leading-8 text-neutral-300 animate-fade-in-up delay-200">
            To create a decentralized, transparent, and secure platform that protects, 
            verifies, and advances human rights globally through blockchain technology.
          </p>
        </div>
        <dl className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <div 
              key={value.name} 
              className="flex flex-col animate-fade-in-up group hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white group-hover:text-primary-400 transition-colors">
                <value.icon className="h-5 w-5 flex-none text-primary-400 group-hover:text-primary-300 transition-colors" aria-hidden="true" />
                {value.name}
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-neutral-300 group-hover:text-neutral-200 transition-colors">
                <p className="flex-auto">{value.description}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

