'use client'

import Link from 'next/link'
import { ArrowLeft, CalendarCheck, CheckCircle2, FileText, LayoutDashboard, Sparkles } from 'lucide-react'

const milestones = [
  {
    title: 'Proof of Status verified',
    description: 'Elder guild consensus completed · 12 validators attested',
    date: 'Aug 19, 2025',
    status: 'complete'
  },
  {
    title: 'Organization dossier uploaded',
    description: 'Transparency doc shareable with civic partners',
    date: 'Aug 22, 2025',
    status: 'complete'
  },
  {
    title: 'Launch local rights campaign',
    description: 'Schedule digital rights awareness cohort',
    date: 'Sep 9, 2025',
    status: 'upcoming'
  }
]

const quickActions = [
  { label: 'Issue verification badge', icon: CheckCircle2 },
  { label: 'Publish rights report', icon: FileText },
  { label: 'Schedule elder review', icon: CalendarCheck }
]

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/40 px-4 py-14 dark:from-neutral-950 dark:via-neutral-900 dark:to-primary-950/20">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800">
            <ArrowLeft className="h-4 w-4" />
            Back to portal
          </Link>
          <div className="inline-flex items-center gap-2 rounded-xl bg-primary-500/10 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-500/20 dark:text-primary-200">
            <Sparkles className="h-4 w-4" />
            Beta dashboard
          </div>
        </div>

        <header className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary-600 dark:text-primary-300">Civic Cooperative · Verified</p>
              <h1 className="mt-2 text-3xl font-bold text-neutral-900 dark:text-neutral-50">Rights Stewardship Console</h1>
              <p className="mt-3 max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
                Monitor active verifications, manage PoST/PoAT attestations, and publish rights impact updates to partner ledgers.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2 text-xs text-neutral-500 dark:border-neutral-700 dark:text-neutral-300">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard v0.6.2
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">Quick actions</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    className="flex flex-col items-start gap-3 rounded-2xl border border-neutral-200 px-4 py-5 text-left text-sm text-neutral-600 transition-transform hover:-translate-y-0.5 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                  >
                    <action.icon className="h-5 w-5 text-primary-600 dark:text-primary-300" />
                    <span className="font-medium text-neutral-900 dark:text-neutral-100">{action.label}</span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">Requires PoAT level 2</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">Milestones</h2>
              <div className="mt-4 space-y-4">
                {milestones.map((milestone) => (
                  <div
                    key={milestone.title}
                    className="flex items-start gap-4 rounded-2xl border border-neutral-200 px-4 py-4 dark:border-neutral-800 dark:bg-neutral-950/40"
                  >
                    <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500/10 text-primary-600 dark:bg-primary-500/20 dark:text-primary-200">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{milestone.title}</p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300">{milestone.description}</p>
                      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{milestone.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">Verification status</h2>
              <dl className="mt-4 space-y-4 text-sm text-neutral-600 dark:text-neutral-300">
                <div className="flex items-center justify-between rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
                  <dt>Proof of Status</dt>
                  <dd className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                    Verified
                  </dd>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
                  <dt>Proof of Activity</dt>
                  <dd className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                    Level 2
                  </dd>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-neutral-200 p-4 dark:border-neutral-800">
                  <dt>Impact attestations</dt>
                  <dd className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">37 submissions</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">Need help?</h2>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                Visit the resource center for migration guides, compliance FAQs, and AI elder support.
              </p>
              <Link
                href="https://docs.decentralizedrights.com"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-300"
              >
                Open documentation
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Link>
            </div>
          </aside>
        </section>
      </div>
    </main>
  )
}

