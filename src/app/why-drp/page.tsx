'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowRight, BarChart3, Table, Star, Shield, Zap, Users, Globe, Brain, Leaf } from 'lucide-react'
import { ComparisonTable } from '@/components/ComparisonTable'
import { ComparisonChart } from '@/components/ComparisonChart'
import { cn } from '@/lib/utils'
import { PremiumPage, PremiumHero, PremiumSection } from '@/components/site/PremiumPage'

const drpAdvantages = [
  {
    icon: Brain,
    title: 'AI-First Architecture',
    description: 'Built with artificial intelligence at its core, not as an afterthought',
    color: 'text-purple-500'
  },
  {
    icon: Shield,
    title: 'Quantum-Safe Security',
    description: 'Post-quantum cryptography protecting against future threats',
    color: 'text-blue-500'
  },
  {
    icon: Leaf,
    title: 'Ultra-Low Energy',
    description: 'AI-optimized consensus reducing energy consumption by 99%',
    color: 'text-green-500'
  },
  {
    icon: Users,
    title: 'Human Rights Focus',
    description: 'Designed specifically to protect and advance human rights globally',
    color: 'text-pink-500'
  },
  {
    icon: Globe,
    title: 'Global Interoperability',
    description: 'AI-automated cross-chain communication with any blockchain',
    color: 'text-cyan-500'
  },
  {
    icon: Zap,
    title: 'Adaptive Performance',
    description: 'Dynamic TPS scaling based on network demand and AI optimization',
    color: 'text-yellow-500'
  }
]

export default function WhyDRPPage() {
  const [viewMode, setViewMode] = React.useState<'table' | 'chart'>('table')

  return (
    <PremiumPage>
      <PremiumHero
        badge="Why DRP"
        title="A New Standard for Trust, Fairness, and Sustainability"
        description="DRP blends AI verification, rights-centered governance, and long-term security into one coherent protocol stack."
      />

      <PremiumSection eyebrow="Protocol Edge" title="What Makes DRP Structurally Different">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {drpAdvantages.map((advantage) => (
            <div
              key={advantage.title}
              className="group rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-xl"
            >
              <div className="mb-4 flex items-center gap-x-4">
                <div className={cn(
                  'rounded-lg bg-gradient-to-br from-white/20 to-white/10 p-3 transition-transform duration-300 group-hover:scale-110',
                  advantage.color
                )}>
                  <advantage.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">{advantage.title}</h3>
              </div>
              <p className="text-neutral-300">{advantage.description}</p>
            </div>
          ))}
        </div>
      </PremiumSection>

      <PremiumSection
        eyebrow="Benchmarking"
        title="DRP vs Traditional Blockchain Architectures"
        description="Switch between table and chart views to compare critical performance and mission-alignment metrics."
      >
        <div className="mb-8 flex justify-center">
          <div className="rounded-lg border border-white/20 bg-white/10 p-1 backdrop-blur-sm">
            <button
              onClick={() => setViewMode('table')}
              className={cn(
                'flex items-center gap-x-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200',
                viewMode === 'table' ? 'bg-cyan-400 text-slate-900 shadow-sm' : 'text-gray-300 hover:text-white'
              )}
            >
              <Table className="h-4 w-4" />
              Table View
            </button>
            <button
              onClick={() => setViewMode('chart')}
              className={cn(
                'flex items-center gap-x-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200',
                viewMode === 'chart' ? 'bg-cyan-400 text-slate-900 shadow-sm' : 'text-gray-300 hover:text-white'
              )}
            >
              <BarChart3 className="h-4 w-4" />
              Chart View
            </button>
          </div>
        </div>
        <div className="rounded-xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
          {viewMode === 'table' ? <ComparisonTable /> : <ComparisonChart />}
        </div>
      </PremiumSection>

      <section className="pb-20 pt-8">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="rounded-3xl border border-cyan-300/20 bg-gradient-to-r from-cyan-300/15 via-blue-300/10 to-amber-300/10 p-8 text-center">
            <h2 className="text-3xl font-semibold text-white">Ready to Build on the Future Stack?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Dive into the whitepaper and learning modules to understand DRP from architecture to implementation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/whitepaper"
                className="group inline-flex items-center gap-x-2 rounded-xl border border-cyan-300/40 bg-cyan-300/90 px-8 py-4 font-semibold text-slate-900 transition hover:bg-cyan-200"
              >
                Read Whitepaper
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/learn"
                className="inline-flex items-center gap-x-2 rounded-xl border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white transition hover:bg-white/20"
              >
                Start Learning
                <Star className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PremiumPage>
  )
}
