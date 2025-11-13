import { StatusVerificationWizard } from '@/components/proofs/StatusVerificationWizard'

export const metadata = {
  title: 'Submit Proof of Status | DRP App Portal'
}

export default function StatusProofPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">Proof of Status</p>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">Verify your identity, organisation, or stewardship credentials</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Confirm your standing with DRP partners to unlock governance rights, sustainability boosts, and community leadership features.
        </p>
      </header>

      <StatusVerificationWizard />

      <section className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
        <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Verification checklist</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-neutral-600 dark:text-neutral-300">
          <li>Provide clear scans with legible institutional insignia or QR codes.</li>
          <li>Optionally include your partner reference code to accelerate AI verification.</li>
          <li>Our FastAPI backend issues a signed hash to the ProofRegistry smart contract post review.</li>
        </ul>
      </section>
    </div>
  )
}
