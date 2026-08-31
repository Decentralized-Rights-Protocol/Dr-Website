import Link from 'next/link'
import { Activity, Award, GraduationCap, Scan, Share2, Wallet } from 'lucide-react'

const actions = [
  {
    href: '/proofs/activities',
    title: 'Submit activity proof',
    description: 'Upload evidence of your humanitarian or civic contributions.',
    icon: Activity
  },
  {
    href: '/proofs/status',
    title: 'Verify your status',
    description: 'Confirm institutional or community credentials for governance access.',
    icon: Scan
  },
  {
    href: '/wallet',
    title: 'Connect wallet',
    description: 'Link your wallet or custodial key to sign attestations securely.',
    icon: Wallet
  },
  {
    href: '/rewards',
    title: 'Review rewards',
    description: 'Track $DeRi utility credits and $RIGHTS governance weight.',
    icon: Award
  },
  {
    href: '/learn',
    title: 'Learn & earn',
    description: 'Complete verified educational modules for bonus $DeRi.',
    icon: GraduationCap
  },
  {
    href: '/community/share',
    title: 'Share progress',
    description: 'Broadcast your stewardship badge to X or LinkedIn.',
    icon: Share2
  }
]

export function QuickActions() {
  return (
    <section className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Quick actions</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Your most-used flows, arranged for rapid stewardship.</p>
        </div>
        <Link href="/dashboard" className="text-sm font-semibold text-primary-600 hover:text-primary-500 dark:text-primary-300">
          Open full dashboard →
        </Link>
      </header>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {actions.map(({ href, title, description, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col gap-3 rounded-2xl border border-neutral-200/70 bg-gradient-to-br from-white to-neutral-50/80 p-4 transition hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-lg dark:border-neutral-800/70 dark:from-neutral-900/80 dark:to-neutral-950"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600 transition group-hover:bg-primary-500 group-hover:text-white dark:bg-primary-500/20 dark:text-primary-200">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{title}</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
