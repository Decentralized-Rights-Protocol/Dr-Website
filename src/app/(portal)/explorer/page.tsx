'use client'

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Activity, Search, ArrowUpRight, Clock, User } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

function ActivityRow({ tx }: { tx: any }) {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
      <div className="w-8 h-8 bg-[#00e5cc]/10 border border-[#00e5cc]/20 flex items-center justify-center shrink-0">
        <Activity className="w-3.5 h-3.5 text-[#00e5cc]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{tx.type ?? 'Activity'}</p>
        <p className="text-xs text-gray-400 dark:text-white/30 font-mono truncate">{tx.hash ?? tx._id}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-xs text-[#00e5cc] font-bold">+{tx.score ?? tx.reward ?? 0}</p>
        <p className="text-[11px] text-gray-400 dark:text-white/25">{tx.timestamp ? new Date(tx.timestamp).toLocaleDateString() : '—'}</p>
      </div>
    </div>
  )
}

export default function ExplorerPage() {
  const [search, setSearch] = useState('')
  const activities = useQuery(api.proofs.listProofs, { limit: 50 })

  const filtered = (activities ?? []).filter((a: any) =>
    !search || JSON.stringify(a).toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Activity Explorer</h1>
        <p className="text-sm text-gray-500 dark:text-white/40">Browse verified on-chain human activity</p>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/25" />
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search by address, type, or hash..."
          className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/25 focus:outline-none focus:border-[#00e5cc]/40 transition-colors" />
      </div>
      <div className="border border-gray-100 dark:border-white/8 bg-white dark:bg-[#0a0a14]">
        <div className="px-4 py-3 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
          <span className="text-xs font-bold text-gray-400 dark:text-white/30 uppercase tracking-widest">Recent Activity</span>
          <span className="text-xs text-gray-400 dark:text-white/25">{filtered.length} records</span>
        </div>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400 dark:text-white/25">
            <Activity className="w-8 h-8 mb-3 opacity-40" />
            <p className="text-sm">No activity records found</p>
          </div>
        ) : (
          filtered.map((tx: any, i: number) => <ActivityRow key={tx._id ?? i} tx={tx} />)
        )}
      </div>
    </div>
  )
}
