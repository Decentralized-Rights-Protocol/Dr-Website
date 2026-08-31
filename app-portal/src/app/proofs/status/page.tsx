import { StatusVerificationWizard } from '@/components/proofs/StatusVerificationWizard'

export const metadata = { title: 'Submit Proof of Status | DRP App Portal' }

export default function StatusProofPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">Proof of Status</p>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">Submit a status or credential claim</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">Provide the minimum information needed to evaluate a credential. AI can assist assessment, but a submission is not considered verified until the review and attestation process is complete.</p>
      </header>
      <StatusVerificationWizard />
      <section className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
        <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Verification principles</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-neutral-600 dark:text-neutral-300"><li>Submit only evidence you are authorised to provide.</li><li>AI output is an assessment signal, not a final truth claim.</li><li>Consequential status decisions remain reviewable and challengeable.</li><li>Governance or reward eligibility follows an approved attestation; submission alone grants neither.</li></ul>
      </section>
    </div>
  )
}
