'use client'

import { Activity, Award, BookOpen, Shield } from 'lucide-react'
import { StatCard } from '@/components/dashboard/StatCard'
import { DashboardCharts } from '@/components/dashboard/DashboardCharts'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { RewardHistory } from '@/components/rewards/RewardHistory'
import { LeaderboardTable } from '@/components/leaderboard/LeaderboardTable'
import { WalletPanel } from '@/components/wallet/WalletPanel'
import { ElderAssistant } from '@/components/dashboard/ElderAssistant'
import { NotificationsPanel } from '@/components/dashboard/NotificationsPanel'
import { useWallet } from '@/hooks/useWallet'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

export default function DashboardPage() {
  const { address } = useWallet()
  const metrics = useQuery(api.metrics.getDashboardMetrics, { walletAddress: address })

  const dashboardStats = metrics ? [
    {
      title: 'Proof of Activities verified',
      value: `${metrics.cards.verifiedActivities}`,
      trendLabel: `${metrics.cards.proofsPending} proofs pending review`,
      icon: <Activity className="h-5 w-5" />
    },
    {
      title: 'Proof of Status approvals',
      value: `${metrics.cards.statusApprovals}`,
      trendLabel: `${metrics.cards.reviewBacklog} items in review backlog`,
      icon: <Shield className="h-5 w-5" />
    },
    {
      title: 'Rewards earned',
      value: `${metrics.cards.deriIssued} $DeRi`,
      trendLabel: `${metrics.cards.rightsIssued} weighted $RIGHTS governance weight`,
      icon: <Award className="h-5 w-5" />
    },
    {
      title: 'Blockchain Ledger',
      value: `${metrics.cards.blockchainBlocks} Blocks`,
      trendLabel: `${metrics.cards.totalTransactions} verified reality-layer transactions`,
      icon: <BookOpen className="h-5 w-5" />
    }
  ] : []

  return (
    <div className="space-y-10">
      <header className="rounded-3xl border border-neutral-200/80 bg-white/90 p-8 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
        <p className="text-sm font-semibold text-primary-600 dark:text-primary-300">Public-Interest Stewardship Console</p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">Your attestation, governance, and stewardship command center</h1>
            <p className="mt-2 max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
              Track activity attestations, status attestations, governance participation, and public-interest incentives across your cooperative or organisation.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-300/60 bg-emerald-50/60 px-4 py-2 text-xs font-semibold text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-900/30 dark:text-emerald-200">
            Governance mode · Beta v0.7.0
          </div>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {!metrics ? Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-32 animate-pulse rounded-3xl border border-neutral-200/80 bg-white/70 dark:border-neutral-800/80 dark:bg-neutral-900/40" />
        )) : dashboardStats.map((card) => (
          <StatCard key={card.title} {...card} />
        ))}
      </section>

      <QuickActions />
      {metrics ? <DashboardCharts activityHistory={metrics.activityHistory} rewardBreakdown={metrics.rewardBreakdown} /> : (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-80 animate-pulse rounded-3xl border border-neutral-200/80 bg-white/70 dark:border-neutral-800/80 dark:bg-neutral-900/40" />
          <div className="h-80 animate-pulse rounded-3xl border border-neutral-200/80 bg-white/70 dark:border-neutral-800/80 dark:bg-neutral-900/40" />
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[0.65fr_0.35fr]">
        <div className="space-y-6">
          <RewardHistory />
          <LeaderboardTable />
        </div>
        <div className="space-y-6">
          <WalletPanel />
          <NotificationsPanel walletAddress={address} />
          <ElderAssistant />
        </div>
      </div>

      <section className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Sustainability outlook</h3>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
          Public-interest stewardship should make climate and rights outcomes legible. These panels remain illustrative until protocol-side environmental attestations are mirrored into the app layer.
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
