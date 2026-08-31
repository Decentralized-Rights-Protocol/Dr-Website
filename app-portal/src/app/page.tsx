'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle2, Lock, ShieldCheck, Sparkles, Scale, EyeOff, Globe2, Activity, ExternalLink } from 'lucide-react'
import { useWallet } from '@/hooks/useWallet'

const principles = [
  { icon: ShieldCheck, title: 'Evidence before certainty', text: 'Claims move through evidence, automated assistance, review, and challenge instead of an opaque instant verdict.' },
  { icon: Lock, title: 'Privacy by default', text: 'Evidence commitments minimize disclosure. Sensitive evidence should never become public by default.' },
  { icon: Scale, title: 'Contestable by design', text: 'Consequential verification stays reviewable, challengeable, and reversible when new evidence appears.' },
  { icon: Globe2, title: 'Built for the world', text: 'Starting with Ghana, DRP is designed as portable infrastructure for verified rights and human contribution.' },
]

const workflow = [
  ['01', 'Submit activity', 'Document a real-world action and describe the claim you want recorded.'],
  ['02', 'Commit evidence', 'Create a cryptographic commitment so the integrity of submitted evidence can be checked.'],
  ['03', 'AI assists', 'Surface signals, inconsistencies, and missing information without giving AI unchecked authority.'],
  ['04', 'Review & challenge', 'Human review and challenge mechanisms protect consequential decisions.'],
  ['05', 'Attest & reward', 'Approved attestations can enter the ledger and policy-controlled reward path.'],
]

const pillars = [
  ['PoST', 'Proof of Status', 'Portable, privacy-preserving attestations for identity, trust, and capability.'],
  ['PoAT', 'Proof of Activity', 'On-chain evidence of meaningful participation and human impact.'],
  ['AI', 'AI Governance', 'Decision-support agents that improve transparency and institutional memory.'],
  ['PQC', 'Post-Quantum Security', 'A security direction designed for cryptographic resilience beyond today’s threat model.'],
  ['SDG', 'SDG Alignment', 'A rights infrastructure designed to map measurable contributions to human flourishing.'],
  ['ZK', 'Transparent Verification', 'Auditable provenance without exposing more personal information than necessary.'],
]

