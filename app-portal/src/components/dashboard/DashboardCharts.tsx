'use client'

import { ResponsiveContainer, AreaChart, Area, CartesianGrid, Tooltip, XAxis, BarChart, Bar } from 'recharts'

const activityHistory = [
  { month: 'Jan', activities: 8, rewards: 120 },
  { month: 'Feb', activities: 12, rewards: 180 },
  { month: 'Mar', activities: 10, rewards: 160 },
  { month: 'Apr', activities: 16, rewards: 240 },
  { month: 'May', activities: 21, rewards: 300 }
]

const rewardBreakdown = [
  { label: '$DeRi', amount: 420 },
  { label: '$RIGHTS', amount: 160 },
  { label: 'Boosts', amount: 90 }
]

export function DashboardCharts() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Activity velocity</h3>
        <p className="mb-4 text-sm text-neutral-500 dark:text-neutral-400">
          Track your verified Proof of Activities alongside monthly reward issuance.
        </p>
        <div className="h-64 w-full">
          <ResponsiveContainer>
            <AreaChart data={activityHistory}>
              <defs>
                <linearGradient id="colorActivities" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.25)" />
              <XAxis dataKey="month" stroke="currentColor" opacity={0.6} />
              <Tooltip cursor={{ stroke: '#2563EB', strokeWidth: 1 }} />
              <Area type="monotone" dataKey="activities" stroke="#2563EB" fill="url(#colorActivities)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Reward composition</h3>
        <p className="mb-4 text-sm text-neutral-500 dark:text-neutral-400">
          Understand how your verified efforts translated into DeRi utility credits, RIGHTS governance weight, and sustainability boosts.
        </p>
        <div className="h-64 w-full">
          <ResponsiveContainer>
            <BarChart data={rewardBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.25)" />
              <XAxis dataKey="label" stroke="currentColor" opacity={0.6} />
              <Tooltip cursor={{ fill: 'rgba(37, 99, 235, 0.08)' }} />
              <Bar dataKey="amount" radius={[12, 12, 0, 0]} fill="#7C3AED" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
