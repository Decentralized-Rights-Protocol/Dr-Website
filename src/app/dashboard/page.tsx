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
import { api } from '@/convex/_generated/api'

export default function DashboardPage() {
  const { address } = useWallet()
  const normalizedAddress = address?.toLowerCase()
  const metrics = useQuery(api.metrics.getDashboardMetrics, { walletAddress: normalizedAddress ?? null })

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
    <div className="space-y-12">
      <header className="relative rounded-[2.5rem] border border-white/5 bg-black/60 p-12 backdrop-blur-xl overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Shield className="w-64 h-64 text-drp-cyan" />
        </div>
        <div className="relative z-10">
          <p className="text-xs font-cinematic text-drp-cyan mb-4 tracking-[0.4em]">Command Center v0.9.0</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white max-w-4xl leading-tight">
            Governance & Stewardship Dashboard
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-drp-gray leading-relaxed">
            Monitor activity attestations, manage status, and participate in the decentralized governance of the protocol.
          </p>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {!metrics ? Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-48 animate-pulse rounded-[2rem] border border-white/5 bg-white/5" />
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

      <section className="rounded-[2rem] border border-white/5 bg-black/40 p-10 backdrop-blur-md">
        <h3 className="text-xl font-bold text-white mb-4">Sustainability Outlook</h3>
        <p className="text-drp-gray leading-relaxed max-w-3xl mb-8">
          Monitoring environmental and social impact. These metrics are verified through protocol-side attestations mirrored into the DRP reality layer.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.5rem] border border-emerald-500/10 bg-emerald-500/5 p-6 transition-all hover:bg-emerald-500/10">
            <p className="text-sm font-cinematic text-emerald-400 mb-2">Renewable Commitments</p>
            <p className="text-3xl font-bold text-white">42 Active Partners</p>
          </div>
          <div className="rounded-[1.5rem] border border-drp-cyan/10 bg-drp-cyan/5 p-6 transition-all hover:bg-drp-cyan/10">
            <p className="text-sm font-cinematic text-drp-cyan mb-2">Human Rights Clinics</p>
            <p className="text-3xl font-bold text-white">11 Active Workshops</p>
          </div>
        </div>
      </section>
    </div>
  )
}
