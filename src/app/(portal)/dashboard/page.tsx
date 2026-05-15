'use client'

import { Activity, Award, BookOpen, Shield } from 'lucide-react'
import { StatCard } from '@/components/dashboard/StatCard'
import { DashboardCharts } from '@/components/dashboard/DashboardCharts'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { NotificationsPanel } from '@/components/dashboard/NotificationsPanel'
import { ElderAssistant } from '@/components/dashboard/ElderAssistant'
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
      trendLabel: '+12.5% vs last month',
      icon: <Activity className="h-5 w-5" />
    },
    {
      title: 'Total $DeRi issued',
      value: `${metrics.cards.deriIssued.toLocaleString()}`,
      trendLabel: '+3,420 today',
      icon: <Shield className="h-5 w-5" />
    },
    {
      title: 'Total $RIGHTS issued',
      value: `${metrics.cards.rightsIssued.toLocaleString()}`,
      trendLabel: 'Governance weight active',
      icon: <Award className="h-5 w-5" />
    },
    {
      title: 'Verified Learning modules',
      value: `${metrics.cards.activeLearners}`,
      trendLabel: '3 pending review',
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

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <DashboardCharts metrics={metrics} />
          <QuickActions />
        </div>
        <div className="space-y-8">
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
