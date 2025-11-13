'use client'

import { useEffect } from 'react'

/**
 * NewsletterTally renders the newsletter CTA and ensures the Tally widget script is present.
 */
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
    <section className="mt-10 rounded-xl border border-neutral-200/60 bg-neutral-50/80 p-6 text-center shadow-sm transition-all duration-300 hover:shadow-md dark:border-neutral-800/60 dark:bg-neutral-900/40">
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Stay updated with DRP</h3>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        Subscribe to our newsletter for protocol updates, launches, and human-rights initiatives.
      </p>
      <button
        data-tally-open="3xKMro"
        data-tally-layout="modal"
        data-tally-align-left="1"
        data-tally-hide-title="1"
        data-tally-overlay="1"
        data-tally-emoji-text="👋"
        data-tally-emoji-animation="wave"
        className="mt-4 inline-flex items-center justify-center rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
      >
        Subscribe to Newsletter
      </button>
    </section>
  )
}