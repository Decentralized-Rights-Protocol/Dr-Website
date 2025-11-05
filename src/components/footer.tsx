import Link from 'next/link'
import Image from 'next/image'
import { Github, Mail, Linkedin, Instagram } from 'lucide-react'
import { XIcon, DiscordIcon } from '@/components/custom-icons'

const navigation = {
  main: [
    { name: 'Whitepaper', href: '/whitepaper' },
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
      href: 'https://discord.gg/k8auUAqF',
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
  const tallyId = process.env.NEXT_PUBLIC_TALLY_FORM_ID
  return (
    <footer className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-neutral-200/60 dark:border-neutral-800/60">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/DRP.png" alt="DRP Logo" width={40} height={40} className="h-10 w-10" />
              <span className="text-lg font-bold text-neutral-900 dark:text-white">Decentralized Rights Protocol</span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-sm">
              Building a human-rights-centered blockchain with transparent governance and zero-trust security.
            </p>
          </div>

          {/* Project */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">Project</h4>
            <ul className="space-y-2">
              <li><Link href="/docs" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Docs</Link></li>
              <li><Link href="/roadmap" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Roadmap</Link></li>
              <li><Link href="/whitepaper" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Whitepaper (PDF)</Link></li>
              <li><Link href="/community" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Community</Link></li>
              <li><Link href="/learn" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Learn</Link></li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/legal/terms-of-service" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="/legal/privacy-policy" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/legal/eldercore-terms" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">ElderCore Terms</Link></li>
                <li><Link href="/legal/eldercore-privacy" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">ElderCore Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">Social</h4>
              <div className="flex flex-wrap gap-3">
                {navigation.social.map((item) => (
                  <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-10 rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/80 dark:bg-neutral-900/40 p-6 text-center">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Stay updated with DRP</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 max-w-2xl mx-auto">Get the latest updates on protocol development, community events, and human rights initiatives.</p>
          {tallyId ? (
            <button
              data-tally-open={tallyId}
              data-tally-layout="modal"
              data-tally-align-left="1"
              data-tally-hide-title="1"
              data-tally-overlay="1"
              data-tally-emoji-text="👋"
              data-tally-emoji-animation="wave"
              className="rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            >
              Subscribe to Newsletter
            </button>
          ) : (
            <Link
              href="https://tally.so"
              target="_blank"
              className="rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            >
              Subscribe to Newsletter
            </Link>
          )}
        </div>

        {/* Footer small print */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <Image src="/08_IFOPE_20x30.jpg" alt="Flag of Planet Earth" width={60} height={40} className="h-10 w-auto rounded-sm shadow-sm" />
            <p className="text-xs text-neutral-400 dark:text-neutral-500">Flag of Planet Earth © Oskar Pernefeldt — used with attribution.</p>
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">&copy; {new Date().getFullYear()} Decentralized Rights Protocol. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}