export default function HomePage() {
  const { address, connect, isConnecting } = useWallet()

  return (
    <div className="overflow-hidden">
      <section className="relative border-b border-white/[.07] bg-[#030308]">
        <div className="drp-grid absolute inset-0 opacity-40" />
        <div className="drp-orb left-[8%] top-20 h-64 w-64 bg-[#00e5cc]/10" />
        <div className="drp-orb right-[4%] top-36 h-72 w-72 bg-[#8b5cf6]/10" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.15fr_.85fr] lg:px-8 lg:pb-28 lg:pt-24">
          <div className="drp-fade-up">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#00e5cc]/20 bg-[#00e5cc]/[.06] px-3.5 py-2 text-[10px] font-bold uppercase tracking-[.22em] text-[#00e5cc]"><Sparkles className="h-3.5 w-3.5" /> DRP Application Portal · Testnet</div>
            <h1 className="max-w-4xl text-5xl font-black leading-[.98] tracking-[-.045em] sm:text-6xl lg:text-7xl xl:text-[84px]">Infrastructure for <span className="drp-gradient-text">verified rights.</span></h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">Document activity. Prove what happened. Protect what is sensitive. DRP turns meaningful human contributions into evidence that can be reviewed, challenged, and attested.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {address ? <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00e5cc] px-6 py-3.5 text-sm font-bold text-[#030308] transition hover:bg-[#53f0df]">Open your console <ArrowRight className="h-4 w-4" /></Link> : <button onClick={() => connect()} disabled={isConnecting} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00e5cc] px-6 py-3.5 text-sm font-bold text-[#030308] transition hover:bg-[#53f0df] disabled:opacity-50">{isConnecting ? 'Connecting…' : 'Connect wallet to start'} <ArrowRight className="h-4 w-4" /></button>}
              <a href="https://decentralizedrights.com" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[.03] px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/[.06]">Explore the protocol <ExternalLink className="h-4 w-4" /></a>
            </div>
            <p className="mt-4 text-[11px] text-white/25">Wallet connection never transfers custody of your private keys to DRP.</p>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="drp-float relative w-full max-w-[430px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.035] p-3 shadow-[0_30px_100px_rgba(0,0,0,.45)]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#071615]">
                <img src="https://decentralizedrights.com/08_IFOPE_20x30.jpg" alt="DRP visual identity" className="absolute inset-0 h-full w-full object-cover opacity-65" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-[#030308]/20 to-transparent" />
                <div className="absolute inset-x-6 bottom-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00e5cc]/30 bg-[#00e5cc]/10 text-lg font-black tracking-[-.1em] text-[#00e5cc] shadow-[0_0_35px_rgba(0,229,204,.18)]">DRP</div>
                  <p className="text-[10px] font-bold uppercase tracking-[.22em] text-[#00e5cc]">Human rights infrastructure</p>
                  <p className="mt-2 text-2xl font-bold leading-tight">The future of rights is verifiable.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[.07] bg-[#05050b]">
        <div className="mx-auto grid max-w-7xl gap-px bg-white/[.06] sm:grid-cols-3">
          {[['01', 'Submit', 'Real-world activity'], ['02', 'Verify', 'Evidence + review'], ['03', 'Attest', 'Rights + access']].map(([n,t,d]) => <div key={n} className="bg-[#05050b] px-6 py-7"><span className="text-[10px] font-bold tracking-widest text-[#00e5cc]">{n}</span><p className="mt-2 text-lg font-bold">{t}</p><p className="mt-1 text-xs text-white/35">{d}</p></div>)}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl"><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#00e5cc]">The DRP mission</p><h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">Rights-first infrastructure, not a reputation machine.</h2><p className="mt-5 text-base leading-7 text-white/45">The protocol website defines DRP around verified human activity, identity attestation, transparent verification, privacy, post-quantum security, and fair resource distribution. The app is where those ideas become usable workflows. citeturn0view0</p></div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">{principles.map(({icon:Icon,title,text}) => <article key={title} className="drp-glass drp-glass-hover rounded-2xl p-6 sm:p-7"><Icon className="h-6 w-6 text-[#00e5cc]" /><h3 className="mt-6 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/40">{text}</p></article>)}</div>
        </div>
      </section>

      <section className="border-y border-white/[.07] bg-white/[.015] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#00e5cc]">How it works</p><h2 className="mt-4 text-3xl font-black sm:text-5xl">From activity to verified right.</h2></div><p className="max-w-xl text-sm leading-6 text-white/35">The public protocol describes a four-stage path from activity to access and rewards. The app makes that path more rigorous by keeping AI assistance separate from final attestation. citeturn0view0</p></div>
          <div className="mt-12 grid gap-3 md:grid-cols-5">{workflow.map(([n,t,d]) => <div key={n} className="drp-glass rounded-2xl p-5"><span className="text-[10px] font-black text-[#00e5cc]">{n}</span><h3 className="mt-5 text-sm font-bold">{t}</h3><p className="mt-2 text-xs leading-5 text-white/35">{d}</p></div>)}</div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl"><div className="flex items-center justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#00e5cc]">Core protocol</p><h2 className="mt-4 text-3xl font-black sm:text-4xl">Six pillars of DRP.</h2></div><a href="https://decentralizedrights.com" target="_blank" rel="noreferrer" className="hidden items-center gap-2 text-xs font-semibold text-white/40 hover:text-[#00e5cc] sm:flex">Full protocol <ArrowRight className="h-4 w-4" /></a></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{pillars.map(([code,title,text]) => <article key={code} className="drp-glass drp-glass-hover rounded-2xl p-6"><div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#00e5cc]/20 bg-[#00e5cc]/[.06] text-[10px] font-black text-[#00e5cc]">{code}</div><h3 className="mt-5 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/40">{text}</p></article>)}</div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#00e5cc]/15 bg-gradient-to-br from-[#00e5cc]/[.08] via-[#8b5cf6]/[.04] to-transparent p-8 sm:p-12"><div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between"><div><div className="flex items-center gap-2 text-[#00e5cc]"><Activity className="h-4 w-4" /><span className="text-[10px] font-bold uppercase tracking-[.22em]">Ready to participate?</span></div><h2 className="mt-4 max-w-2xl text-3xl font-black sm:text-4xl">Make human contribution legible without making people legible to everyone.</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-white/40">Start with a claim. Build the evidence. Let the protocol keep the process transparent and accountable.</p></div><Link href="/proofs/activities" className="shrink-0 rounded-xl bg-[#00e5cc] px-6 py-3.5 text-center text-sm font-bold text-[#030308]">Submit your first proof</Link></div></div></section>
    </div>
  )
}
