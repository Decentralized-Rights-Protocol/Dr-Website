import { ActivityForm } from '@/components/proofs/ActivityForm'

export const metadata = {
  title: 'Submit Proof of Activity | DRP App Portal'
}

export default function ActivitiesProofPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">Proof of Activities</p>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">Submit evidence of your verified engagement</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Upload encrypted media, provide location context, and submit a hashed digest to record your stewardship on the DRP ledger.
        </p>
      </header>

      <div className="rounded-3xl border border-neutral-200/80 bg-white/90 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
        <ActivityForm />
      </div>

      <section className="rounded-3xl border border-neutral-200/80 bg-neutral-50/70 p-6 text-sm text-neutral-600 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60 dark:text-neutral-300">
        <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Privacy protocol</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Media files are encrypted locally before IPFS pinning. Only hashed proofs are stored on-chain.</li>
          <li>Validators review anonymised metadata unless you explicitly grant disclosure.</li>
          <li>Activity hashes sync to OrbitDB `/orbitdb/drp_network` for tamper-evident auditing.</li>
        </ul>
      </section>
    </div>
  )
}
