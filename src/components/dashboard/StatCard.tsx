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
        'relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm transition hover:border-primary-200 hover:shadow-lg dark:border-neutral-800/80 dark:bg-neutral-900/60 dark:hover:border-primary-600/50',
        accent
      )}
    >
      {icon && <div className="mb-3 text-primary-600 dark:text-primary-300">{icon}</div>}
      <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">{value}</p>
      {trendLabel && <p className="mt-3 text-xs uppercase tracking-wide text-primary-600 dark:text-primary-300">{trendLabel}</p>}
    </div>
  )
}
