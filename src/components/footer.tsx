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
  return (
    <footer className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-neutral-200/60 dark:border-neutral-800/60">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors transform hover:scale-110"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-3 mb-4">
              <Image
                src="/DRP.png"
                alt="DRP Logo"
                width={32}
                height={32}
                className="h-8 w-8 rounded-lg object-contain"
              />
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
              <Link
                href="/learn"
                className="text-sm font-semibold text-white bg-primary-600 hover:bg-primary-500 dark:bg-primary-500 dark:hover:bg-primary-400 px-4 py-1.5 rounded-full transition-colors shadow-sm"
              >
                Learn
              </Link>
            </div>
            {/* Flag of Planet Earth */}
            <div className="mt-6 flex flex-col items-center">
              <Image
                src="/08_IFOPE_20x30.jpg"
                alt="Flag of Planet Earth representing unity and global rights"
                width={60}
                height={40}
                className="h-10 w-auto object-contain rounded-sm shadow-sm"
              />
              <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500 text-center max-w-xs">
                Flag of Planet Earth © Oskar Pernefeldt — used with attribution for educational and humanitarian purposes.
              </p>
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
            <button 
              data-tally-open="3xKMro" 
              data-tally-emoji-text="👋" 
              data-tally-emoji-animation="wave"
              className="rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            >
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}