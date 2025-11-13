'use client'

import { ShieldCheck, Users2, Leaf, Zap } from 'lucide-react'
import { StatCard } from '@/components/dashboard/StatCard'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { DashboardCharts } from '@/components/dashboard/DashboardCharts'
import { ElderAssistant } from '@/components/dashboard/ElderAssistant'
import { BadgeShareCard } from '@/components/community/BadgeShareCard'

const statCards = [
  {
    title: 'Verified activities',
    value: '182,441',
    trendLabel: '+12% vs last month',
    icon: <Zap className="h-5 w-5" />
  },
  {
    title: 'Status verified citizens',
    value: '38,204',
    trendLabel: '82 pending review',
    icon: <ShieldCheck className="h-5 w-5" />
  },
  {
    title: 'Carbon relief impact',
    value: '24,900 tCO₂e',
    trendLabel: 'Projected 2025 target: 40k',
    icon: <Leaf className="h-5 w-5" />
  },
  {
    title: 'Community allies',
    value: '62 partners',
    trendLabel: 'Recently onboarded: 4',
    icon: <Users2 className="h-5 w-5" />
  }
]

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-neutral-200/80 bg-white/90 p-10 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
        <p className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-4 py-1 text-sm font-medium text-primary-700 dark:text-primary-200">
          <span className="h-2 w-2 rounded-full bg-primary-500" />
          Unified verification. Adaptive privacy.
        </p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="text-4xl font-bold leading-tight text-neutral-900 dark:text-neutral-50">
              Steward digital rights with Proof of Activities and Proof of Status
            </h1>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300">
              Submit verifiable impact, earn $DeRi & $RIGHTS, and collaborate with trusted partners through a privacy-first dashboard.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="/proofs/activities"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Submit proof now
              </a>
              <a
                href="/wallet"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                Connect wallet
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-neutral-200/70 bg-gradient-to-br from-primary-500/10 via-white to-neutral-50/80 p-6 dark:border-neutral-800/60 dark:from-primary-500/15 dark:via-neutral-900/60 dark:to-neutral-950">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Proof cycle snapshot
            </h2>
            <dl className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3 shadow-sm dark:bg-neutral-950/40">
                <dt className="text-sm text-neutral-500 dark:text-neutral-400">Avg. verification time</dt>
                <dd className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">2m 41s</dd>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3 shadow-sm dark:bg-neutral-950/40">
                <dt className="text-sm text-neutral-500 dark:text-neutral-400">AI authenticity confidence</dt>
                <dd className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">98.4%</dd>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3 shadow-sm dark:bg-neutral-950/40">
                <dt className="text-sm text-neutral-500 dark:text-neutral-400">Weekly rights minted</dt>
                <dd className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">4,320 $RIGHTS</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </section>

      <QuickActions />
      <DashboardCharts />

      <div className="grid gap-6 lg:grid-cols-[0.6fr_0.4fr]">
        <BadgeShareCard
          badgeTitle="Impact Steward – Level 3"
          description="Share your verified contributions and inspire your network to join the DRP ecosystem."
          shareUrl="https://app.decentralizedrights.com/badges/impact-steward"
        />
        <ElderAssistant />
      </div>
    </div>
  )
}

