'use client'

import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

const modules = [
  { moduleSlug: 'digital-rights-foundations', lessonSlug: 'rights-charter-basics', title: 'Digital Rights Foundations', xp: 35 },
  { moduleSlug: 'sustainability-human-rights', lessonSlug: 'sustainability-and-rights', title: 'Sustainability & Human Rights', xp: 28 },
  { moduleSlug: 'community-verification-labs', lessonSlug: 'community-verification-labs', title: 'Community Verification Labs', xp: 42 },
]

interface LearnProgressPanelProps {
  walletAddress: string | null
}

export function LearnProgressPanel({ walletAddress }: LearnProgressPanelProps) {
  const progress = useQuery(api.learn.listLearnProgress, { walletAddress })
  const saveProgress = useMutation(api.learn.saveLearnProgress)

  const progressMap = new Map<string, any>((progress ?? []).map((entry: any) => [entry.lessonSlug, entry]))

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {modules.map((module) => {
        const current = progressMap.get(module.lessonSlug)
        const status = current?.completionStatus ?? 'not_started'

        return (
          <article key={module.lessonSlug} className="rounded-3xl border border-neutral-200/70 bg-white/80 p-5 shadow-sm dark:border-neutral-800/70 dark:bg-neutral-900/60">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{module.title}</h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">Status: <span className="font-medium">{status.replace('_', ' ')}</span></p>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Reward target: {module.xp} XP-equivalent app points.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(['in_progress', 'completed'] as const).map((nextStatus) => (
                <button
                  key={nextStatus}
                  onClick={async () => {
                    if (!walletAddress) return
                    await saveProgress({
                      walletAddress,
                      moduleSlug: module.moduleSlug,
                      lessonSlug: module.lessonSlug,
                      completionStatus: nextStatus,
                      xpEarned: nextStatus === 'completed' ? module.xp : 0,
                      score: nextStatus === 'completed' ? 100 : 50,
                    })
                  }}
                  disabled={!walletAddress}
                  className="rounded-xl border border-neutral-300 px-3 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
                >
                  Mark {nextStatus.replace('_', ' ')}
                </button>
              ))}
            </div>
          </article>
        )
      })}
    </div>
  )
}
