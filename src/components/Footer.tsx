import Link from 'next/link'
import Image from 'next/image'
import { Twitter, Github, Linkedin, Mail, ExternalLink } from 'lucide-react'

interface FooterLink {
  name: string
  href: string
  external?: boolean
}

const footerLinks: Record<string, FooterLink[]> = {
  Protocol: [
    { name: 'About', href: '/about' },
    { name: 'Whitepaper', href: '/whitepaper' },
    { name: 'Roadmap', href: '/roadmap' },
    { name: 'Governance', href: '/governance' },
  ],
  Community: [
    { name: 'Discord', href: 'https://discord.gg/drp', external: true },
    { name: 'Twitter', href: 'https://twitter.com/De_Rights', external: true },
    { name: 'GitHub', href: 'https://github.com/Decentralized-Rights-Protocol', external: true },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/decentralized-rights-protocol', external: true },
  ],
  Resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Blog', href: '/blog' },
    { name: 'Press Kit', href: '/press' },
    { name: 'Careers', href: '/careers' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ],
}

const socialLinks = [
  {
    name: 'Twitter',
    href: 'https://twitter.com/De_Rights',
    icon: Twitter,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/Decentralized-Rights-Protocol',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/decentralized-rights-protocol',
    icon: Linkedin,
  },
  {
    name: 'Email',
    href: 'mailto:hello@decentralizedrights.com',
    icon: Mail,
  },
]

export function Footer() {
  return (
    <footer className="bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="relative w-10 h-10">
                <Image
                  src="/DRP.png"
                  alt="Decentralized Rights Protocol"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-neutral-900 dark:text-white">
                  DRP
                </span>
                <span className="text-sm text-neutral-600 dark:text-neutral-400 -mt-1">
                  Protocol
                </span>
              </div>
            </Link>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md">
              A quantum-safe blockchain protocol dedicated to protecting and advancing human rights globally through decentralized governance and transparent technology.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200"
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider mb-4">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 flex items-center space-x-1"
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                    >
                      <span>{link.name}</span>
                      {link.external && (
                        <ExternalLink className="h-3 w-3" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              © {new Date().getFullYear()} Decentralized Rights Protocol. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-neutral-600 dark:text-neutral-400">
              <span>Built with ❤️ for humanity</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Mainnet Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}