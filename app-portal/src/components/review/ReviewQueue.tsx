'use client'

import { useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

interface ReviewQueueProps {
  walletAddress: string | null
}

export function ReviewQueue({ walletAddress }: ReviewQueueProps) {
  const [note, setNote] = useState<Record<string, string>>({})
  const workspace = useQuery(api.review.listReviewQueue, { walletAddress, queueStatus: 'pending' })
  const updateReview = useMutation(api.submissions.updateSubmissionReviewStatus)

  if (!workspace) {
    return <div className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 text-sm text-neutral-500 dark:border-neutral-800/80 dark:bg-neutral-900/60 dark:text-neutral-400">Loading stewardship review queue…</div>
  }

  if (!workspace.authorized) {
    return (
        <div className="rounded-3xl border border-amber-300/60 bg-amber-50/70 p-6 text-sm text-amber-900 dark:border-amber-500/40 dark:bg-amber-950/20 dark:text-amber-100">
        Steward review access is not enabled for this wallet yet. The interface is connected, but role assignment still needs authenticated policy controls.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {workspace.items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-neutral-300/80 bg-white/60 p-6 text-sm text-neutral-500 dark:border-neutral-700 dark:bg-neutral-900/30 dark:text-neutral-400">
          The stewardship review queue is clear.
        </div>
      ) : workspace.items.map((item: any) => (
        <article key={item._id} className="rounded-3xl border border-neutral-200/80 bg-white/90 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">{item.reviewType === 'poat' ? 'activity attestation' : 'status attestation'}</p>
              <h3 className="mt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">{item.submission?.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{item.submission?.description}</p>
            </div>
            <div className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
              {item.priority}
            </div>
          </div>

          <textarea
            value={note[item._id] ?? ''}
            onChange={(event) => setNote((current) => ({ ...current, [item._id]: event.target.value }))}
            placeholder="Assessment note for the attestation record"
            className="mt-4 min-h-24 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:border-neutral-700 dark:bg-neutral-950"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {(['approved', 'rejected', 'needs_info'] as const).map((nextStatus) => (
              <button
                key={nextStatus}
                onClick={async () => {
                  if (!walletAddress || !item.submission) return
                  await updateReview({
                    reviewerWallet: walletAddress,
                    submissionId: item.submission._id,
                    nextStatus,
                    reviewNote: note[item._id] || `Marked ${nextStatus} from the stewardship review workspace.`,
                  })
                }}
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                <ShieldCheck className="h-4 w-4" />
                Record {nextStatus.replace('_', ' ')}
              </button>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}
