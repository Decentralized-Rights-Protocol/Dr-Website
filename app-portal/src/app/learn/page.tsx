import Link from 'next/link'
import { GraduationCap, BookOpen, Sparkles } from 'lucide-react'
import { env } from '@/lib/env'

export const metadata = {
  title: 'Learn & Earn | DRP App Portal'
}

const modules = [
  {
    title: 'Digital Rights Foundations',
    description: 'Understand the governance primitives behind DRP and global rights charters.',
    reward: '+35 $DeRi'
  },
  {
    title: 'Sustainability & Human Rights',
    description: 'Align climate reporting with human rights data compliance.',
    reward: '+28 $DeRi'
  },
  {
    title: 'Community Verification Labs',
    description: 'Deploy PoAT workflows in low-connectivity hubs.',
    reward: '+42 $DeRi'
  }
]

export default function LearnPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">Learn & Earn</p>
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">Build expertise and earn rewards simultaneously</h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300">
          Complete guided learning paths, pass AI-proctored assessments, and unlock $DeRi bonuses for mastering decentralised rights stewardship.
        </p>
      </header>

      <section className="rounded-3xl border border-neutral-200/80 bg-white/90 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600 dark:bg-primary-500/15 dark:text-primary-200">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Access full curriculum</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">Hosted on our DRP Learn portal with multilingual support.</p>
            </div>
          </div>
          <Link
            href={env.NEXT_PUBLIC_LEARN_URL}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Launch DRP Learn
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {modules.map((module) => (
          <div key={module.title} className="rounded-3xl border border-neutral-200/70 bg-white/80 p-5 shadow-sm dark:border-neutral-800/70 dark:bg-neutral-900/60">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600 dark:bg-primary-500/15 dark:text-primary-200">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">{module.title}</h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{module.description}</p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-600 dark:bg-primary-500/20 dark:text-primary-200">
              <Sparkles className="h-4 w-4" />
              Reward: {module.reward}
            </p>
          </div>
        ))}
      </section>
    </div>
  )
}
