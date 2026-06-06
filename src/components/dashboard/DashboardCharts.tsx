'use client'

import { ResponsiveContainer, AreaChart, Area, CartesianGrid, Tooltip, XAxis, BarChart, Bar } from 'recharts'

interface DashboardChartsProps {
  metrics?: {
    activityHistory: Array<{ month: string; activities: number; rewards: number }>
    rewardBreakdown: Array<{ label: string; amount: number }>
  }
}

export function DashboardCharts({ metrics }: DashboardChartsProps) {
  const activityHistory = metrics?.activityHistory ?? []
  const rewardBreakdown = metrics?.rewardBreakdown ?? []

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-[2rem] border border-foreground/5 bg-black/40 p-10 backdrop-blur-md">
        <p className="text-[10px] font-cinematic text-drp-cyan opacity-60 mb-2">Protocol Velocity</p>
        <h3 className="text-xl font-bold text-foreground mb-6">Activity Timeline</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer>
            <AreaChart data={activityHistory}>
              <defs>
                <linearGradient id="colorActivities" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--drp-cyan)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--drp-cyan)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
              <XAxis dataKey="month" stroke="rgba(255, 255, 255, 0.3)" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem' }}
                itemStyle={{ color: 'var(--drp-cyan)' }}
              />
              <Area type="monotone" dataKey="activities" stroke="var(--drp-cyan)" fill="url(#colorActivities)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-[2rem] border border-foreground/5 bg-black/40 p-10 backdrop-blur-md">
        <p className="text-[10px] font-cinematic text-drp-purple opacity-60 mb-2">Asset Distribution</p>
        <h3 className="text-xl font-bold text-foreground mb-6">Reward Composition</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer>
            <BarChart data={rewardBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" vertical={false} />
              <XAxis dataKey="label" stroke="rgba(255, 255, 255, 0.3)" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '1rem' }}
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              />
              <Bar dataKey="amount" radius={[8, 8, 0, 0]} fill="var(--drp-blue)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
