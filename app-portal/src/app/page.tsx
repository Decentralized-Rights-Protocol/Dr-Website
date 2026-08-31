'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle2, Heart, Lock, ShieldCheck, Users, Sparkles, Scale, EyeOff } from 'lucide-react'
import { useWallet } from '@/hooks/useWallet'

const principles = [
  { icon: Heart, title: 'Rights before scores', text: 'A contribution record can describe evidence without becoming a measure of a person’s worth.' },
  { icon: ShieldCheck, title: 'Evidence before certainty', text: 'Claims move through evidence, automated assistance, review, and challenge rather than an opaque instant verdict.' },
  { icon: EyeOff, title: 'Privacy by default', text: 'The portal creates evidence commitments and minimizes disclosure. Sensitive evidence should not become public by default.' },
  { icon: Scale, title: 'Contestability', text: 'Consequential verification must remain reviewable, challengeable, and reversible when new evidence appears.' },
]

const workflow = [
  ['01', 'Make a claim', 'Describe the activity or status you want recorded.'],
  ['02', 'Commit evidence', 'Evidence is hashed so the integrity of what was submitted can be checked.'],
  ['03', 'AI assists', 'Automated analysis can surface signals, inconsistencies, and missing information.'],
  ['04', 'Review & challenge', 'Human review is available for consequential claims and disputes.'],
  ['05', 'Attest & reward', 'Only an approved attestation can enter the reward/ledger path.'],
]

export default function HomePage() {
  const { address, connect, isConnecting } = useWallet()

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-primary-950 via-neutral-950 to-purple-950 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-300/20 bg-primary-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-200">
              <Sparkles className="h-4 w-4" /> DRP Application Portal
            </div>
            <h1 className="mt-7 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              Your rights.<br /><span className="text-primary-300">Your proof.</span><br />Your impact.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/65 sm:text-xl">
              DRP is a verification network for meaningful claims and contributions. It is designed to make evidence more trustworthy without turning human worth into a score or giving an AI system unchecked authority.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {address ? (
                <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-300 px-6 py-3.5 font-semibold text-neutral-950 transition hover:bg-primary-200">
                  Open your console <ArrowRight className="h-5 w-5" />
                </Link>
              ) : (
                <button onClick={() => connect()} disabled={isConnecting} className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-300 px-6 py-3.5 font-semibold text-neutral-950 transition hover:bg-primary-200 disabled:opacity-50">
                  {isConnecting ? 'Connecting…' : 'Connect wallet to start'} <ArrowRight className="h-5 w-5" />
                </button>
              )}
              <Link href="/learn" className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white hover:bg-white/10">
                Understand the protocol
              </Link>
            </div>
            <p className="mt-4 text-xs text-white/35">Connecting a wallet does not transfer custody of your private keys to DRP.</p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.25em] text-primary-300">The mission</p><h2 className="mt-3 text-3xl font-bold sm:text-4xl">Verification should strengthen agency, not replace it.</h2><p className="mt-4 leading-7 text-white/55">DRP separates a claim from a person. Evidence can be evaluated; decisions can be challenged; and rights do not depend on accumulated reputation.</p></div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {principles.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"><Icon className="h-6 w-6 text-primary-300" /><h3 className="mt-5 text-xl font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/50">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.02] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-primary-300">Verification workflow</p><h2 className="mt-3 text-3xl font-bold">From claim to attestable proof.</h2></div><p className="max-w-xl text-sm leading-6 text-white/45">AI is an assistant in the workflow. It does not independently define truth, human worth, or irreversible rights.</p></div>
          <div className="mt-10 grid gap-3 md:grid-cols-5">
            {workflow.map(([number, title, text]) => <div key={number} className="rounded-2xl border border-white/10 bg-neutral-950 p-5"><span className="text-xs font-bold text-primary-300">{number}</span><h3 className="mt-4 font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/45">{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          <Link href="/proofs/activities" className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-primary-300/30"><p className="text-xs uppercase tracking-widest text-primary-300">PoAT</p><h3 className="mt-3 text-xl font-semibold">Record an activity</h3><p className="mt-2 text-sm text-white/45">Create an evidence-backed activity claim and follow its verification trail.</p><ArrowRight className="mt-6 h-5 w-5 text-white/30 transition group-hover:translate-x-1 group-hover:text-primary-300" /></Link>
          <Link href="/proofs/status" className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-primary-300/30"><p className="text-xs uppercase tracking-widest text-primary-300">PoST</p><h3 className="mt-3 text-xl font-semibold">Establish status</h3><p className="mt-2 text-sm text-white/45">Submit a status or credential claim for review. Status is not an automatic reward trigger.</p><ArrowRight className="mt-6 h-5 w-5 text-white/30 transition group-hover:translate-x-1 group-hover:text-primary-300" /></Link>
          <Link href="/community" className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-primary-300/30"><p className="text-xs uppercase tracking-widest text-primary-300">Governance</p><h3 className="mt-3 text-xl font-semibold">Challenge & participate</h3><p className="mt-2 text-sm text-white/45">Participation, review, challenges, and governance keep the protocol accountable.</p><ArrowRight className="mt-6 h-5 w-5 text-white/30 transition group-hover:translate-x-1 group-hover:text-primary-300" /></Link>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8"><div className="mx-auto max-w-6xl rounded-3xl border border-primary-300/20 bg-primary-300/5 p-8 sm:p-12"><div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"><div><div className="flex items-center gap-2 text-primary-300"><Lock className="h-5 w-5" /><span className="text-sm font-semibold">Privacy is a protocol requirement</span></div><h2 className="mt-3 text-2xl font-bold">Prove what matters. Reveal what is necessary.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-white/50">DRP should store the minimum information needed to verify a claim, use cryptographic commitments where appropriate, and keep sensitive evidence out of public ledgers.</p></div><Link href="/learn" className="shrink-0 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950">Learn more</Link></div></div></section>
    </main>
  )
}
