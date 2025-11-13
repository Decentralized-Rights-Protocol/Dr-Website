'use client'

import Link from 'next/link'
import { Download, ExternalLink, QrCode, ShieldCheck, Users2, Zap, Wallet, ChevronRight, Globe } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

const accountTypes = [
  {
    title: 'Personal Accounts',
    description: 'Secure your individual rights, credentials, and verified contributions with privacy-first controls.',
    icon: Users2
  },
  {
    title: 'Organization Accounts',
    description: 'Coordinate teams, manage governance votes, and publish transparency reports with audit-ready trails.',
    icon: ShieldCheck
  }
]

const verificationFlow = [
  {
    title: '1. Connect Wallet',
    description: 'Link a Web3 wallet or DRP custodial key to establish a secure identity anchor.'
  },
  {
    title: '2. Attest Presence',
    description: 'Complete Proof of Status (PoST) using biometric, civic, or institutional attestations.'
  },
  {
    title: '3. Activate Activity',
    description: 'Begin Proof of Activity (PoAT) with tasks, governance actions, or service verifications.'
  },
  {
    title: '4. Earn Credits',
    description: 'Unlock $DeRi utility and $RIGHTS governance credits for verified participation.'
  }
]

const creditHighlights = [
  {
    label: '$DeRi Credits',
    description: 'Utility credits for staking, services, and cross-chain liquidity incentives.',
    accent: 'from-blue-500/70 to-cyan-500/70'
  },
  {
    label: '$RIGHTS Credits',
    description: 'Governance weight tied to human-rights commitments and verified impact.',
    accent: 'from-purple-500/70 to-fuchsia-500/70'
  },
  {
    label: 'Sustainability Boosts',
    description: 'Earn multipliers for renewable energy usage and transparent supply chains.',
    accent: 'from-emerald-500/70 to-teal-500/70'
  }
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-white via-neutral-50 to-primary-50/40 dark:from-neutral-950 dark:via-neutral-900 dark:to-primary-950/20">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/90 backdrop-blur-lg dark:border-neutral-800/80 dark:bg-neutral-950/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">DRP App Portal</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Privacy-first human rights dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-lg border border-primary-600 px-4 py-2 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-50 dark:border-primary-400 dark:text-primary-200 dark:hover:bg-primary-900/30"
            >
              <Wallet className="h-4 w-4" />
              Login
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-20 -right-32 h-72 w-72 rounded-full bg-primary-500/20 blur-3xl dark:bg-primary-400/20" />
            <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-accent-500/10 blur-3xl dark:bg-accent-500/20" />
          </div>

          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:px-8 lg:py-20">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-4 py-1 text-sm font-medium text-primary-700 dark:text-primary-200">
                <span className="h-2 w-2 rounded-full bg-primary-500" />
                Unified verification. Adaptive privacy.
              </p>
              <h1 className="mt-6 text-4xl font-bold leading-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl">
                Access the DRP App and steward digital rights with confidence
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-neutral-600 dark:text-neutral-300">
                Launch the decentralized rights console, manage PoST/PoAT verifications, and unlock multi-chain services built for human-rights-first governance.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="https://app.decentralizedrights.com/app"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:shadow-xl"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open in Browser
                </a>
                <a
                  href="https://app.decentralizedrights.com/download/apk"
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
                >
                  <Download className="h-4 w-4" />
                  Download APK
                </a>
              </div>

              <dl className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {[
                  { label: 'Verified citizens', value: '38k+' },
                  { label: 'Sovereign partners', value: '62' },
                  { label: 'Audit trails secured', value: '182k' }
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-neutral-200/80 bg-white/70 p-5 shadow-sm backdrop-blur dark:border-neutral-700/80 dark:bg-neutral-900/70">
                    <dt className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">{stat.label}</dt>
                    <dd className="mt-2 text-2xl font-semibold text-neutral-900 dark:text-neutral-50">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/30 via-primary-300/20 to-accent-500/20 blur-2xl dark:from-primary-500/20 dark:via-primary-400/10 dark:to-accent-500/10" />
              <div className="relative space-y-6 rounded-3xl border border-neutral-200/80 bg-white/90 p-8 shadow-2xl backdrop-blur dark:border-neutral-700/60 dark:bg-neutral-900/80">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-200">Mobile companion</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Scan to sync your device</p>
                  </div>
                  <QrCode className="h-12 w-12 text-primary-600 dark:text-primary-300" />
                </div>

                <div className="rounded-2xl border border-dashed border-primary-300 bg-primary-50/60 p-6 text-center dark:border-primary-600 dark:bg-primary-900/40">
                  <p className="text-sm font-medium text-primary-800 dark:text-primary-200">Scan with the DRP mobile app to continue verification flows instantly.</p>
                  <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs text-neutral-700 shadow-sm dark:bg-neutral-950 dark:text-neutral-200">
                    drp://app-sync/session-8473
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600 dark:bg-primary-500/20 dark:text-primary-200">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">Zero-knowledge native</p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300">
                        Sensitive attestations remain encrypted locally until you grant release.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600 dark:bg-accent-500/20 dark:text-accent-200">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">Multi-jurisdictional</p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300">
                        Built for NGOs, cooperatives, and civic guilds across 37 supported regions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Account Types */}
        <section className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">Choose the account that fits your mission</h2>
              <p className="mt-3 text-neutral-600 dark:text-neutral-300">
                DRP supports individual advocates and collective organizations with tailored compliance and visibility controls.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {accountTypes.map((item) => (
                <div key={item.title} className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-md transition-transform hover:-translate-y-1 dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-600 dark:bg-primary-500/15 dark:text-primary-200">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-50">{item.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Verification Flow */}
        <section className="mx-auto mt-14 max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">Proof-of-Humanity verification, simplified</h2>
                <p className="mt-2 text-neutral-600 dark:text-neutral-300">
                  A guided workflow ensures compliant onboarding for people, organizations, and AI elder partners.
                </p>
              </div>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                Open Dashboard
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {verificationFlow.map((step) => (
                <div key={step.title} className="rounded-2xl border border-neutral-200 bg-neutral-50/80 p-5 dark:border-neutral-800 dark:bg-neutral-900/70">
                  <p className="text-sm font-semibold text-primary-600 dark:text-primary-300">{step.title}</p>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Credits */}
        <section className="mx-auto mt-14 max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">Earn credits for provable impact</h2>
              <p className="mt-3 text-neutral-600 dark:text-neutral-300">
                DRP measures verified activity and allocates credits that unlock governance and utility privileges.
              </p>
              <ul className="mt-6 space-y-4 text-sm text-neutral-600 dark:text-neutral-300">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary-500" />
                  <span>Participate in civic verifications, stewardship councils, or eco-ledger audits.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary-500" />
                  <span>Redeem credits for priority governance slots, service discounts, and staking boosts.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary-500" />
                  <span>Credits decay gracefully to encourage continuous, transparent participation.</span>
                </li>
              </ul>
            </div>

            <div className="grid gap-4">
              {creditHighlights.map((credit) => (
                <div
                  key={credit.label}
                  className={cn(
                    'rounded-3xl border border-neutral-200 bg-white p-6 shadow-md dark:border-neutral-800 dark:bg-neutral-900',
                    'relative overflow-hidden'
                  )}
                >
                  <div className={cn('absolute inset-y-0 left-0 w-1 bg-gradient-to-b', credit.accent)} />
                  <h3 className="ml-4 text-lg font-semibold text-neutral-900 dark:text-neutral-50">{credit.label}</h3>
                  <p className="ml-4 mt-2 text-sm text-neutral-600 dark:text-neutral-300">{credit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mx-auto my-16 max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-primary-300/60 bg-gradient-to-br from-primary-500/15 via-primary-400/5 to-accent-500/10 p-8 text-center shadow-xl dark:border-primary-500/30 dark:from-primary-500/10 dark:via-primary-500/5 dark:to-accent-500/10">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">Ready to launch?</h2>
            <p className="mt-3 text-neutral-600 dark:text-neutral-300">
              Sign in with a verified wallet or request credentials to begin stewarding digital rights data.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-primary-500"
              >
                Login / Sign Up
              </Link>
              <a
                href="mailto:support@decentralizedrights.com"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                Request Organization Access
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200 bg-white/80 py-6 text-center text-sm text-neutral-500 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80 dark:text-neutral-400">
        © {new Date().getFullYear()} Decentralized Rights Protocol. Engineered for human rights.
      </footer>
    </div>
  )
}

