import { BadgeShareCard } from '@/components/community/BadgeShareCard'

export const metadata = {
  title: 'Share Your Progress | DRP App Portal'
}

export default function ShareProgressPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">Community</p>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">Amplify your verified impact</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Generate a shareable badge once your Proof of Activity or Status is approved. Let fellow advocates know how you are advancing digital rights protections.
        </p>
      </header>

      <BadgeShareCard
        badgeTitle="Impact Steward – Level 3"
        description="Use this personalised link to share your badge across X, LinkedIn, and partner channels."
        shareUrl="https://app.decentralizedrights.com/badges/impact-steward"
      />

      <section className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
        <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">Tips for storytelling</h2>
        <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-neutral-600 dark:text-neutral-300">
          <li>Highlight the community or beneficiaries impacted by your verified activity.</li>
          <li>Share how DRP tools helped reduce verification friction or increased transparency.</li>
          <li>Encourage peers to join via <span className="font-semibold text-primary-600 dark:text-primary-300">https://decentralizedrights.com/learn</span>.</li>
        </ul>
      </section>
    </div>
  )
}
