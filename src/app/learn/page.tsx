import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Zap, Star, Lock, CheckCircle } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Learn DRP | Decentralized Rights Protocol',
  description: 'Master the Decentralized Rights Protocol. Five structured learning paths with real $DeRi token rewards and on-chain credentials.',
  canonical: '/learn',
})

const levels = [
  { num: '01', title: 'Blockchain Foundations', color: '#00e5cc', href: '/lessons/what-is-blockchain',
    lessons: ['What is Blockchain?', 'Cryptography & Hashing', 'Smart Contracts 101', 'Consensus Mechanisms'],
    desc: 'Start here. Understand the fundamentals that power DRP.' },
  { num: '02', title: 'DRP Core Protocol', color: '#00bfff', href: '/lessons/drp-architecture',
    lessons: ['DRP Architecture', 'Activity Proofs (PoAT)', 'Status Proofs (PoST)', 'Elder Quorum System'],
    desc: 'Go deep on what makes DRP unique — the proof system, verification layer, and consensus.' },
  { num: '03', title: 'Building on DRP', color: '#00e5cc', href: '/lessons/drp-development-kit',
    lessons: ['DRP Development Kit', 'Building dApps', 'Contributing to DRP', 'Testing & Deployment'],
    desc: 'Start building. Integrate DRP proofs into your application.' },
  { num: '04', title: 'Real-World Applications', color: '#00bfff', href: '/lessons/identity-access-management',
    lessons: ['Identity & Access', 'Supply Chain', 'Cross-chain Interoperability', 'Enterprise Integration'],
    desc: 'See DRP in the wild. Real use cases across agriculture, healthcare, governance, and more.' },
  { num: '05', title: 'Advanced DRP', color: '#ffd700', href: '/lessons/advanced-drp-concepts',
    lessons: ['Advanced Concepts', 'Economic Models', 'Governance Mechanisms', 'Future of DRP'],
    desc: 'For contributors and researchers. Go to the frontier of rights infrastructure.' },
]

const perks = [
  { icon: Zap, title: 'Earn $DeRi', desc: 'Every completed lesson rewards you with $DeRi utility tokens.' },
  { icon: Star, title: 'XP & Badges', desc: 'Level up your profile with XP, achievements, and role badges.' },
  { icon: CheckCircle, title: 'On-chain Credentials', desc: 'Completed levels are verifiable proof of your knowledge on-chain.' },
  { icon: Lock, title: 'Unlock Features', desc: 'Learning progress unlocks app features, governance access, and more.' },
]

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#030308] text-gray-900 dark:text-white pt-20">
      <section className="max-w-6xl mx-auto px-6 py-20 border-b border-gray-100 dark:border-white/5">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#00e5cc]/40 bg-[#00e5cc]/8 mb-8">
            <BookOpen className="w-3.5 h-3.5 text-[#00e5cc]" />
            <span className="text-[#00e5cc] text-xs font-medium tracking-widest uppercase">Learning Hub</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white leading-tight mb-6">
            Learn DRP.<br /><span className="text-[#00e5cc]">Earn as you go.</span>
          </h1>
          <p className="text-gray-600 dark:text-white/50 text-xl leading-relaxed mb-10 max-w-2xl">
            Five structured learning paths, on-chain credentials, and real token rewards for every milestone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/lessons/what-is-blockchain"
              className="group inline-flex items-center gap-3 px-7 py-4 bg-[#00e5cc] text-black font-bold text-sm tracking-wide hover:bg-[#00bfff] transition-all duration-300">
              Start Learning <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="https://app.decentralizedrights.com" target="_blank"
              className="inline-flex items-center gap-3 px-7 py-4 border border-gray-200 dark:border-white/15 text-gray-600 dark:text-white/60 text-sm hover:text-gray-900 dark:hover:text-white hover:border-[#00e5cc]/40 transition-all">
              Track Progress in App
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 dark:bg-white/5">
            {perks.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.title} className="bg-white dark:bg-[#030308] p-8">
                  <Icon className="w-5 h-5 text-[#00e5cc] mb-4" />
                  <h3 className="text-gray-900 dark:text-white font-semibold mb-2 text-sm">{p.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-white/35 leading-relaxed">{p.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="mb-14">
          <span className="text-xs tracking-[0.3em] uppercase text-[#00e5cc]/70 mb-4 block">Curriculum</span>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white">Five learning levels</h2>
        </div>
        <div className="space-y-0">
          {levels.map((lv) => (
            <Link key={lv.num} href={lv.href}
              className="group flex flex-col md:flex-row items-start gap-8 py-10 border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/[0.015] transition-colors px-4 -mx-4">
              <div className="md:w-24 shrink-0 text-5xl font-black text-gray-100 dark:text-white/5 font-mono">{lv.num}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-[2px] group-hover:w-14 transition-all duration-300" style={{ backgroundColor: lv.color }} />
                  <h3 className="text-xl font-black text-gray-900 dark:text-white">{lv.title}</h3>
                </div>
                <p className="text-gray-500 dark:text-white/40 text-sm mb-5 max-w-xl">{lv.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {lv.lessons.map((ls) => (
                    <span key={ls} className="text-xs px-3 py-1 border border-gray-200 dark:border-white/8 text-gray-400 dark:text-white/30">{ls}</span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-2 text-sm mt-2 group-hover:gap-4 transition-all" style={{ color: lv.color }}>
                Start level <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-gray-100 dark:border-white/5 py-24 px-6 text-center bg-gray-50 dark:bg-transparent">
        <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Ready to verify your knowledge?</h2>
        <p className="text-gray-500 dark:text-white/40 mb-10 max-w-md mx-auto">Connect your wallet to track progress, earn $DeRi, and get on-chain credentials.</p>
        <Link href="https://app.decentralizedrights.com" target="_blank"
          className="inline-flex items-center gap-3 px-8 py-4 bg-[#00e5cc] text-black font-bold text-sm tracking-wide hover:bg-[#00bfff] transition-all duration-300">
          Launch App <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </main>
  )
}
