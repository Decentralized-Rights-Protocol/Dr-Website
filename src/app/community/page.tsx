import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Users, ExternalLink } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo/seo'

export const metadata: Metadata = buildPageMetadata({
  title: 'Community | Decentralized Rights Protocol',
  description: 'Join the DRP community of builders, researchers, and rights advocates. Connect on Discord, GitHub, Twitter, and more.',
  canonical: '/community',
})

const channels = [
  { emoji: '💬', title: 'Discord', desc: 'The primary hub for DRP discussion, support, governance debates, and builder coordination.', href: 'https://discord.gg/zbWg92AnQQ', cta: 'Join Discord', color: '#5865F2' },
  { emoji: '🐙', title: 'GitHub', desc: 'Contribute to the protocol. Open issues, review PRs, and help shape the codebase.', href: 'https://github.com/Decentralized-Rights-Protocol', cta: 'Contribute', color: '#00e5cc' },
  { emoji: '✕', title: 'X / Twitter', desc: 'Follow @De_Rights for protocol updates, announcements, and community highlights.', href: 'https://twitter.com/De_Rights', cta: 'Follow @De_Rights', color: '#00bfff' },
  { emoji: '📸', title: 'Instagram', desc: 'Visual storytelling about rights infrastructure, the DRP mission, and community impact.', href: 'https://instagram.com/decentralized_rights', cta: 'Follow', color: '#E1306C' },
  { emoji: '💼', title: 'LinkedIn', desc: 'Connect professionally. Follow for research papers, partnership news, and ecosystem updates.', href: 'https://linkedin.com/company/Decentralized-Rights-Protocol', cta: 'Connect', color: '#0A66C2' },
  { emoji: '📧', title: 'Email', desc: 'For partnerships, press, research collaborations, and institutional inquiries.', href: 'mailto:contact@decentralizedrights.com', cta: 'Send email', color: '#00e5cc' },
]

const roles = [
  { title: 'Builder', desc: 'Developers integrating DRP into applications, contributing to the codebase, and building ecosystem tools.', action: 'Read Docs', href: '/docs' },
  { title: 'Researcher', desc: 'Academics, policy analysts, and researchers studying rights infrastructure, post-quantum cryptography, and governance.', action: 'Read Whitepaper', href: '/whitepaper' },
  { title: 'Rights Advocate', desc: "Activists, NGOs, and institutions working to bring DRP's verification infrastructure to communities that need it most.", action: 'Learn About DRP', href: '/about' },
  { title: 'Validator / Elder', desc: 'Node operators and verified contributors who participate in consensus and governance through the Elder Quorum system.', action: 'View Roadmap', href: '/roadmap' },
]

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#030308] text-gray-900 dark:text-white pt-20">
      <section className="max-w-6xl mx-auto px-6 py-20 border-b border-gray-100 dark:border-white/5">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#00e5cc]/40 bg-[#00e5cc]/8 mb-8">
            <Users className="w-3.5 h-3.5 text-[#00e5cc]" />
            <span className="text-[#00e5cc] text-xs font-medium tracking-widest uppercase">Community</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white leading-tight mb-6">
            Build the future of rights — together.
          </h1>
          <p className="text-gray-600 dark:text-white/50 text-lg leading-relaxed mb-10">
            DRP is a protocol built by its community. Researchers, engineers, advocates, and validators worldwide are shaping the infrastructure for human rights in the digital age.
          </p>
          <Link href="https://discord.gg/zbWg92AnQQ" target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-7 py-4 bg-[#00e5cc] text-black font-bold text-sm tracking-wide hover:bg-[#00bfff] transition-all duration-300">
            Join Discord <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24 border-b border-gray-100 dark:border-white/5">
        <div className="mb-14">
          <span className="text-xs tracking-[0.3em] uppercase text-[#00e5cc]/70 mb-4 block">Connect</span>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white">Find your platform</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {channels.map((c) => (
            <a key={c.title} href={c.href} target="_blank" rel="noopener noreferrer"
              className="group block p-7 border border-gray-100 dark:border-white/5 hover:border-[#00e5cc]/30 bg-gray-50 dark:bg-white/[0.02] hover:bg-gray-100 dark:hover:bg-white/[0.04] transition-all duration-300">
              <div className="text-3xl mb-5">{c.emoji}</div>
              <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-3">{c.title}</h3>
              <p className="text-gray-500 dark:text-white/40 text-sm leading-relaxed mb-6">{c.desc}</p>
              <div className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all" style={{ color: c.color }}>
                {c.cta} <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24 border-b border-gray-100 dark:border-white/5">
        <div className="mb-14">
          <span className="text-xs tracking-[0.3em] uppercase text-[#00e5cc]/70 mb-4 block">Who You Are</span>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white">Every role matters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 dark:bg-white/5">
          {roles.map((r, i) => (
            <div key={r.title} className="bg-white dark:bg-[#030308] p-10">
              <div className="text-xs font-mono text-gray-300 dark:text-white/15 mb-5">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4">{r.title}</h3>
              <p className="text-gray-500 dark:text-white/40 text-sm leading-relaxed mb-8">{r.desc}</p>
              <Link href={r.href} className="inline-flex items-center gap-2 text-[#00e5cc] text-sm hover:gap-4 transition-all">
                {r.action} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 text-center bg-gray-50 dark:bg-transparent border-t border-gray-100 dark:border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Ready to contribute?</h2>
          <p className="text-gray-500 dark:text-white/40 mb-10">Every contribution — code, research, advocacy — is tracked and rewarded through DRP&apos;s proof system.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/docs/contributing"
              className="inline-flex items-center gap-3 px-7 py-4 bg-[#00e5cc] text-black font-bold text-sm hover:bg-[#00bfff] transition-all">
              Contribution Guide <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="https://github.com/Decentralized-Rights-Protocol" target="_blank"
              className="inline-flex items-center gap-3 px-7 py-4 border border-gray-200 dark:border-white/15 text-gray-600 dark:text-white/60 text-sm hover:text-gray-900 dark:hover:text-white transition-colors">
              View GitHub <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
