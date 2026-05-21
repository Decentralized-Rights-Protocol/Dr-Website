'use client'

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Trophy, Star, Crown, Medal } from 'lucide-react'

function RankRow({ entry, rank }: { entry: any; rank: number }) {
  const isTop3 = rank <= 3
  return (
    <div className={`flex items-center gap-4 p-4 border-b border-gray-100 dark:border-white/5 ${isTop3 ? 'bg-[#00e5cc]/[0.02]' : ''}`}>
      <span className={`text-sm font-black w-8 text-center ${rank === 1 ? 'text-[#ffd700]' : rank === 2 ? 'text-gray-400' : rank === 3 ? 'text-amber-600' : 'text-gray-400 dark:text-white/25'}`}>#{rank}</span>
      {rank === 1 ? <Crown className="w-4 h-4 text-[#ffd700] shrink-0" /> : rank <= 3 ? <Medal className="w-4 h-4 text-gray-400 shrink-0" /> : <div className="w-4" />}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{entry.displayName ?? entry.walletAddress?.slice(0, 12) + '...' ?? 'Anonymous'}</p>
        <p className="text-xs text-gray-400 dark:text-white/25 font-mono">{entry.walletAddress?.slice(0, 8)}...{entry.walletAddress?.slice(-4)}</p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <Star className="w-3.5 h-3.5 text-[#ffd700]" />
        <span className="text-sm font-bold text-gray-900 dark:text-white">{entry.activityScore?.toFixed(0) ?? 0}</span>
      </div>
    </div>
  )
}

export default function LeaderboardPage() {
  const leaderboard = useQuery(api.leaderboard.getLeaderboard)
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Leaderboard</h1>
        <p className="text-sm text-gray-500 dark:text-white/40">Top DRP participants by activity score</p>
      </div>
      <div className="border border-gray-100 dark:border-white/8 bg-white dark:bg-[#0a0a14]">
        {!leaderboard ? (
          <div className="flex items-center justify-center py-16"><div className="w-8 h-8 border-2 border-[#00e5cc]/20 border-t-[#00e5cc] rounded-full animate-spin" /></div>
        ) : leaderboard.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-gray-400 dark:text-white/25">
            <Trophy className="w-8 h-8 mb-3 opacity-40" />
            <p className="text-sm">No rankings yet — start verifying!</p>
          </div>
        ) : leaderboard.map((entry: any, i: number) => <RankRow key={entry._id ?? i} entry={entry} rank={i + 1} />)}
      </div>
    </div>
  )
}
