'use client'

import { BrainCircuit, Landmark, Scale } from 'lucide-react'
import { GovernanceBoard } from '@/components/governance/GovernanceBoard'
import { useWallet } from '@/hooks/useWallet'

export default function GovernancePage() {
  const { address } = useWallet()

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">Governance</p>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">AI proposes, protocol verifies, governance decides</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Convex stores proposal context and governance participation records for the application layer. It does not replace protocol consensus or final on-chain execution.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          { icon: BrainCircuit, title: 'AI proposes', body: 'Assistive analysis, risk flags, and draft recommendations live at the application layer.' },
          { icon: Scale, title: 'Protocol verifies', body: 'Attestations and protocol events remain the responsibility of Dr-Blockchain and its eventual bridge.' },
          { icon: Landmark, title: 'Governance decides', body: 'Convex stores context and simulated votes without overclaiming blockchain finality.' },
        ].map((item) => (
          <article key={item.title} className="rounded-3xl border border-neutral-200/70 bg-white/80 p-5 shadow-sm dark:border-neutral-800/70 dark:bg-neutral-900/60">
            <item.icon className="h-6 w-6 text-primary-600 dark:text-primary-300" />
            <h2 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">{item.title}</h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{item.body}</p>
          </article>
        ))}
      </section>

      <GovernanceBoard walletAddress={address} />
    </div>
  )
}
