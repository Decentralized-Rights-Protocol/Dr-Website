import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight, BookOpen, Zap, Star, CheckCircle,
  Trophy, Target, Award, Brain, Rocket, Shield,
  ChevronRight, Users, Globe, Sparkles
} from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo/seo'
import NewsletterTally from '@/components/NewsletterTally'

export const metadata: Metadata = buildPageMetadata({
  title: 'Learn DRP | Decentralized Rights Protocol',
  description: 'Master the Decentralized Rights Protocol through 5 gamified learning paths. Earn $DeRi tokens, unlock badges, and gain on-chain credentials.',
  canonical: '/learn',
})

const levels = [
  { num: '01', title: 'Blockchain Foundations', color: '#00e5cc', bg: 'from-[#00e5cc]/10 to-[#00e5cc]/5', border: 'border-[#00e5cc]/30', href: '/lessons/what-is-blockchain', xp: 80, reward: '80 $DeRi', badge: '\uD83D\uDD17', badgeLabel: 'Chain Explorer',
    lessons: [
      { title: 'What is Blockchain?', duration: '25m', reward: '20', slug: 'what-is-blockchain' },
      { title: 'Cryptography & Hashing', duration: '20m', reward: '15', slug: 'cryptography-and-hashing' },
      { title: 'Consensus Mechanisms', duration: '25m', reward: '20', slug: 'consensus-mechanisms' },
      { title: 'Smart Contracts 101', duration: '30m', reward: '25', slug: 'smart-contracts-101' },
    ],
    desc: 'Start here. Understand the fundamentals that power DRP and every modern blockchain.',
  },
  { num: '02', title: 'DRP Core Protocol', color: '#00bfff', bg: 'from-[#00bfff]/10 to-[#00bfff]/5', border: 'border-[#00bfff]/30', href: '/lessons/drp-architecture', xp: 100, reward: '95 $DeRi', badge: '\u26A1', badgeLabel: 'Protocol Scholar',
    lessons: [
      { title: 'DRP Architecture', duration: '25m', reward: '20', slug: 'drp-architecture' },
      { title: 'Activity Proofs (PoAT)', duration: '35m', reward: '30', slug: 'activity-proofs' },
      { title: 'Status Proofs (PoST)', duration: '25m', reward: '20', slug: 'post-poat-consensus' },
      { title: 'Elder Quorum System', duration: '30m', reward: '25', slug: 'elder-quorum-system' },
    ],
    desc: 'Go deep on what makes DRP unique \u2014 the proof system, verification layer, and consensus.',
  },
  { num: '03', title: 'Building on DRP', color: '#a855f7', bg: 'from-purple-500/10 to-purple-500/5', border: 'border-purple-500/30', href: '/lessons/drp-development-kit', xp: 120, reward: '110 $DeRi', badge: '\uD83D\uDEE0\uFE0F', badgeLabel: 'DRP Builder',
    lessons: [
      { title: 'DRP Development Kit', duration: '30m', reward: '25', slug: 'drp-development-kit' },
      { title: 'Building dApps', duration: '40m', reward: '35', slug: 'building-dapps' },
      { title: 'Contributing to DRP', duration: '25m', reward: '20', slug: 'contributing-to-drp' },
      { title: 'Testing & Deployment', duration: '35m', reward: '30', slug: 'testing-and-deployment' },
    ],
    desc: 'Start building. Integrate DRP proofs into your app and ship to testnet.',
  },
  { num: '04', title: 'Real-World Applications', color: '#f59e0b', bg: 'from-amber-500/10 to-amber-500/5', border: 'border-amber-500/30', href: '/lessons/identity-access-management', xp: 140, reward: '130 $DeRi', badge: '\uD83C\uDF0D', badgeLabel: 'Impact Pioneer',
    lessons: [
      { title: 'Identity & Access', duration: '30m', reward: '25', slug: 'identity-access-management' },
      { title: 'Supply Chain', duration: '35m', reward: '30', slug: 'supply-chain-applications' },
      { title: 'Cross-chain Interop', duration: '40m', reward: '35', slug: 'cross-chain-interoperability' },
      { title: 'Enterprise Integration', duration: '35m', reward: '40', slug: 'enterprise-integration' },
    ],
    desc: 'See DRP in the wild. Real use cases across agriculture, healthcare, governance, and beyond.',
  },
  { num: '05', title: 'Advanced DRP', color: '#ffd700', bg: 'from-yellow-400/10 to-yellow-400/5', border: 'border-yellow-400/30', href: '/lessons/advanced-drp-concepts', xp: 200, reward: '200 $DeRi', badge: '\uD83D\uDC51', badgeLabel: 'DRP Elder',
    lessons: [
      { title: 'Advanced Concepts', duration: '45m', reward: '50', slug: 'advanced-drp-concepts' },
      { title: 'Economic Models', duration: '40m', reward: '45', slug: 'economic-models' },
      { title: 'Governance Mechanisms', duration: '35m', reward: '50', slug: 'governance-mechanisms' },
      { title: 'Future of DRP', duration: '30m', reward: '55', slug: 'future-of-drp' },
    ],
    desc: 'For contributors and researchers. Go to the frontier of rights infrastructure.',
  },
]

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#030308] text-gray-900 dark:text-white pt-20">
      {/* Hero */}
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
              className="group inline-flex items-center gap-3 px-7 py-4 bg-[#00e5cc] text-black font-bold text-sm tracking-wide hover:bg-[#00bfff] transition-all">
              <Rocket className="w-4 h-4" /> Start Learning <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="https://app.decentralizedrights.com" target="_blank"
              className="inline-flex items-center gap-3 px-7 py-4 border border-gray-200 dark:border-white/15 text-gray-600 dark:text-white/60 text-sm hover:border-[#00e5cc]/40 hover:text-gray-900 dark:hover:text-white transition-all">
              <Trophy className="w-4 h-4" /> Track Progress in App
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 dark:bg-white/5">
            {[
              { label: 'Lessons', value: '20', icon: BookOpen },
              { label: 'Learning Paths', value: '5', icon: Target },
              { label: '$DeRi to Earn', value: '615', icon: Zap },
              { label: 'On-chain Badges', value: '5', icon: Award },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-white dark:bg-[#030308] px-8 py-7 flex items-center gap-4">
                <Icon className="w-5 h-5 text-[#00e5cc] shrink-0" />
                <div>
                  <div className="text-2xl font-black text-gray-900 dark:text-white">{value}</div>
                  <div className="text-xs text-gray-400 dark:text-white/30 uppercase tracking-widest">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why learn */}
      <section className="border-b border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 mb-10">
            <Sparkles className="w-4 h-4 text-[#00e5cc]" />
            <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 dark:text-white/30">Why Learn with DRP</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Earn $DeRi', desc: 'Every completed lesson rewards you with $DeRi utility tokens.', color: '#00e5cc' },
              { icon: Star, title: 'XP & Badges', desc: 'Level up with XP, achievement badges, and unique role titles.', color: '#ffd700' },
              { icon: CheckCircle, title: 'On-chain Creds', desc: 'Completed levels create verifiable proof of knowledge stored on-chain.', color: '#00bfff' },
              { icon: Trophy, title: 'Unlock Features', desc: 'Learning progress unlocks app features and Elder-tier privileges.', color: '#a855f7' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="p-6 border border-gray-100 dark:border-white/8 bg-gray-50 dark:bg-[#0a0a14] hover:border-[#00e5cc]/30 transition-all">
                <div className="w-10 h-10 flex items-center justify-center mb-5 border" style={{ borderColor: `${color}30`, backgroundColor: `${color}10` }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <h3 className="text-gray-900 dark:text-white font-bold mb-2 text-sm">{title}</h3>
                <p className="text-xs text-gray-500 dark:text-white/35 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="border-b border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-center gap-2 mb-10">
            <Brain className="w-4 h-4 text-[#00e5cc]" />
            <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 dark:text-white/30">Learning Paths</h2>
          </div>
          <div className="space-y-6">
            {levels.map((level) => (
              <div key={level.num} className={`border ${level.border} bg-gradient-to-r ${level.bg} transition-all`}>
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="lg:w-80 shrink-0">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-4xl font-black" style={{ color: level.color, opacity: 0.25 }}>{level.num}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{level.badge}</span>
                            <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: level.color }}>{level.badgeLabel}</span>
                          </div>
                          <h3 className="text-xl font-black text-gray-900 dark:text-white">{level.title}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-white/40 leading-relaxed mb-4">{level.desc}</p>
                      <div className="flex items-center gap-4 mb-5">
                        <div className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" style={{ color: level.color }} /><span className="text-xs font-bold" style={{ color: level.color }}>{level.reward}</span></div>
                        <div className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-[#ffd700]" /><span className="text-xs text-gray-400 dark:text-white/30">{level.xp} XP</span></div>
                        <div className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-gray-400 dark:text-white/30" /><span className="text-xs text-gray-400 dark:text-white/30">{level.lessons.length} lessons</span></div>
                      </div>
                      <Link href={level.href} className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-wide text-black transition-all" style={{ backgroundColor: level.color }}>
                        Start Path {level.num} <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {level.lessons.map((lesson, lIdx) => (
                        <Link key={lesson.slug} href={`/lessons/${lesson.slug}`}
                          className="flex items-center gap-3 p-3.5 bg-white/60 dark:bg-[#030308]/50 border border-white/40 dark:border-white/5 hover:border-[#00e5cc]/30 transition-all">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0"
                            style={{ backgroundColor: `${level.color}20`, color: level.color }}>{lIdx + 1}</div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-gray-900 dark:text-white truncate hover:text-[#00e5cc] transition-colors">{lesson.title}</div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[11px] text-gray-400 dark:text-white/25">{lesson.duration}</span>
                              <span className="text-[11px]" style={{ color: level.color }}>+{lesson.reward} $DeRi</span>
                            </div>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-gray-300 dark:text-white/20 shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tutor + Leaderboard */}
      <section className="border-b border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-3"><Trophy className="w-4 h-4 text-[#ffd700]" /><span className="text-xs font-bold tracking-widest uppercase text-gray-400 dark:text-white/30">Global Leaderboard</span></div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Top Learners Worldwide</h2>
              <p className="text-gray-500 dark:text-white/40 text-sm leading-relaxed mb-8">Compete globally, earn XP, and claim your spot on the on-chain leaderboard.</p>
              <div className="space-y-2">
                {[
                  { rank: 1, name: 'Elder_Ghana', xp: 2480, badge: '\uD83D\uDC51' },
                  { rank: 2, name: 'ChainBuilder_KE', xp: 1920, badge: '\uD83D\uDEE0\uFE0F' },
                  { rank: 3, name: 'DRP_Pioneer', xp: 1650, badge: '\u26A1' },
                  { rank: 4, name: 'RightsNode_NG', xp: 1240, badge: '\uD83D\uDD17' },
                  { rank: 5, name: 'ProtocolSage', xp: 980, badge: '\uD83C\uDF0D' },
                ].map((e) => (
                  <div key={e.rank} className={`flex items-center gap-4 p-4 border ${e.rank === 1 ? 'border-[#ffd700]/30 bg-[#ffd700]/5' : 'border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#0a0a14]'}`}>
                    <span className={`text-sm font-black w-6 text-center ${e.rank === 1 ? 'text-[#ffd700]' : 'text-gray-400 dark:text-white/25'}`}>#{e.rank}</span>
                    <span className="text-lg">{e.badge}</span>
                    <span className="flex-1 text-sm font-semibold text-gray-900 dark:text-white">{e.name}</span>
                    <div className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-[#ffd700]" /><span className="text-xs font-bold text-gray-600 dark:text-white/50">{e.xp.toLocaleString()} XP</span></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-[#00e5cc]/20 bg-gradient-to-br from-[#00e5cc]/5 via-transparent to-[#00bfff]/5 p-8">
              <div className="w-12 h-12 bg-[#00e5cc]/10 border border-[#00e5cc]/20 flex items-center justify-center mb-6"><Brain className="w-6 h-6 text-[#00e5cc]" /></div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#00e5cc]/10 border border-[#00e5cc]/20 mb-4"><Sparkles className="w-3 h-3 text-[#00e5cc]" /><span className="text-[10px] font-bold tracking-widest uppercase text-[#00e5cc]">AI-Powered</span></div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">Meet Your AI Tutor</h3>
              <p className="text-gray-500 dark:text-white/40 text-sm leading-relaxed mb-6">Every lesson comes with an intelligent AI tutor that explains concepts in plain language and answers your questions.</p>
              <ul className="space-y-3 mb-8">
                {['Ask anything \u2014 no question is too basic','Diagrams explained in plain language','Quiz hints without spoiling the answer','DRP-specific context in every answer'].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-white/50"><CheckCircle className="w-4 h-4 text-[#00e5cc] shrink-0" />{f}</li>
                ))}
              </ul>
              <Link href="/lessons/what-is-blockchain" className="inline-flex items-center gap-2 px-6 py-3 bg-[#00e5cc] text-black font-bold text-sm hover:bg-[#00bfff] transition-all">
                <Brain className="w-4 h-4" /> Try AI Tutor Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="border-b border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3"><Award className="w-4 h-4 text-[#00e5cc]" /><span className="text-xs font-bold tracking-widest uppercase text-gray-400 dark:text-white/30">Achievements</span></div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white">Unlock Legendary Badges</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { emoji: '\uD83D\uDD17', name: 'Chain Explorer', desc: 'Complete Path 01', color: '#00e5cc' },
              { emoji: '\u26A1', name: 'Protocol Scholar', desc: 'Complete Path 02', color: '#00bfff' },
              { emoji: '\uD83D\uDEE0\uFE0F', name: 'DRP Builder', desc: 'Complete Path 03', color: '#a855f7' },
              { emoji: '\uD83C\uDF0D', name: 'Impact Pioneer', desc: 'Complete Path 04', color: '#f59e0b' },
              { emoji: '\uD83D\uDC51', name: 'DRP Elder', desc: 'All 5 Paths', color: '#ffd700' },
            ].map((badge) => (
              <div key={badge.name} className="flex flex-col items-center p-6 border border-gray-100 dark:border-white/8 bg-gray-50 dark:bg-[#0a0a14] hover:border-[#00e5cc]/30 transition-all text-center">
                <span className="text-4xl mb-3">{badge.emoji}</span>
                <div className="text-xs font-bold text-gray-900 dark:text-white mb-1">{badge.name}</div>
                <div className="text-[11px] text-gray-400 dark:text-white/25">{badge.desc}</div>
                <div className="mt-3 w-full h-0.5" style={{ background: `linear-gradient(to right, transparent, ${badge.color}60, transparent)` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="border-b border-gray-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { href: '/community', icon: Users, title: 'Join Community', desc: 'Connect with learners, builders, and Elders on Discord.', cta: 'Explore Community' },
              { href: '/whitepaper', icon: Shield, title: 'Read the Whitepaper', desc: 'The full technical specification of the Decentralized Rights Protocol.', cta: 'Read Whitepaper' },
              { href: '/glossary', icon: Globe, title: 'DRP Glossary', desc: 'Every DRP term, explained clearly. Your reference while you learn.', cta: 'Open Glossary' },
            ].map(({ href, icon: Icon, title, desc, cta }) => (
              <Link key={href} href={href} className="p-6 border border-gray-100 dark:border-white/8 bg-gray-50 dark:bg-[#0a0a14] hover:border-[#00e5cc]/30 transition-all">
                <Icon className="w-5 h-5 text-[#00e5cc] mb-4" />
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
                <p className="text-xs text-gray-500 dark:text-white/35 leading-relaxed">{desc}</p>
                <div className="flex items-center gap-1 mt-4 text-[#00e5cc] text-xs font-semibold">{cta} <ChevronRight className="w-3.5 h-3.5" /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <NewsletterTally />
      </section>
    </main>
  )
}
