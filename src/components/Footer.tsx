import Link from 'next/link'
import { Github, Twitter, MessageCircle, Mail } from 'lucide-react'

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
      href: 'https://github.com/drp-protocol',
      icon: Github,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/drp_protocol',
      icon: Twitter,
    },
    {
      name: 'Discord',
      href: 'https://discord.gg/drp-protocol',
      icon: MessageCircle,
    },
    {
      name: 'Email',
      href: 'mailto:hello@drp-protocol.org',
      icon: Mail,
    },
  ],
}

export function Footer() {
  return (
    <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-500 dark:hover:text-neutral-300 transition-colors"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">DRP</span>
              </div>
              <span className="text-lg font-bold text-neutral-900 dark:text-white">
                Decentralized Rights Protocol
              </span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
              {navigation.main.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
              &copy; {new Date().getFullYear()} Decentralized Rights Protocol. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <div className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
              Stay updated with DRP
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 max-w-md">
              Get the latest updates on protocol development, community events, and human rights initiatives.
            </p>
            <div className="flex w-full max-w-md gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 px-3 py-2 text-sm text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
              <button className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}