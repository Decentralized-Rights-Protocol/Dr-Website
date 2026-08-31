import { ActivityForm } from '@/components/proofs/ActivityForm'

export const metadata = { title: 'Submit Proof of Activity | DRP App Portal' }

export default function ActivitiesProofPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">Proof of Activities</p>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">Create an evidence-backed activity claim</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">Describe what happened and attach supporting media. DRP creates a cryptographic commitment to the evidence and places the claim into the verification workflow.</p>
      </header>
      <div className="rounded-3xl border border-neutral-200/80 bg-white/90 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60"><ActivityForm /></div>
      <section className="rounded-3xl border border-neutral-200/80 bg-neutral-50/70 p-6 text-sm text-neutral-600 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60 dark:text-neutral-300">
        <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">What happens next</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-6"><li>Your wallet identifies the actor submitting the claim.</li><li>The selected evidence file is hashed locally with SHA-256; the raw file is not sent by this form.</li><li>The backend records the claim as <strong>pending review</strong> and may use AI to assist assessment.</li><li>An approved attestation is required before the claim can enter any reward or ledger path.</li></ol>
      </section>
    </div>
  )
}
