'use client'

import Link from 'next/link'
import { FileText, BookOpen, Map, Users, ArrowRight } from 'lucide-react'
import { ParticleBackground } from '@/components/particle-background'

const links = [
  {
    name: 'Whitepaper',
    description: 'Read our comprehensive technical whitepaper',
    href: '/whitepaper',
    icon: FileText,
    color: 'bg-primary-600',
  },
  {
    name: 'Documentation',
    description: 'Developer guides and API references',
    href: '/docs',
    icon: BookOpen,
    color: 'bg-secondary-600',
  },
  {
    name: 'Roadmap',
    description: 'Our development timeline and milestones',
    href: '/roadmap',
    icon: Map,
    color: 'bg-accent-600',
  },
  {
    name: 'Community',
    description: 'Join our global community of advocates',
    href: '/community',
    icon: Users,
    color: 'bg-primary-600',
  },
]

export function QuickLinks() {
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-br from-neutral-950 via-primary-950 to-neutral-950 overflow-hidden">
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
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl animate-fade-in-up">
            Get Started with DRP
          </h2>
          <p className="mt-4 text-lg leading-8 text-neutral-300 animate-fade-in-up delay-200">
            Explore our resources and join the movement to protect human rights through technology.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {links.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 hover:bg-white/20 hover:border-white/30 hover:scale-105 transition-all duration-300 animate-fade-in-up shadow-lg hover:shadow-xl"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <div className="flex items-center gap-x-4">
                <div className={`${link.color} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                  <link.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white group-hover:text-primary-300 transition-colors">
                    {link.name}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-300">
                    {link.description}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-primary-300 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

