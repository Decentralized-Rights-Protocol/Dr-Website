'use client'

import { PremiumPage, PremiumHero } from '@/components/site/PremiumPage'

export default function ExplorerRedirect() {
  if (typeof window !== 'undefined') {
    window.location.href = 'https://explorer.decentralizedrights.com'
  }

  return (
    <PremiumPage>
      <PremiumHero
        badge="Ecosystem Tooling"
        title="Redirecting to DRP Explorer"
        description="Opening the live blockchain explorer for protocol activity, transactions, and network visibility."
      />
      <div className="pb-20 text-center">
        <a href="https://explorer.decentralizedrights.com" className="rounded-xl border border-cyan-300/40 bg-cyan-300/90 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
          Open Explorer
        </a>
      </div>
    </PremiumPage>
  )
}
