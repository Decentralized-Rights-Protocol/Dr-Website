'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ExternalLink, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  {
    label: 'Protocol', href: '/docs/protocol',
    sub: [
      { label: 'How It Works', href: '/how-drp-works' },
      { label: 'AI Governance', href: '/ai-governance' },
      { label: 'Quantum Security', href: '/quantum-security' },
      { label: 'Documentation', href: '/docs' },
    ],
  },
  {
    label: 'Ecosystem', href: '/ecosystem',
    sub: [
      { label: 'Ecosystem', href: '/ecosystem' },
      { label: 'Token Economy', href: '/tokens' },
      { label: 'Economics', href: '/economics' },
      { label: 'Roadmap', href: '/roadmap' },
    ],
  },
  { label: 'Learn', href: '/learn' },
  { label: 'Whitepaper', href: '/whitepaper' },
  { label: 'Community', href: '/community' },
]

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-8 h-8" />
  const dark = resolvedTheme === 'dark'
  return (
    <button
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      className="w-8 h-8 flex items-center justify-center text-gray-500 dark:text-white/40 hover:text-[#00e5cc] border border-transparent hover:border-[#00e5cc]/25 transition-all duration-200"
      aria-label="Toggle theme"
    >
      {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  )
}

export default function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredDrop, setHoveredDrop] = useState<string | null>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : (pathname?.startsWith(href) ?? false)

  return (
    <>
      <nav
        aria-label="Main navigation"
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/96 dark:bg-[#030308]/95 backdrop-blur-2xl border-b border-black/5 dark:border-white/[0.06]'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 h-[60px] flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <Image src="/logo.png" alt="DRP" width={30} height={30} className="opacity-85 group-hover:opacity-100 transition-opacity" priority />
            <span className="font-bold tracking-[0.2em] text-xs uppercase hidden sm:block text-gray-900 dark:text-white">DRP</span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((l) => (
              <div
                key={l.href} className="relative"
                onMouseEnter={() => (l as any).sub && setHoveredDrop(l.label)}
                onMouseLeave={() => setHoveredDrop(null)}
              >
                <Link
                  href={l.href}
                  className={[
                    'px-3.5 py-2 text-sm tracking-wide transition-colors duration-200 flex items-center gap-1',
                    isActive(l.href)
                      ? 'text-[#00e5cc]'
                      : 'text-gray-600 dark:text-white/45 hover:text-gray-900 dark:hover:text-white',
                  ].join(' ')}
                >
                  {l.label}
                  {(l as any).sub && (
                    <svg className="w-3 h-3 opacity-35" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {(l as any).sub && hoveredDrop === l.label && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white dark:bg-[#0a0a14] border border-gray-100 dark:border-white/8 shadow-xl z-50">
                    {(l as any).sub.map((s: any) => (
                      <Link key={s.href} href={s.href}
                        className="block px-4 py-2.5 text-sm text-gray-600 dark:text-white/45 hover:text-[#00e5cc] hover:bg-gray-50 dark:hover:bg-white/[0.03] transition-colors border-b border-gray-50 dark:border-white/[0.04] last:border-0">
                        {s.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="https://app.decentralizedrights.com" target="_blank" rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold tracking-widest uppercase text-black bg-[#00e5cc] hover:bg-[#00bfff] transition-colors duration-300"
            >
              App <ExternalLink className="w-2.5 h-2.5" />
            </Link>
            <button
              className="lg:hidden w-9 h-9 flex items-center justify-center text-gray-500 dark:text-white/60 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/10 hover:border-[#00e5cc]/35 transition-all"
              onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-40 bg-white dark:bg-[#030308] flex flex-col pt-[60px] overflow-y-auto">
          <div className="px-6 py-6 flex flex-col">
            {NAV_LINKS.map((l) => (
              <div key={l.href}>
                <Link href={l.href}
                  className={[
                    'flex items-center py-4 text-base border-b border-gray-100 dark:border-white/[0.06] transition-colors',
                    isActive(l.href) ? 'text-[#00e5cc]' : 'text-gray-700 dark:text-white/60 hover:text-gray-900 dark:hover:text-white',
                  ].join(' ')}
                >
                  {l.label}
                </Link>
                {(l as any).sub?.map((s: any) => (
                  <Link key={s.href} href={s.href}
                    className="flex items-center py-3 pl-5 text-sm text-gray-400 dark:text-white/30 hover:text-gray-700 dark:hover:text-white/65 border-b border-gray-50 dark:border-white/[0.03] transition-colors">
                    {s.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div className="px-6 py-8 mt-auto border-t border-gray-100 dark:border-white/5 flex flex-col gap-4">
            <Link href="https://app.decentralizedrights.com" target="_blank"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#00e5cc] text-black font-bold text-sm tracking-widest uppercase hover:bg-[#00bfff] transition-colors">
              Launch App <ExternalLink className="w-4 h-4" />
            </Link>
            <Link href="https://explorer.decentralizedrights.com" target="_blank"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-gray-200 dark:border-white/15 text-gray-600 dark:text-white/55 text-sm hover:text-gray-900 dark:hover:text-white transition-colors">
              Explorer <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
