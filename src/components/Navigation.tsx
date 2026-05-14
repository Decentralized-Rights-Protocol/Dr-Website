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
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white/5 border border-white/10 group-hover:border-drp-cyan transition-colors">
                <Image 
                  src="/DRP.png" 
                  alt="DRP Logo" 
                  fill
                  className="object-contain p-1"
                />
              </div>
              <span className="hidden text-sm font-cinematic text-white tracking-[0.3em] md:inline">Decentralized Rights Protocol</span>
            </Link>
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-[10px] font-cinematic transition-colors ${
                  isActive(item.href)
                    ? 'text-drp-cyan'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-x-4">
            <div className="hidden lg:flex lg:items-center lg:gap-x-6">
              <ThemeToggle />
              <Link href="/dashboard" className="px-6 py-2 rounded-full bg-white text-black text-[10px] font-cinematic hover:bg-drp-cyan transition-colors">
                App
              </Link>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-white/70 hover:text-white focus:outline-none lg:hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-white/5 bg-black/95 lg:hidden animate-fade-in">
          <div className="px-4 pt-4 pb-8 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-xl px-4 py-4 text-xs font-cinematic transition-colors ${
                  isActive(item.href)
                    ? 'bg-white/10 text-drp-cyan'
                    : 'text-white/60 hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-6 pt-6 border-t border-white/5 flex flex-col gap-4">
              <Link href="/dashboard" className="w-full text-center py-4 rounded-xl bg-white text-black text-xs font-cinematic">
                Enter App
              </Link>
              <div className="flex justify-center gap-4 py-2">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
