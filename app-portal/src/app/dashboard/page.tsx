'use client'

import { Activity, Award, CheckCircle2, Leaf, Shield, Users2 } from 'lucide-react'
import { StatCard } from '@/components/dashboard/StatCard'
import { DashboardCharts } from '@/components/dashboard/DashboardCharts'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { RewardHistory } from '@/components/rewards/RewardHistory'
import { LeaderboardTable } from '@/components/leaderboard/LeaderboardTable'
import { WalletPanel } from '@/components/wallet/WalletPanel'
import { ElderAssistant } from '@/components/dashboard/ElderAssistant'

const dashboardStats = [
  {
    title: 'Proof of Activities verified',
    value: '284',
    trendLabel: '+32 this week',
    icon: <Activity className="h-5 w-5" />
  },
  {
    title: 'Proof of Status approvals',
    value: '12',
    trendLabel: '2 pending review',
    icon: <Shield className="h-5 w-5" />
  },
  {
    title: 'Rewards earned (30d)',
    value: '4,120 $DeRi',
    trendLabel: '+$RIGHTS 640 issued',
    icon: <Award className="h-5 w-5" />
  },
  {
    title: 'Community allies invited',
    value: '37',
    trendLabel: 'Invite 3 more for bonus boosts',
    icon: <Users2 className="h-5 w-5" />
  }
]

const verificationSchedule = [
  {
    label: 'Regional validator sync',
    value: 'Sept 12, 14:00 UTC',
    status: 'Scheduled'
  },
  {
    label: 'AI audit refresh',
    value: 'Daily, 02:00 UTC',
    status: 'Automated'
  },
  {
    label: 'Partner KYC window',
    value: 'Sept 21 – Sept 28',
    status: 'Open'
  }
]

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <header className="rounded-3xl border border-neutral-200/80 bg-white/90 p-8 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
        <p className="text-sm font-semibold text-primary-600 dark:text-primary-300">Rights Stewardship Console</p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">Your verification and rewards command center</h1>
            <p className="mt-2 max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
              Track Proof of Activities, monitor Proof of Status reviews, and coordinate incentives across your cooperative or organisation.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-300/60 bg-emerald-50/60 px-4 py-2 text-xs font-semibold text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-900/30 dark:text-emerald-200">
            Governance mode · Beta v0.7.0
          </div>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </section>

      <QuickActions />
      <DashboardCharts />

      <div className="grid gap-6 lg:grid-cols-[0.65fr_0.35fr]">
        <div className="space-y-6">
          <RewardHistory />
          <LeaderboardTable />
        </div>
        <div className="space-y-6">
          <WalletPanel />
          <section className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Verification cadence</h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-600 dark:text-neutral-300">
              {verificationSchedule.map((item) => (
                <li key={item.label} className="rounded-2xl border border-neutral-200/60 bg-neutral-50/70 p-4 dark:border-neutral-800/60 dark:bg-neutral-950/30">
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">{item.label}</p>
                  <p>{item.value}</p>
                  <span className="mt-1 inline-flex rounded-full bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-600 dark:bg-primary-500/20 dark:text-primary-200">
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
          </section>
          <ElderAssistant />
        </div>
      </div>

      <section className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Sustainability outlook</h3>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
          Sustainably verified actions earn additional boosts. Offset projections show a path to 50,000 tCO₂e reductions by year end.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-300/60 bg-emerald-50/70 p-4 text-sm text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-900/30 dark:text-emerald-200">
            <p className="font-semibold">Renewable commitments</p>
            <p className="mt-1 text-xs uppercase tracking-wide">42 partners pledged for 2025</p>
          </div>
          <div className="rounded-2xl border border-sky-300/60 bg-sky-50/70 p-4 text-sm text-sky-700 dark:border-sky-500/40 dark:bg-sky-900/30 dark:text-sky-200">
            <p className="font-semibold">Human rights clinics</p>
            <p className="mt-1 text-xs uppercase tracking-wide">11 clinics running PoAT workshops</p>
          </div>
        </div>
      </section>
    </div>
  )
}

