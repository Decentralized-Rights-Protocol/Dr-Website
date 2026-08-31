'use client'

import { useState } from 'react'
import { Share2, Copy, CheckCircle2 } from 'lucide-react'

interface BadgeShareCardProps {
  badgeTitle: string
  description: string
  shareUrl: string
}

export function BadgeShareCard({ badgeTitle, description, shareUrl }: BadgeShareCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async (platform: 'twitter' | 'linkedin') => {
    const text = `Check out my ${badgeTitle} on the Decentralized Rights Protocol!`
    const url = shareUrl

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
    }
  }

  return (
    <div className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">{badgeTitle}</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{description}</p>
        </div>
        <div className="ml-4 rounded-full bg-primary-100 p-3 dark:bg-primary-900/30">
          <Share2 className="h-5 w-5 text-primary-600 dark:text-primary-400" />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-2 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
          />
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
          >
            {copied ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleShare('twitter')}
            className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 transition-colors"
          >
            Share on X
          </button>
          <button
            onClick={() => handleShare('linkedin')}
            className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 transition-colors"
          >
            Share on LinkedIn
          </button>
        </div>
      </div>
    </div>
  )
}
