'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { WalletConnectButton } from '@/components/wallet/WalletConnectButton'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Learn', href: '/learn' },
  { name: 'Why DRP', href: '/why-drp' },
  { name: 'Whitepaper', href: '/whitepaper' },
  { name: 'Docs', href: '/docs' },
  { name: 'Roadmap', href: '/roadmap' },
  { name: 'Community', href: '/community' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname?.startsWith(href) ?? false
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200/60 dark:border-neutral-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/DRP.png" alt="DRP Logo" width={32} height={32} className="h-8 w-8" />
              <span className="text-lg font-semibold text-neutral-900 dark:text-white hidden md:inline">Decentralized Rights Protocol</span>
            </Link>
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-x-2">
            <div className="hidden lg:flex lg:items-center lg:gap-x-2">
              <div className="[&_*:where(button)]:bg-primary-600 [&_*:where(button)]:text-white [&_*:where(button)]:hover:bg-primary-500 [&_*:where(button)]:transition-colors">
                <WalletConnectButton />
              </div>
              <LanguageSwitcher compact />
              <ThemeToggle />
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                    : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2 flex items-center gap-2 border-t border-neutral-200 dark:border-neutral-800 mt-2">
              <div className="flex [&_*:where(button)]:bg-primary-600 [&_*:where(button)]:text-white [&_*:where(button)]:hover:bg-primary-500 [&_*:where(button)]:transition-colors">
                <WalletConnectButton />
              </div>
              <LanguageSwitcher compact />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
