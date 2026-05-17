'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Shield, Zap, Globe, Lock, Users, CheckCircle, ChevronRight } from 'lucide-react'

// ─── Fade-in section wrapper ─────────────────────────────────────────
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Animated counter ────────────────────────────────────────────────
function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / 60
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setVal(end); clearInterval(timer) }
      else setVal(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end])
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

// ─── Gradient orb background ────────────────────────────────────────
function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#00d4ff]/8 blur-[120px]" />
      <div className="absolute top-[10%] right-[-15%] w-[500px] h-[500px] rounded-full bg-[#7c3aed]/8 blur-[100px]" />
      <div className="absolute bottom-[5%] left-[20%] w-[400px] h-[400px] rounded-full bg-[#00d4ff]/5 blur-[80px]" />
    </div>
  )
}

// ─── Grid overlay ────────────────────────────────────────────────────
function GridOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  )
}

// ─── HERO ────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 overflow-hidden">
      <GradientOrbs />
      <GridOverlay />

      <FadeIn delay={0}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00d4ff]/30 bg-[#00d4ff]/5 mb-10">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
          <span className="text-[#00d4ff] text-xs font-medium tracking-widest uppercase">
            Testnet Launch — 2025
          </span>
        </div>
      </FadeIn>

      <FadeIn delay={0.08}>
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-[1.04] tracking-tight max-w-5xl mx-auto">
          Infrastructure for
          <br />
          <span className="bg-gradient-to-r from-[#00d4ff] via-[#7c3aed] to-[#00d4ff] bg-clip-text text-transparent animate-gradient" style={{backgroundSize:'200% auto'}}>
            Verified Rights
          </span>
        </h1>
      </FadeIn>

      <FadeIn delay={0.16}>
        <p className="mt-8 text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
          DRP is a blockchain protocol that verifies human activity, attests identity,
          and enables fair resource distribution — starting with Ghana, built for the world.
        </p>
      </FadeIn>

      <FadeIn delay={0.24}>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link href="/about"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#00d4ff] text-black font-semibold text-sm tracking-wide hover:bg-white transition-all duration-300">
            Explore the Protocol
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/whitepaper"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white/70 font-medium text-sm tracking-wide hover:border-[#00d4ff]/50 hover:text-white transition-all duration-300">
            Read Whitepaper
          </Link>
        </div>
      </FadeIn>

      <FadeIn delay={0.32}>
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {[
            { label: 'UN SDGs Aligned', val: 11, suffix: '' },
            { label: 'Protocol Version', val: 5, suffix: '.0' },
            { label: 'Countries Targeted', val: 54, suffix: '+' },
            { label: 'PQC Algorithms', val: 2, suffix: '' },
          ].map((s, i) => (
            <div key={i} className="bg-[#030308] px-8 py-6 text-center">
              <div className="text-3xl font-bold text-white mb-1">
                <Counter end={s.val} suffix={s.suffix} />
              </div>
              <div className="text-xs text-white/30 tracking-widest uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.5}>
        <div className="mt-16 flex flex-col items-center gap-2 text-white/20">
          <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-[#00d4ff]/40 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </FadeIn>
    </section>
  )
}

// ─── HOW IT WORKS ────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { num: '01', title: 'Submit Activity', desc: 'Users document real-world actions — farming, education, healthcare, civic work. Every activity generates a verifiable proof.', href: '/about', accent: '#00d4ff' },
    { num: '02', title: 'AI Verification', desc: 'DRP\'s AI scoring engine validates submissions using contextual, privacy-preserving models. No personal data exposed.', href: '/ai-governance', accent: '#7c3aed' },
    { num: '03', title: 'On-Chain Attestation', desc: 'Verified proofs are written to the blockchain — immutable, auditable, permanent. Rights infrastructure that cannot be erased.', href: '/docs/protocol', accent: '#00d4ff' },
    { num: '04', title: 'Access & Rewards', desc: 'Verified participants earn $DeRi tokens, unlock services, and gain governance power via $RIGHTS. Contribution becomes currency.', href: '/tokens', accent: '#ffd700' },
  ]

  return (
    <section className="relative py-32 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-[#00d4ff]/70 mb-4 block">How It Works</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white max-w-xl leading-tight">
              From activity to verified right in four steps
            </h2>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {steps.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.07}>
              <Link href={s.href} className="group block bg-[#030308] p-8 hover:bg-white/[0.025] transition-colors duration-500 h-full">
                <span className="text-5xl font-bold text-white/5 font-mono block mb-6">{s.num}</span>
                <div className="w-8 h-[2px] mb-5 transition-all duration-500 group-hover:w-14" style={{ backgroundColor: s.accent }} />
                <h3 className="text-lg font-semibold text-white mb-3">{s.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-xs text-white/30 group-hover:text-[#00d4ff] transition-colors">
                  Learn more <ChevronRight className="w-3 h-3" />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CORE PILLARS ────────────────────────────────────────────────────
function Pillars() {
  const pillars = [
    { icon: Shield, title: 'Proof of Status', desc: 'Portable, privacy-preserving attestations that verify trust, identity, and capability across institutions and borders.', href: '/about', color: '#00d4ff' },
    { icon: Zap, title: 'Proof of Activity', desc: 'On-chain evidence of meaningful participation. Contributions become permanent, immutable records of human impact.', href: '/about', color: '#7c3aed' },
    { icon: Users, title: 'AI Governance', desc: 'Decision-support agents improve transparency, proposal quality, and institutional memory. Human judgment, amplified.', href: '/ai-governance', color: '#00d4ff' },
    { icon: Lock, title: 'Post-Quantum Security', desc: 'CRYSTALS-Kyber and Dilithium cryptography ensures your rights infrastructure survives the quantum era.', href: '/docs/security', color: '#ffd700' },
    { icon: Globe, title: 'UN SDG Alignment', desc: 'Every protocol decision maps to Sustainable Development Goals — a rights infrastructure that advances human flourishing.', href: '/ecosystem', color: '#00ff88' },
    { icon: CheckCircle, title: 'Transparent Verification', desc: 'Verifiable, auditable flows for identity and action provenance. No black boxes, no gatekeepers.', href: '/docs/protocol', color: '#00d4ff' },
  ]

  return (
    <section className="relative py-32 px-6 border-t border-white/5 overflow-hidden">
      <GradientOrbs />
      <div className="max-w-6xl mx-auto relative">
        <FadeIn>
          <div className="mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-[#00d4ff]/70 mb-4 block">Core Protocol</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white max-w-xl leading-tight">
              Six pillars of a rights-first infrastructure
            </h2>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {pillars.map((p, i) => {
            const Icon = p.icon
            return (
              <FadeIn key={p.title} delay={i * 0.06}>
                <Link href={p.href} className="group block bg-[#030308] p-8 hover:bg-white/[0.025] transition-all duration-500 h-full">
                  <div className="w-10 h-10 border flex items-center justify-center mb-6 transition-all duration-500"
                    style={{ borderColor: p.color + '40', backgroundColor: p.color + '10' }}>
                    <Icon className="w-5 h-5" style={{ color: p.color }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{p.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{p.desc}</p>
                  <div className="mt-5 w-6 h-[1px] bg-white/10 group-hover:w-12 group-hover:bg-[#00d4ff]/50 transition-all duration-500" />
                </Link>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── TOKEN ECONOMY ───────────────────────────────────────────────────
function Tokens() {
  return (
    <section className="py-32 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-[#00d4ff]/70 mb-4 block">Token Economy</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white max-w-xl leading-tight">Two tokens, one mission</h2>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
          <FadeIn delay={0}>
            <div className="bg-[#030308] p-10 border-l-2 border-[#ffd700] h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full border-2 border-[#ffd700] flex items-center justify-center">
                  <span className="text-[#ffd700] font-bold text-sm">R</span>
                </div>
                <div>
                  <div className="text-white font-bold text-xl">$RIGHTS</div>
                  <div className="text-white/30 text-sm">Governance Token</div>
                </div>
              </div>
              <p className="text-white/50 leading-relaxed mb-6">The governance backbone of DRP. $RIGHTS holders vote on protocol upgrades, resource allocation, and policy decisions.</p>
              <ul className="space-y-2 mb-8">
                {['Protocol voting power', 'Elder Council access', 'Treasury governance', 'Policy proposals'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/40">
                    <div className="w-1 h-1 rounded-full bg-[#ffd700]" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/tokens" className="inline-flex items-center gap-2 text-[#ffd700] text-sm hover:gap-4 transition-all">Token details <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="bg-[#030308] p-10 border-l-2 border-[#00d4ff] h-full">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full border-2 border-[#00d4ff] flex items-center justify-center">
                  <span className="text-[#00d4ff] font-bold text-sm">D</span>
                </div>
                <div>
                  <div className="text-white font-bold text-xl">$DeRi</div>
                  <div className="text-white/30 text-sm">Utility Token</div>
                </div>
              </div>
              <p className="text-white/50 leading-relaxed mb-6">The fuel of the DRP ecosystem. $DeRi is earned through verified activity and spent to access services and unlock capabilities.</p>
              <ul className="space-y-2 mb-8">
                {['Proof submission fees', 'Service access passes', 'Activity rewards', 'Cross-border transfers'].map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/40">
                    <div className="w-1 h-1 rounded-full bg-[#00d4ff]" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/tokens" className="inline-flex items-center gap-2 text-[#00d4ff] text-sm hover:gap-4 transition-all">Token details <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

// ─── ECOSYSTEM ───────────────────────────────────────────────────────
function Ecosystem() {
  const items = [
    { emoji: '🌾', title: 'Agriculture', desc: 'Farmers verify crop yields, land rights, and supply chain contributions.', href: '/ecosystem' },
    { emoji: '📚', title: 'Education', desc: 'Students prove learning milestones and skill acquisition on-chain.', href: '/ecosystem' },
    { emoji: '🏥', title: 'Healthcare', desc: 'Health workers document service delivery in underserved communities.', href: '/ecosystem' },
    { emoji: '⚖️', title: 'Governance', desc: 'Citizens participate in verified democratic and policy processes.', href: '/ecosystem' },
    { emoji: '♻️', title: 'Sustainability', desc: 'Environmental actions earn verifiable green credentials.', href: '/ecosystem' },
    { emoji: '🏗️', title: 'Infrastructure', desc: 'Community builders prove contribution to public goods projects.', href: '/ecosystem' },
  ]
  return (
    <section className="py-32 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs tracking-[0.3em] uppercase text-[#00d4ff]/70 mb-4 block">Ecosystem</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-white max-w-lg leading-tight">Rights infrastructure for every human activity</h2>
            </div>
            <Link href="/ecosystem" className="inline-flex items-center gap-2 text-white/40 text-sm hover:text-[#00d4ff] transition-colors shrink-0">View full ecosystem <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.05}>
              <Link href={item.href} className="group block p-6 border border-white/5 hover:border-[#00d4ff]/30 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-400">
                <div className="text-3xl mb-4">{item.emoji}</div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── ROADMAP ─────────────────────────────────────────────────────────
function Roadmap() {
  const phases = [
    { phase: 'Phase 0', title: 'Genesis', status: 'complete', desc: 'Protocol design, whitepaper v0.5, smart contract architecture, team formation.' },
    { phase: 'Phase 1', title: 'Testnet', status: 'active', desc: 'DRP testnet launch, proof submission MVP, AI scoring engine, community onboarding.' },
    { phase: 'Phase 2', title: 'Mainnet Alpha', status: 'upcoming', desc: 'Mainnet deployment, token launch, partner integrations, Ghana pilot program.' },
    { phase: 'Phase 3', title: 'Expansion', status: 'upcoming', desc: 'Pan-African rollout, UN SDG verification, cross-chain bridges, AI Elder deployment.' },
  ]
  return (
    <section className="relative py-32 px-6 border-t border-white/5 overflow-hidden">
      <GradientOrbs />
      <div className="max-w-6xl mx-auto relative">
        <FadeIn>
          <div className="mb-16">
            <span className="text-xs tracking-[0.3em] uppercase text-[#00d4ff]/70 mb-4 block">Roadmap</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white max-w-xl leading-tight">The path to a verified world</h2>
          </div>
        </FadeIn>
        <div className="space-y-0">
          {phases.map((p, i) => (
            <FadeIn key={p.phase} delay={i * 0.08}>
              <div className="flex flex-col lg:flex-row items-start gap-6 py-8 border-b border-white/5 last:border-b-0">
                <div className="lg:w-24 shrink-0"><span className="text-xs font-mono text-white/20">{p.phase}</span></div>
                <div className="flex items-start gap-6 flex-1">
                  <div className="relative shrink-0 mt-1">
                    <div className={`w-3 h-3 rounded-full border-2 ${
                      p.status === 'complete' ? 'bg-[#00ff88] border-[#00ff88]' :
                      p.status === 'active' ? 'bg-[#00d4ff] border-[#00d4ff] shadow-[0_0_12px_#00d4ff]' :
                      'bg-transparent border-white/20'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                      {p.status === 'active' && <span className="text-xs px-2 py-0.5 bg-[#00d4ff]/15 text-[#00d4ff] border border-[#00d4ff]/30">Live</span>}
                      {p.status === 'complete' && <span className="text-xs px-2 py-0.5 bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20">Complete</span>}
                    </div>
                    <p className="text-sm text-white/40 leading-relaxed max-w-xl">{p.desc}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.2}>
          <div className="mt-10">
            <Link href="/roadmap" className="inline-flex items-center gap-3 text-white/40 text-sm hover:text-[#00d4ff] transition-colors">View full roadmap <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── COMMUNITY ───────────────────────────────────────────────────────
function Community() {
  return (
    <section className="py-32 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {[
            { emoji: '📖', title: 'Learn DRP', desc: 'Understand the protocol from the ground up. From rights theory to smart contract architecture.', href: '/learn', cta: 'Start learning' },
            { emoji: '⚙️', title: 'Build on DRP', desc: 'Access the protocol docs, API references, and SDK to integrate DRP into your application.', href: '/docs', cta: 'Read the docs' },
            { emoji: '🤝', title: 'Join Community', desc: 'Connect with builders, researchers, and rights advocates shaping the future of human governance.', href: '/community', cta: 'Get involved' },
          ].map((c, i) => (
            <FadeIn key={c.title} delay={i * 0.06}>
              <Link href={c.href} className="group block bg-[#030308] p-10 hover:bg-white/[0.025] transition-colors duration-500 h-full">
                <div className="text-4xl mb-6">{c.emoji}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{c.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed mb-6">{c.desc}</p>
                <div className="inline-flex items-center gap-2 text-[#00d4ff] text-sm group-hover:gap-4 transition-all">{c.cta} <ArrowRight className="w-4 h-4" /></div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── FINAL CTA ───────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="py-32 px-6 border-t border-white/5 relative overflow-hidden">
      <GradientOrbs />
      <div className="max-w-4xl mx-auto text-center relative">
        <FadeIn>
          <Image src="/DRP.png" alt="DRP Logo" width={64} height={64} className="mx-auto mb-8 opacity-80" />
          <h2 className="text-5xl sm:text-6xl font-bold text-white leading-[1.05] mb-6">
            The future of rights is
            <br />
            <span className="bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] bg-clip-text text-transparent">verifiable</span>
          </h2>
          <p className="text-white/40 mb-12 max-w-lg mx-auto text-lg leading-relaxed">
            Join the protocol. Submit your first proof. Be part of the infrastructure that makes human rights legible, portable, and permanent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about" className="group inline-flex items-center gap-3 px-8 py-4 bg-[#00d4ff] text-black font-semibold text-sm tracking-wide hover:bg-white transition-all duration-300">
              Explore DRP <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="https://app.decentralizedrights.com" className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 text-white/70 font-medium text-sm tracking-wide hover:border-[#00d4ff]/50 hover:text-white transition-all duration-300">
              Launch App <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ─── ROOT EXPORT ─────────────────────────────────────────────────────
export function DRPHomePage() {
  return (
    <main className="min-h-screen bg-[#030308] text-white antialiased">
      <Hero />
      <HowItWorks />
      <Pillars />
      <Tokens />
      <Ecosystem />
      <Roadmap />
      <Community />
      <FinalCTA />
    </main>
  )
}
