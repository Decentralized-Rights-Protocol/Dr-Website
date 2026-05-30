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

  const stats = [
    { title: 'Activity Score', value: metrics?.cards?.verifiedActivities?.toFixed(1) ?? '—', icon: <Activity className="w-10 h-10" />, accent: '#00e5cc' },
    { title: 'Rights Status', value: 'UNVERIFIED', icon: <Shield className="w-10 h-10" />, accent: '#00bfff' },
    { title: 'Lessons Done', value: String(metrics?.cards?.activeLearners ?? 0), icon: <BookOpen className="w-10 h-10" />, accent: '#a855f7' },
    { title: '$DeRi Earned', value: metrics?.cards?.deriIssued?.toLocaleString() ?? '0', icon: <Award className="w-10 h-10" />, accent: '#ffd700' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-white/40">Your DRP activity overview</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => <StatCard key={s.title} {...s} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DashboardCharts metrics={metrics} />
          <QuickActions />
        </div>
        <div className="space-y-6">
          <NotificationsPanel walletAddress={normalizedAddress ?? null} />
          <ElderAssistant />
        </div>
      </div>
    </div>
  )
}
