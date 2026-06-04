import Link from 'next/link'
import Image from 'next/image'
import { Github, Mail, Linkedin, Instagram, ExternalLink } from 'lucide-react'
import NewsletterTally from './NewsletterTally'

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.636L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
    </svg>
  )
}

const social = [
  { name: 'GitHub', href: 'https://github.com/Decentralized-Rights-Protocol', Icon: Github },
  { name: 'X', href: 'https://twitter.com/De_Rights', Icon: XIcon },
  { name: 'Discord', href: 'https://discord.gg/zbWg92AnQQ', Icon: DiscordIcon },
  { name: 'Instagram', href: 'https://instagram.com/decentralized_rights', Icon: Instagram },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/Decentralized-Rights-Protocol', Icon: Linkedin },
  { name: 'Email', href: 'mailto:contact@decentralizedrights.com', Icon: Mail },
]

const cols = [
  { title: 'Protocol', links: [
    { label: 'About DRP', href: '/about' }, { label: 'How It Works', href: '/how-drp-works' },
    { label: 'Why DRP?', href: '/why-drp' }, { label: 'AI Governance', href: '/ai-governance' },
    { label: 'Quantum Security', href: '/quantum-security' }, { label: 'Philosophy', href: '/philosophy' },
    { label: 'What is DRP?', href: '/what-is-drp' }, { label: 'FAQ', href: '/faq' },
  ]},
  { title: 'Ecosystem', links: [
    { label: 'Ecosystem', href: '/ecosystem' }, { label: 'Token Economy', href: '/tokens' },
    { label: 'Economics', href: '/economics' }, { label: 'Tokenomics', href: '/economics/tokenomics' },
    { label: 'Roadmap', href: '/roadmap' }, { label: 'Status', href: '/status' },
    { label: 'DRP vs Ethereum', href: '/drp-vs-ethereum' }, { label: 'Human Rights Chain', href: '/human-rights-blockchain' },
  ]},
  { title: 'Developers', links: [
    { label: 'Documentation', href: '/docs' }, { label: 'Getting Started', href: '/docs/getting-started' },
    { label: 'Protocol Spec', href: '/docs/protocol' }, { label: 'Security', href: '/docs/security' },
    { label: 'Contributing', href: '/docs/contributing' }, { label: 'Examples', href: '/docs/examples' },
    { label: 'API Reference', href: '/api' }, { label: 'GitHub', href: 'https://github.com/Decentralized-Rights-Protocol', external: true },
  ]},
  { title: 'Learn', links: [
    { label: 'Learn DRP', href: '/learn' }, { label: 'Whitepaper', href: '/whitepaper' },
    { label: 'Glossary', href: '/glossary' }, { label: 'Community', href: '/community' },
    { label: 'Blockchain Basics', href: '/lessons/what-is-blockchain' },
    { label: 'DRP Architecture', href: '/lessons/drp-architecture' },
  ]},
  { title: 'Platform', links: [
    { label: 'Launch App', href: 'https://app.decentralizedrights.com', external: true },
    { label: 'Explorer', href: 'https://explorer.decentralizedrights.com', external: true },
    { label: 'API', href: '/api' },
    { label: 'Privacy Policy', href: '/legal/privacy-policy' },
    { label: 'Terms of Service', href: '/legal/terms-of-service' },
    { label: 'Contact', href: 'mailto:contact@decentralizedrights.com' },
  ]},
]

export function Footer() {
  return (
    <footer className="border-t border-foreground/5 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <Image src="/logo.png" alt="DRP" width={28} height={28} className="opacity-80 group-hover:opacity-100 transition-opacity" />
              <span className="font-bold tracking-widest text-xs uppercase text-foreground">DRP</span>
            </Link>
            <p className="text-foreground/40 text-sm leading-relaxed mb-4 max-w-[200px]">
              Decentralized Rights Protocol — verified rights for every human.
            </p>
            {/* Flag of Earth — Official IFOPE */}
            <Link href="/earth-flag" className="group block mb-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="relative w-[44px] h-[30px] overflow-hidden shrink-0">
                  <Image src="/ifope/08_IFOPE_20x30.jpg"
                    alt="International Flag of Planet Earth — Oskar Pernefeldt, 2015"
                    fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="text-[10px] text-foreground/25 uppercase tracking-widest group-hover:text-[#00e5cc] transition-colors">One Planet</span>
              </div>
            </Link>
            <p className="text-[9px] text-foreground/20 leading-snug mb-5 max-w-[190px]">
              Flag of Earth ©{' '}
              <a href="https://www.flagofearth.com" target="_blank" rel="noopener noreferrer"
                className="underline hover:text-[#00e5cc] transition-colors">Oskar Pernefeldt</a>,
              {' 2015. CC BY 4.0'}
            </p>
            <div className="flex flex-wrap gap-2">
              {social.map(({ name, href, Icon }) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name}
                  className="w-9 h-9 border border-foreground/10 flex items-center justify-center text-foreground/35 hover:border-[#00e5cc]/50 hover:text-[#00e5cc] transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold tracking-widest uppercase text-foreground/30 mb-5">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} target={(l as any).external ? '_blank' : undefined}
                      rel={(l as any).external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-foreground/40 hover:text-[#00e5cc] transition-colors flex items-center gap-1">
                      {l.label}
                      {(l as any).external && <ExternalLink className="w-2.5 h-2.5 opacity-40" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-10 border-t border-foreground/5">
          <NewsletterTally />
        </div>
      </div>

      <div className="border-t border-foreground/5">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/25">
            © {new Date().getFullYear()} Decentralized Rights Protocol. Human Rights Infrastructure for the AI Age.
          </p>
          <div className="flex items-center gap-6 text-xs text-foreground/25">
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
