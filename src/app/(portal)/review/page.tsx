'use client'

import { ReviewQueue } from '@/components/review/ReviewQueue'
import { useWallet } from '@/hooks/useWallet'

export default function ReviewPage() {
  const { address } = useWallet()

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">Admin Review</p>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">Stewardship review queue for activity and status attestations</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          This workspace is intentionally app-layer only. Reviewer authorization still needs a proper authenticated role system before production use.
        </p>
      </header>

      <ReviewQueue walletAddress={address} />
    </div>
  )
}
