import Link from 'next/link'
import Image from 'next/image'
import { Github, Mail, Linkedin, Instagram } from 'lucide-react'
import { XIcon, DiscordIcon } from '@/components/custom-icons'
import NewsletterTally from '@/components/NewsletterTally'

const navigation = {
  main: [
    { name: 'Whitepaper', href: '/whitepaper' },
    { name: 'Economics', href: '/economics' },
    { name: 'Docs', href: '/docs' },
    { name: 'Roadmap', href: '/roadmap' },
    { name: 'Community', href: '/community' },
  ],
  social: [
    {
      name: 'GitHub',
      href: 'https://github.com/Decentralized-Rights-Protocol/Dr-Blockchain',
      icon: Github,
    },
    {
      name: 'X (Twitter)',
      href: 'https://twitter.com/De_Rights',
      icon: XIcon,
    },
    {
      name: 'Discord',
      href: 'https://discord.gg/zbWg92AnQQ',
      icon: DiscordIcon,
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/decentralized_rights',
      icon: Instagram,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/Decentralized-Rights-Protocol',
      icon: Linkedin,
    },
    {
      name: 'Email',
      href: 'mailto:contact@decentralizedrights.com',
      icon: Mail,
    },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/90 text-foreground backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="mb-10 rounded-2xl border border-border bg-accent p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-foreground/80">Build with DRP</p>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm text-foreground/80">
              Launch rights-aware products with verifiable identity, activity, and governance rails.
            </p>
            <div className="flex items-center gap-3">
              <Link href="/docs" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                Explore Docs
              </Link>
              <Link href="/whitepaper" className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-accent hover:text-accent-foreground">
                Whitepaper
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/site-icon.png"
                alt="DRP Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
                style={{ aspectRatio: '1/1' }}
              />
              <span className="text-lg font-bold text-foreground">Decentralized Rights Protocol</span>
            </div>
            <p className="max-w-sm text-sm text-foreground/70">
              Building a human-rights-centered blockchain with transparent governance and zero-trust security.
            </p>
          </div>

          {/* Protocol */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Protocol</h4>
            <ul className="space-y-2">
              <li><Link href="/philosophy" className="text-sm text-foreground/70 transition-colors hover:text-primary">Philosophy</Link></li>
              <li><Link href="/about" className="text-sm text-foreground/70 transition-colors hover:text-primary">About</Link></li>
              <li><Link href="/ecosystem" className="text-sm text-foreground/70 transition-colors hover:text-primary">Ecosystem</Link></li>
              <li><Link href="/docs" className="text-sm text-foreground/70 transition-colors hover:text-primary">Docs</Link></li>
              <li><Link href="/tokens" className="text-sm text-foreground/70 transition-colors hover:text-primary">Tokens</Link></li>
              <li><Link href="/economics" className="text-sm text-foreground/70 transition-colors hover:text-primary">Economics</Link></li>
              <li><Link href="/roadmap" className="text-sm text-foreground/70 transition-colors hover:text-primary">Roadmap</Link></li>
              <li><Link href="/whitepaper" className="text-sm text-foreground/70 transition-colors hover:text-primary">Whitepaper (PDF)</Link></li>
              <li><Link href="/community" className="text-sm text-foreground/70 transition-colors hover:text-primary">Community</Link></li>
              <li><Link href="/learn" className="text-sm text-foreground/70 transition-colors hover:text-primary">Learn</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Services</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://api.decentralizedrights.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/70 transition-colors hover:text-primary"
                >
                  API
                </a>
              </li>
              <li>
                <a
                  href="https://app.decentralizedrights.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/70 transition-colors hover:text-primary"
                >
                  App
                </a>
              </li>
              <li>
                <a
                  href="https://explorer.decentralizedrights.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/70 transition-colors hover:text-primary"
                >
                  Explorer
                </a>
              </li>
            </ul>
          </div>


          {/* Legal & Social */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/legal/terms-of-service" className="text-sm text-foreground/70 transition-colors hover:text-primary">Terms of Service</Link></li>
                <li><Link href="/legal/privacy-policy" className="text-sm text-foreground/70 transition-colors hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/legal/eldercore-terms" className="text-sm text-foreground/70 transition-colors hover:text-primary">ElderCore Terms</Link></li>
                <li><Link href="/legal/eldercore-privacy" className="text-sm text-foreground/70 transition-colors hover:text-primary">ElderCore Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground">Social</h4>
              <div className="flex flex-wrap gap-3">
                {navigation.social.map((item) => (
                  <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="text-foreground/60 transition-colors hover:text-primary">
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <NewsletterTally />

        {/* Footer small print */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <Image src="/08_IFOPE_20x30.jpg" alt="Flag of Planet Earth" width={60} height={40} className="h-10 w-auto rounded-sm shadow-sm" />
            <p className="text-xs text-foreground/60">Flag of Planet Earth © Oskar Pernefeldt - used with attribution.</p>
          </div>
          <p className="text-xs text-foreground/60">&copy; {new Date().getFullYear()} Decentralized Rights Protocol. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
