'use client'

import { PremiumPage, PremiumHero } from '@/components/site/PremiumPage'

export default function APIRedirect() {
  if (typeof window !== 'undefined') {
    window.location.href = 'https://api.decentralizedrights.com'
  }

  return (
    <PremiumPage>
      <PremiumHero
        badge="Developer Infrastructure"
        title="Redirecting to DRP API"
        description="Opening the live API endpoint documentation and integration surface."
      />
      <div className="pb-20 text-center">
        <a href="https://api.decentralizedrights.com" className="rounded-xl border border-cyan-300/40 bg-cyan-300/90 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
          Open API
        </a>
      </div>
    </PremiumPage>
  )
}
