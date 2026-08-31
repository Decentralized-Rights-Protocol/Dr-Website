'use client'

import { useQuery } from '@tanstack/react-query'
import { Crown, Loader2 } from 'lucide-react'
import { apiRequest, type LeaderboardEntry } from '@/lib/api'

async function fetchLeaderboard() {
  const { data } = await apiRequest<LeaderboardEntry[]>({ path: '/community/leaderboard' })
  return data
}

export function LeaderboardTable() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: fetchLeaderboard
  })

  if (isLoading) {
    return (
      <div className="flex min-h-[220px] items-center justify-center rounded-3xl border border-neutral-200/80 bg-white/80 dark:border-neutral-800/80 dark:bg-neutral-900/60">
        <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="rounded-3xl border border-amber-200/70 bg-amber-50/60 p-6 text-sm text-amber-800 dark:border-amber-500/70 dark:bg-amber-900/30 dark:text-amber-200">
        Leaderboard data is temporarily unavailable. Please try again later.
      </div>
    )
  }

  return (
    <section className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
      <header className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600 dark:bg-primary-500/15 dark:text-primary-200">
          <Crown className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Community leaderboard</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Ranked by total verified impact & rewards.</p>
        </div>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200 text-sm dark:divide-neutral-800">
          <thead>
            <tr className="text-left">
              <th className="px-3 py-2 font-medium text-neutral-500 dark:text-neutral-400">Rank</th>
              <th className="px-3 py-2 font-medium text-neutral-500 dark:text-neutral-400">Member</th>
              <th className="px-3 py-2 font-medium text-neutral-500 dark:text-neutral-400">Impact score</th>
              <th className="px-3 py-2 font-medium text-neutral-500 dark:text-neutral-400">Total rewards</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {data.map((entry) => (
              <tr key={entry.address}>
                <td className="px-3 py-2 font-semibold text-neutral-700 dark:text-neutral-200">#{entry.rank}</td>
                <td className="px-3 py-2">
                  <p className="font-medium text-neutral-900 dark:text-neutral-100">{entry.displayName}</p>
                  <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">{entry.address.slice(0, 10)}…</p>
                </td>
                <td className="px-3 py-2 text-primary-600 dark:text-primary-300">{entry.impactScore.toLocaleString()}</td>
                <td className="px-3 py-2 text-neutral-700 dark:text-neutral-200">{entry.totalRewards.toLocaleString()} credits</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
