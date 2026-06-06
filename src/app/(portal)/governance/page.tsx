'use client'

import { useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Vote, Clock, CheckCircle2, XCircle, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useAppStore } from '@/store/app-store'

function ProposalCard({ p, onVote }: { p: any; onVote: (id: string, v: 'yes' | 'no') => void }) {
  const yesP = p.totalVotes > 0 ? Math.round((p.yesVotes / p.totalVotes) * 100) : 0
  return (
    <div className="border border-gray-100 dark:border-white/8 bg-white dark:bg-[#0a0a14] p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#00e5cc]">{p.category ?? 'Proposal'}</span>
            <span className={`text-[10px] px-2 py-0.5 font-bold uppercase ${p.status === 'active' ? 'bg-[#00e5cc]/10 text-[#00e5cc]' : 'bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-foreground/25'}`}>{p.status}</span>
          </div>
          <h3 className="font-bold text-foreground">{p.title}</h3>
        </div>
      </div>
      <p className="text-sm text-gray-500 dark:text-foreground/40 leading-relaxed mb-4">{p.description}</p>
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-400 dark:text-foreground/30 mb-1">
          <span>Yes: {yesP}%</span><span>No: {100 - yesP}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#00e5cc] rounded-full transition-all" style={{ width: `${yesP}%` }} />
        </div>
      </div>
      {p.status === 'active' && (
        <div className="flex gap-2">
          <button onClick={() => onVote(p._id, 'yes')} className="flex-1 py-2 text-xs font-bold bg-[#00e5cc]/10 text-[#00e5cc] hover:bg-[#00e5cc]/20 border border-[#00e5cc]/20 transition-all">Vote Yes</button>
          <button onClick={() => onVote(p._id, 'no')} className="flex-1 py-2 text-xs font-bold bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-foreground/40 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-foreground/10 transition-all">Vote No</button>
        </div>
      )}
    </div>
  )
}

export default function GovernancePage() {
  const address = useAppStore((state) => state.address)
  const proposals = useQuery(api.governance.listGovernanceProposals)
  const vote = useMutation(api.governance.createVoteRecord)
  async function handleVote(id: string, v: 'yes' | 'no') {
    if (!address) return
    try { await vote({ proposalId: id as any, choice: v, walletAddress: address }) } catch {}
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-foreground mb-1">Governance</h1>
        <p className="text-sm text-gray-500 dark:text-foreground/40">Vote on protocol proposals and parameter changes</p>
      </div>
      <div className="space-y-4">
        {!proposals ? (
          <div className="flex items-center justify-center py-16"><div className="w-8 h-8 border-2 border-[#00e5cc]/20 border-t-[#00e5cc] rounded-full animate-spin" /></div>
        ) : proposals.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-gray-400 dark:text-foreground/25">
            <Vote className="w-8 h-8 mb-3 opacity-40" />
            <p className="text-sm">No active proposals</p>
          </div>
        ) : proposals.map((p: any) => <ProposalCard key={p._id} p={p} onVote={handleVote} />)}
      </div>
    </div>
  )
}
