'use client'

import Link from 'next/link'
import { Share2, Twitter, Copy, CheckCheck, ArrowLeft } from 'lucide-react'
import { useState } from 'react'

export default function SharePage() {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href.replace('/share', '') : 'https://app.decentralizedrights.com'

  function copy() {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full border border-gray-100 dark:border-white/8 bg-gray-50 dark:bg-[#0a0a14] p-8">
        <div className="w-10 h-10 bg-[#00e5cc]/10 border border-[#00e5cc]/20 flex items-center justify-center mb-6">
          <Share2 className="w-5 h-5 text-[#00e5cc]" />
        </div>
        <h1 className="text-xl font-black text-foreground mb-2">Share Your DRP Profile</h1>
        <p className="text-sm text-gray-500 dark:text-foreground/40 mb-8">Share your verified rights status and activity score with the world.</p>
        <div className="space-y-3">
          <div className="flex gap-2">
            <input readOnly value={url}
              className="flex-1 px-3 py-2.5 text-xs bg-white dark:bg-white/5 border border-gray-200 dark:border-foreground/10 text-gray-600 dark:text-foreground/50 font-mono" />
            <button onClick={copy}
              className="px-3 py-2.5 bg-[#00e5cc] text-background hover:bg-[#00bfff] transition-all">
              {copied ? <CheckCheck className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <a href={`https://twitter.com/intent/tweet?text=I'm+verified+on+DRP+%E2%80%94+the+Decentralized+Rights+Protocol.+%23DRP+%23HumanRights&url=${encodeURIComponent(url)}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-gray-200 dark:border-foreground/10 text-sm text-gray-600 dark:text-foreground/50 hover:border-[#00e5cc]/40 hover:text-gray-900 dark:hover:text-foreground transition-all">
            <Twitter className="w-4 h-4" /> Share on X / Twitter
          </a>
          <Link href="/profile" className="flex items-center justify-center gap-2 w-full px-4 py-3 text-xs text-gray-400 dark:text-foreground/30 hover:text-[#00e5cc] transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Profile
          </Link>
        </div>
      </div>
    </main>
  )
}
