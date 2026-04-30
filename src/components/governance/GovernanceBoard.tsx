'use client'

import { useState } from 'react'
import { Loader2, Vote } from 'lucide-react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

interface GovernanceBoardProps {
  walletAddress: string | null
}

export function GovernanceBoard({ walletAddress }: GovernanceBoardProps) {
  const [pendingProposal, setPendingProposal] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const proposals = useQuery(api.governance.listGovernanceProposals, {})
  const castVote = useMutation(api.governance.createVoteRecord)

  const onVote = async (proposalId: string, choice: 'yes' | 'no' | 'abstain') => {
    if (!walletAddress) {
      setMessage('Connect a wallet before participating in governance.')
      return
    }
    try {
      setPendingProposal(proposalId)
      await castVote({
        walletAddress,
        proposalId: proposalId as never,
        choice,
        isSimulated: true,
        source: 'app',
      })
      setMessage(`Recorded a ${choice} vote in Convex. Protocol finality remains outside the app layer.`)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to record vote.')
    } finally {
      setPendingProposal(null)
    }
  }

  if (!proposals) {
    return (
      <div className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 text-sm text-neutral-500 dark:border-neutral-800/80 dark:bg-neutral-900/60 dark:text-neutral-400">
        Loading proposals…
      </div>
    )
  }

  return (
    <section className="space-y-4">
      {message ? (
        <div className="rounded-2xl border border-cyan-300/40 bg-cyan-50/70 px-4 py-3 text-sm text-cyan-900 dark:bg-cyan-950/20 dark:text-cyan-100">
          {message}
        </div>
      ) : null}

      {proposals.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-neutral-300/80 bg-white/60 p-6 text-sm text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900/30 dark:text-neutral-400">
          No live proposals yet. Bootstrap one in Convex or mirror one from Dr-Blockchain when the sync bridge is ready.
        </div>
      ) : (
        proposals.map((proposal: any) => (
          <article key={proposal._id} className="rounded-3xl border border-neutral-200/80 bg-white/90 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">{proposal.category}</p>
                <h3 className="mt-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">{proposal.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{proposal.summary}</p>
                <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
                  App-layer governance record. Final protocol execution must come from Dr-Blockchain or a mirrored governance event.
                </p>
              </div>
              <span className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-500/20 dark:text-primary-200">
                {proposal.proposalStatus}
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-emerald-300/50 bg-emerald-50/60 p-4 dark:border-emerald-500/40 dark:bg-emerald-900/20">
                <p className="text-xs uppercase tracking-wide text-emerald-700 dark:text-emerald-200">Yes</p>
                <p className="mt-1 text-2xl font-semibold text-emerald-800 dark:text-emerald-100">{proposal.yesWeight}</p>
              </div>
              <div className="rounded-2xl border border-rose-300/50 bg-rose-50/60 p-4 dark:border-rose-500/40 dark:bg-rose-900/20">
                <p className="text-xs uppercase tracking-wide text-rose-700 dark:text-rose-200">No</p>
                <p className="mt-1 text-2xl font-semibold text-rose-800 dark:text-rose-100">{proposal.noWeight}</p>
              </div>
              <div className="rounded-2xl border border-slate-300/50 bg-slate-50/60 p-4 dark:border-slate-500/40 dark:bg-slate-900/20">
                <p className="text-xs uppercase tracking-wide text-slate-700 dark:text-slate-200">Abstain</p>
                <p className="mt-1 text-2xl font-semibold text-slate-800 dark:text-slate-100">{proposal.abstainWeight}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {(['yes', 'no', 'abstain'] as const).map((choice) => (
                <button
                  key={choice}
                  onClick={() => onVote(proposal._id, choice)}
                  disabled={pendingProposal === proposal._id}
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 disabled:opacity-60 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
                >
                  {pendingProposal === proposal._id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Vote className="h-4 w-4" />}
                  Record {choice}
                </button>
              ))}
            </div>
          </article>
        ))
      )}
    </section>
  )
}
