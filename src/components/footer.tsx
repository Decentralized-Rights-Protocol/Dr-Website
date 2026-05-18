import Link from 'next/link'
import Image from 'next/image'
import { Github, Mail, Linkedin, Instagram, ExternalLink } from 'lucide-react'

const social = [
  { name: 'GitHub', href: 'https://github.com/Decentralized-Rights-Protocol', Icon: Github },
  { name: 'X / Twitter', href: 'https://twitter.com/De_Rights', label: 'X' },
  { name: 'Discord', href: 'https://discord.gg/zbWg92AnQQ', label: 'D' },
  { name: 'Instagram', href: 'https://instagram.com/decentralized_rights', Icon: Instagram },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/Decentralized-Rights-Protocol', Icon: Linkedin },
  { name: 'Email', href: 'mailto:contact@decentralizedrights.com', Icon: Mail },
]

const cols = [
  { title: 'Protocol', links: [
    { label: 'About DRP', href: '/about' },
    { label: 'How It Works', href: '/how-drp-works' },
    { label: 'AI Governance', href: '/ai-governance' },
    { label: 'Quantum Security', href: '/quantum-security' },
    { label: 'Philosophy', href: '/philosophy' },
    { label: 'FAQ', href: '/faq' },
  ]},
  { title: 'Ecosystem', links: [
    { label: 'Ecosystem', href: '/ecosystem' },
    { label: 'Token Economy', href: '/tokens' },
    { label: 'Economics', href: '/economics' },
    { label: 'Roadmap', href: '/roadmap' },
    { label: 'Status', href: '/status' },
    { label: 'DRP vs Ethereum', href: '/drp-vs-ethereum' },
  ]},
  { title: 'Developers', links: [
    { label: 'Documentation', href: '/docs' },
    { label: 'Getting Started', href: '/docs/getting-started' },
    { label: 'Protocol Spec', href: '/docs/protocol' },
    { label: 'Security', href: '/docs/security' },
    { label: 'API Reference', href: 'https://api.decentralizedrights.com', external: true },
    { label: 'GitHub Repo', href: 'https://github.com/Decentralized-Rights-Protocol', external: true },
  ]},
  { title: 'Learn & Community', links: [
    { label: 'Learn DRP', href: '/learn' },
    { label: 'Whitepaper', href: '/whitepaper' },
    { label: 'Glossary', href: '/glossary' },
    { label: 'Community', href: '/community' },
    { label: 'Lessons', href: '/lessons/what-is-blockchain' },
    { label: 'What is DRP?', href: '/what-is-drp' },
  ]},
  { title: 'Platform', links: [
    { label: 'Launch App', href: 'https://app.decentralizedrights.com', external: true },
    { label: 'Explorer', href: 'https://explorer.decentralizedrights.com', external: true },
    { label: 'API', href: 'https://api.decentralizedrights.com', external: true },
    { label: 'Privacy Policy', href: '/legal/privacy-policy' },
    { label: 'Terms of Service', href: '/legal/terms-of-service' },
    { label: 'Contact', href: 'mailto:contact@decentralizedrights.com' },
  ]},
]

function SocialBtn({ s }: { s: typeof social[0] }) {
  const { Icon, label } = s as any
  return (
    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name}
      className="w-9 h-9 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-400 dark:text-white/35 hover:border-[#00e5cc]/50 hover:text-[#00e5cc] transition-all duration-200">
      {Icon ? <Icon className="w-4 h-4" /> : <span className="text-xs font-bold">{label}</span>}
    </a>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-gray-100 dark:border-white/5 bg-white dark:bg-[#030308] text-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <Image src="/logo.png" alt="DRP" width={28} height={28} className="opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="font-bold tracking-widest text-xs uppercase text-gray-900 dark:text-white">DRP</span>
            </Link>
            <p className="text-gray-400 dark:text-white/35 text-sm leading-relaxed mb-6 max-w-[200px]">
              Decentralized Rights Protocol — verified rights for every human.
            </p>
            <div className="flex flex-wrap gap-2">
              {social.map((s) => <SocialBtn key={s.name} s={s} />)}
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 dark:text-white/25 mb-5">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}
                      target={(l as any).external ? '_blank' : undefined}
                      rel={(l as any).external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-gray-500 dark:text-white/35 hover:text-[#00e5cc] transition-colors duration-200 flex items-center gap-1">
                      {l.label}
                      {(l as any).external && <ExternalLink className="w-2.5 h-2.5 opacity-40" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 dark:text-white/20">
            \u00a9 {new Date().getFullYear()} Decentralized Rights Protocol. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-gray-400 dark:text-white/20">
            <Link href="/legal/privacy-policy" className="hover:text-[#00e5cc] transition-colors">Privacy</Link>
            <Link href="/legal/terms-of-service" className="hover:text-[#00e5cc] transition-colors">Terms</Link>
            <Link href="/status" className="hover:text-[#00e5cc] transition-colors flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] inline-block" /> Operational
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
