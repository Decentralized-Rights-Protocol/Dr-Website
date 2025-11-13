'use client'

import { useQuery } from '@tanstack/react-query'
import { Gift, Loader2 } from 'lucide-react'
import { apiRequest, type RewardSummary } from '@/lib/api'

interface RewardLog {
  id: string
  type: 'activity' | 'status' | 'boost'
  token: '$DeRi' | '$RIGHTS'
  amount: number
  createdAt: string
  txHash?: string
}

async function fetchRewardSummary() {
  const [{ data: summary }, { data: logs }] = await Promise.all([
    apiRequest<RewardSummary>({ path: '/rewards/summary' }),
    apiRequest<RewardLog[]>({ path: '/rewards/history' })
  ])
  return { summary, logs }
}

export function RewardHistory() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['rewards-history'],
    queryFn: fetchRewardSummary
  })

  if (isLoading) {
    return (
      <div className="flex min-h-[180px] items-center justify-center rounded-3xl border border-neutral-200/80 bg-white/80 dark:border-neutral-800/80 dark:bg-neutral-900/60">
        <Loader2 className="h-5 w-5 animate-spin text-primary-500" />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="rounded-3xl border border-red-200/70 bg-red-50/60 p-6 text-sm text-red-700 dark:border-red-600/70 dark:bg-red-900/30 dark:text-red-200">
        Unable to load rewards. Try refreshing or check your connection.
      </div>
    )
  }

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
        <header className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600 dark:bg-primary-500/15 dark:text-primary-200">
            <Gift className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Reward overview</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">Aggregated totals from verified stewardship.</p>
          </div>
        </header>

        <dl className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-primary-200/60 bg-primary-50/50 p-4 dark:border-primary-500/40 dark:bg-primary-900/30">
            <dt className="text-xs uppercase tracking-wide text-primary-700 dark:text-primary-200">$DeRi credits</dt>
            <dd className="mt-2 text-2xl font-semibold text-primary-800 dark:text-primary-100">{data.summary.deri.toLocaleString()}</dd>
          </div>
          <div className="rounded-2xl border border-purple-200/60 bg-purple-50/50 p-4 dark:border-purple-500/40 dark:bg-purple-900/30">
            <dt className="text-xs uppercase tracking-wide text-purple-700 dark:text-purple-200">$RIGHTS tokens</dt>
            <dd className="mt-2 text-2xl font-semibold text-purple-800 dark:text-purple-100">{data.summary.rights.toLocaleString()}</dd>
          </div>
          <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/50 p-4 dark:border-emerald-500/40 dark:bg-emerald-900/30">
            <dt className="text-xs uppercase tracking-wide text-emerald-700 dark:text-emerald-200">Sustainability boosts</dt>
            <dd className="mt-2 text-2xl font-semibold text-emerald-800 dark:text-emerald-100">{data.summary.boosts.toLocaleString()}</dd>
          </div>
        </dl>
      </div>

      <div className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
        <h4 className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">Recent reward transactions</h4>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200 text-sm dark:divide-neutral-800">
            <thead>
              <tr className="text-left">
                <th className="px-3 py-2 font-medium text-neutral-500 dark:text-neutral-400">Date</th>
                <th className="px-3 py-2 font-medium text-neutral-500 dark:text-neutral-400">Type</th>
                <th className="px-3 py-2 font-medium text-neutral-500 dark:text-neutral-400">Token</th>
                <th className="px-3 py-2 font-medium text-neutral-500 dark:text-neutral-400">Amount</th>
                <th className="px-3 py-2 font-medium text-neutral-500 dark:text-neutral-400">Tx hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {data.logs.map((log) => (
                <tr key={log.id}>
                  <td className="px-3 py-2 text-neutral-700 dark:text-neutral-200">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td className="px-3 py-2 capitalize text-neutral-600 dark:text-neutral-300">{log.type}</td>
                  <td className="px-3 py-2 text-neutral-700 dark:text-neutral-200">{log.token}</td>
                  <td className="px-3 py-2 text-neutral-900 dark:text-neutral-100">{log.amount}</td>
                  <td className="px-3 py-2 font-mono text-xs text-primary-600 dark:text-primary-300">
                    {log.txHash ? log.txHash.slice(0, 12) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
