'use client'

import Link from 'next/link'
import { ArrowRight, Globe, Shield, Sparkles, Activity, Coins, Package, Users, BarChart, Network } from 'lucide-react'
import { PremiumHero, PremiumSection } from '@/components/site/PremiumPage'

const economicsPages = [
  {
    href: '/economics/sre',
    title: 'Sustainable Rights Economy (SRE)',
    description: 'Rights-backed distribution, AI scoring, and SDG integration',
    icon: Shield,
    color: 'from-green-500 to-emerald-600',
  },
  {
    href: '/economics/abe',
    title: 'Activity-Based Economy (ABE)',
    description: 'Value = Verified Human Activity + Sustainable Contribution',
    icon: Activity,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    href: '/economics/tokenomics',
    title: 'DRP Dual Token Model',
    description: '$RIGHTS governance + $DeRi utility rewards',
    icon: Coins,
    color: 'from-purple-500 to-pink-600',
  },
  {
    href: '/economics/distribution',
    title: 'Sustainable Supply & Distribution',
    description: 'AI-driven fair allocation and quality goods network',
    icon: Package,
    color: 'from-orange-500 to-red-600',
  },
  {
    href: '/economics/governance',
    title: 'Human-Centric Governance',
    description: 'AI Elders, Proof of Status, and rights-backed decisions',
    icon: Users,
    color: 'from-indigo-500 to-blue-600',
  },
  {
    href: '/economics/global',
    title: 'Global Economic Impact',
    description: 'For governments, communities, businesses, and WEF stakeholders',
    icon: Globe,
    color: 'from-cyan-500 to-teal-600',
  },
  {
    href: '/economics/micro',
    title: 'Micro Economics',
    description: 'Individual incentives, agent behavior, and market mechanisms',
    icon: BarChart,
    color: 'from-violet-500 to-purple-600',
  },
  {
    href: '/economics/macro',
    title: 'Macro Economics',
    description: 'System-wide dynamics, monetary policy, and long-term stability',
    icon: Network,
    color: 'from-rose-500 to-pink-600',
  },
]

export default function EconomicsPage() {
  return (
    <>
      <PremiumHero
        badge="Economic Architecture"
        title="DRP Economics: Sustainable Rights Economy"
        description="A rights-centered system where verified contribution, sustainability, and transparent governance replace extraction economics."
      />

      <PremiumSection eyebrow="Framework" title="AI as Auditor, Not Ruler">
        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-red-300/25 bg-red-300/10 p-5">
            <h3 className="text-lg font-semibold text-red-100">Legacy Model</h3>
            <p className="mt-2 text-sm text-red-50/90">Opaque control, extraction incentives, centralized value capture.</p>
          </article>
          <article className="rounded-2xl border border-emerald-300/25 bg-emerald-300/10 p-5">
            <h3 className="text-lg font-semibold text-emerald-100">DRP Model</h3>
            <p className="mt-2 text-sm text-emerald-50/90">Transparent verification, rights alignment, distributed value creation.</p>
          </article>
        </div>
      </PremiumSection>

      <PremiumSection eyebrow="Core Pillars" title="What Powers the Economy">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Activity, title: 'Verified Activity', body: 'Contribution is measured through proofs, not speculation.' },
            { icon: Shield, title: 'Rights-Backed Distribution', body: 'Economic rails prioritize dignity and fairness.' },
            { icon: Sparkles, title: 'Sustainability Incentives', body: 'Environmental and social value are first-class metrics.' },
          ].map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/10 bg-black/25 p-5">
              <item.icon className="h-5 w-5 text-cyan-200" />
              <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{item.body}</p>
            </article>
          ))}
        </div>
      </PremiumSection>

      <PremiumSection eyebrow="Modules" title="Explore DRP Economics in Depth">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {economicsPages.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group block h-full rounded-2xl border border-white/10 bg-black/30 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-400/10"
            >
              <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${page.color}`}>
                <page.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">{page.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{page.description}</p>
              <div className="mt-4 flex items-center font-medium text-cyan-200">
                Open module
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </PremiumSection>

      <section className="pb-20 pt-8">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="rounded-3xl border border-cyan-300/20 bg-gradient-to-r from-cyan-300/15 via-blue-300/10 to-indigo-300/10 p-8 text-center">
            <h2 className="text-3xl font-semibold text-white">Go from Theory to Governance</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">
              Continue with whitepaper details or inspect ecosystem activity through explorer tooling.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/whitepaper" className="inline-flex items-center rounded-xl border border-cyan-300/40 bg-cyan-300/90 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">Read Whitepaper</Link>
              <Link href="/explorer" className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">Open Explorer</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

