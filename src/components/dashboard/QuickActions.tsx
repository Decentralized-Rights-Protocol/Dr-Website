import Link from 'next/link'
import { Activity, Award, GraduationCap, Scan, Share2, Wallet } from 'lucide-react'

const actions = [
  {
    href: '/proofs/activities',
    title: 'Submit Proof',
    description: 'Verify your contributions to the human network.',
    icon: Activity
  },
  {
    href: '/explorer',
    title: 'Explorer',
    description: 'Monitor the live DRP ledger in real-time.',
    icon: Scan
  },
  {
    href: '/rewards',
    title: 'Rewards',
    description: 'Track your $DeRi and $RIGHTS earnings.',
    icon: Award
  },
  {
    href: '/learn',
    title: 'Learn',
    description: 'Complete modules and earn protocol rewards.',
    icon: GraduationCap
  }
]

export function QuickActions() {
  return (
    <section className="rounded-[2.5rem] border border-foreground/5 bg-black/40 p-10 backdrop-blur-md">
      <header className="mb-10">
        <p className="text-[10px] font-cinematic text-drp-cyan opacity-60 mb-2">Protocol Access</p>
        <h3 className="text-2xl font-bold text-foreground">Rapid Stewardship</h3>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map(({ href, title, description, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group relative rounded-[2rem] border border-foreground/5 bg-white/5 p-8 transition-all hover:bg-white/10 hover:border-white/20"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-drp-cyan/10 text-drp-cyan transition-transform group-hover:scale-110 mb-6">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground mb-2">{title}</p>
              <p className="text-xs text-drp-gray leading-relaxed">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
