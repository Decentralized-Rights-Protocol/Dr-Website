import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  trendLabel?: string
  icon?: ReactNode
  accent?: string
}

export function StatCard({ title, value, trendLabel, icon, accent }: StatCardProps) {
  return (
    <div
      className={cn(
        'relative group overflow-hidden rounded-[2rem] border border-white/5 bg-black/40 p-8 backdrop-blur-md transition-all hover:border-white/10 hover:bg-black/60',
        accent
      )}
    >
      <div className="absolute top-0 right-0 p-6 opacity-10 transition-opacity group-hover:opacity-20">
        {icon}
      </div>
      <div className="relative z-10">
        <p className="text-xs font-cinematic text-drp-gray opacity-60 mb-2">{title}</p>
        <p className="text-4xl font-bold tracking-tight text-white mb-4">{value}</p>
        {trendLabel && (
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-drp-cyan opacity-80">
            {trendLabel}
          </p>
        )}
      </div>
    </div>
  )
}
