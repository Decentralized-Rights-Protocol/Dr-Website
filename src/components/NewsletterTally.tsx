'use client'

import { useEffect } from 'react'
import { Mail, Sparkles } from 'lucide-react'

export default function NewsletterTally() {
  useEffect(() => {
    if (!document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
      const script = document.createElement('script')
      script.src = 'https://tally.so/widgets/embed.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <div className="relative overflow-hidden border border-gray-100 dark:border-white/8 bg-gray-50 dark:bg-[#0a0a14] p-8 sm:p-10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#00e5cc]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#00bfff]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-[#00e5cc]/10 border border-[#00e5cc]/20 flex items-center justify-center shrink-0 mt-0.5">
            <Mail className="w-4 h-4 text-[#00e5cc]" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-bold tracking-wide text-gray-900 dark:text-white uppercase">Stay in the Loop</h3>
              <Sparkles className="w-3 h-3 text-[#00e5cc]" />
            </div>
            <p className="text-sm text-gray-500 dark:text-white/35 leading-relaxed max-w-sm">
              Protocol updates, launches, and human-rights milestones — delivered straight to your inbox.
            </p>
          </div>
        </div>
        <button data-tally-open="3xKMro" data-tally-layout="modal" data-tally-align-left="1"
          data-tally-hide-title="1" data-tally-overlay="1" data-tally-emoji-text="👋" data-tally-emoji-animation="wave"
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-[#00e5cc] text-black text-sm font-bold tracking-wide hover:bg-[#00bfff] transition-all duration-200 whitespace-nowrap">
          <Mail className="w-4 h-4" />
          Subscribe to Newsletter
        </button>
      </div>
    </div>
  )
}