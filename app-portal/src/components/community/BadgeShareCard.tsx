'use client'

import { useState } from 'react'
import { Share2, Twitter, Linkedin } from 'lucide-react'

interface BadgeShareCardProps {
  badgeTitle: string
  description: string
  shareUrl: string
}

export function BadgeShareCard({ badgeTitle, description, shareUrl }: BadgeShareCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2_000)
    } catch (error) {
      console.error('Failed to copy share link', error)
    }
  }

  return (
    <section className="rounded-3xl border border-neutral-200/80 bg-gradient-to-br from-primary-500/10 via-white to-neutral-50/80 p-6 shadow-sm dark:border-neutral-800/80 dark:from-primary-500/10 dark:via-neutral-900/70 dark:to-neutral-950">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-primary-600 dark:text-primary-300">Share your stewardship</p>
          <h3 className="mt-2 text-xl font-semibold text-neutral-900 dark:text-neutral-100">{badgeTitle}</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-xl border border-primary-500 px-4 py-2 text-sm font-medium text-primary-600 transition hover:bg-primary-50 dark:border-primary-400 dark:text-primary-200 dark:hover:bg-primary-900/40"
          >
            <Share2 className="h-4 w-4" />
            {copied ? 'Link copied!' : 'Copy share link'}
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just unlocked ${badgeTitle} on the Decentralized Rights Protocol!`)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            <Twitter className="h-4 w-4" />
            Share on X
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-sky-600 px-4 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-50 dark:border-sky-400 dark:text-sky-200 dark:hover:bg-sky-900/40"
          >
            <Linkedin className="h-4 w-4" />
            Share on LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
