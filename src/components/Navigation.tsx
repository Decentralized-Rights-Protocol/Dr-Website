'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { WalletConnectButton } from '@/components/wallet/WalletConnectButton'
import { GoogleTranslate } from '@/components/GoogleTranslate'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Ecosystem', href: '/ecosystem' },
  { name: 'About', href: '/about' },
  { name: 'Learn', href: '/learn' },
  { name: 'Tokens', href: '/tokens' },
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
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border border-border/60 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/DRP.png" 
                alt="DRP Logo" 
                width={32} 
                height={32} 
                className="h-8 w-8 object-contain"
                style={{ aspectRatio: '1/1' }}
              />
              <span className="hidden text-lg font-semibold text-foreground md:inline">Decentralized Rights Protocol</span>
            </Link>
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-primary'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-x-2">
            <div className="hidden lg:flex lg:items-center lg:gap-x-2">
              {pathname?.startsWith('/learn') && (
                <Link href="/learn" className="inline-flex">
                  <div className="[&_*:where(button)]:bg-primary [&_*:where(button)]:text-primary-foreground [&_*:where(button)]:hover:opacity-90 [&_*:where(button)]:transition-colors">
                    <WalletConnectButton />
                  </div>
                </Link>
              )}
              <GoogleTranslate />
              <LanguageSwitcher compact />
              <ThemeToggle />
            </div>
            <Link
              href="/whitepaper"
              className="hidden rounded-lg border border-border/70 bg-accent px-3 py-1.5 text-xs font-semibold text-accent-foreground transition hover:opacity-90 lg:inline-flex"
            >
              Read Whitepaper
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-foreground/70 hover:text-foreground focus:outline-none lg:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-border bg-background/95 lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-accent text-accent-foreground'
                    : 'text-foreground/80 hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-2 border-t border-border/20 px-3 py-2">
              {pathname?.startsWith('/learn') && (
                <Link href="/learn" className="flex">
                  <div className="flex [&_*:where(button)]:bg-primary [&_*:where(button)]:text-primary-foreground [&_*:where(button)]:hover:opacity-90 [&_*:where(button)]:transition-colors">
                    <WalletConnectButton />
                  </div>
                </Link>
              )}
              <GoogleTranslate />
              <LanguageSwitcher compact />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
