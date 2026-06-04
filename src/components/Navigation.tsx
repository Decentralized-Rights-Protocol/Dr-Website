'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ExternalLink, Sun, Moon, ChevronDown } from 'lucide-react'
import { useTheme } from 'next-themes'

const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Protocol', href: '/docs/protocol', sub: [
    { label: 'How It Works', href: '/how-drp-works' },
    { label: 'Why DRP?', href: '/why-drp' },
    { label: 'What is DRP?', href: '/what-is-drp' },
    { label: 'AI Governance', href: '/ai-governance' },
    { label: 'Quantum Security', href: '/quantum-security' },
    { label: 'Philosophy', href: '/philosophy' },
    { label: 'Human Rights Blockchain', href: '/human-rights-blockchain' },
    { label: 'DRP vs Ethereum', href: '/drp-vs-ethereum' },
  ]},
  { label: 'Ecosystem', href: '/ecosystem', sub: [
    { label: 'Ecosystem Overview', href: '/ecosystem' },
    { label: 'Token Economy', href: '/tokens' },
    { label: 'Economics', href: '/economics' },
    { label: 'Tokenomics', href: '/economics/tokenomics' },
    { label: 'Distribution', href: '/economics/distribution' },
    { label: 'Governance', href: '/economics/governance' },
    { label: 'Roadmap', href: '/roadmap' },
    { label: 'Status', href: '/status' },
  ]},
  { label: 'Developers', href: '/docs', sub: [
    { label: 'Documentation', href: '/docs' },
    { label: 'Getting Started', href: '/docs/getting-started' },
    { label: 'Protocol Spec', href: '/docs/protocol' },
    { label: 'Security', href: '/docs/security' },
    { label: 'Contributing', href: '/docs/contributing' },
    { label: 'Examples', href: '/docs/examples' },
    { label: 'FAQ', href: '/docs/faq' },
    { label: 'API Reference', href: '/api' },
  ]},
  { label: 'Learn', href: '/learn' },
  { label: 'Whitepaper', href: '/whitepaper' },
  { label: 'Community', href: '/community', sub: [
    { label: 'Community Hub', href: '/community' },
    { label: 'Glossary', href: '/glossary' },
    { label: 'FAQ', href: '/faq' },
  ]},
]

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-8 h-8" />
  const dark = resolvedTheme === 'dark'
  return (
    <button onClick={() => setTheme(dark ? 'light' : 'dark')}
      className="w-8 h-8 flex items-center justify-center text-gray-500 dark:text-foreground/40 hover:text-[#00e5cc] dark:hover:text-[#00e5cc] border border-transparent hover:border-[#00e5cc]/25 transition-all"
      aria-label="Toggle theme">
      {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  )
}

export default function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredDrop, setHoveredDrop] = useState<string | null>(null)
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => { setOpen(false) }, [pathname])

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname?.startsWith(href) ?? false

  return (
    <nav className={['fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled ? 'bg-white/96 dark:bg-background/95 backdrop-blur-2xl border-b border-black/5 dark:border-foreground/[0.06] shadow-sm dark:shadow-none' : 'bg-transparent',
    ].join(' ')}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 h-[60px] flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <Image src="/logo.png" alt="DRP" width={30} height={30} className="opacity-85 group-hover:opacity-100 transition-opacity" priority />
          <span className="font-bold tracking-[0.2em] text-xs uppercase hidden sm:block text-gray-900 dark:text-foreground">DRP</span>
        </Link>

        <div className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map((l) => (
            <div key={l.href} className="relative"
              onMouseEnter={() => (l as any).sub && setHoveredDrop(l.label)}
              onMouseLeave={() => setHoveredDrop(null)}>
              <Link href={l.href} className={['px-3.5 py-2 text-sm tracking-wide transition-colors duration-200 flex items-center gap-1',
                isActive(l.href) ? 'text-[#00e5cc]' : 'text-gray-600 dark:text-foreground/45 hover:text-gray-900 dark:hover:text-foreground',
              ].join(' ')}>
                {l.label}
                {(l as any).sub && <ChevronDown className="w-3 h-3 opacity-40" />}
              </Link>
              {(l as any).sub && hoveredDrop === l.label && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-card border border-gray-100 dark:border-foreground/8 shadow-xl z-50">
                  {(l as any).sub.map((s: any) => (
                    <Link key={s.href} href={s.href}
                      className="block px-4 py-2.5 text-sm text-gray-600 dark:text-foreground/45 hover:text-[#00e5cc] hover:bg-gray-50 dark:hover:bg-foreground/[0.03] transition-colors border-b border-gray-50 dark:border-foreground/[0.04] last:border-0">
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
          <Link href="https://app.decentralizedrights.com" target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold tracking-widest uppercase bg-[#00e5cc] text-black hover:bg-[#00bfff] transition-all">
            Launch App <ExternalLink className="w-3 h-3" />
          </Link>
          <button onClick={() => setOpen(!open)} className="lg:hidden w-8 h-8 flex items-center justify-center text-gray-600 dark:text-foreground/50" aria-label="Toggle menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white dark:bg-background border-t border-gray-100 dark:border-foreground/5 max-h-[80vh] overflow-y-auto">
          <div className="px-5 py-4 space-y-1">
            {NAV_LINKS.map((l) => (
              <div key={l.href}>
                {(l as any).sub ? (
                  <>
                    <button onClick={() => setExpandedMobile(expandedMobile === l.label ? null : l.label)}
                      className="w-full flex items-center justify-between py-2.5 text-sm text-gray-700 dark:text-foreground/50">
                      <span>{l.label}</span>
                      <ChevronDown className={`w-4 h-4 opacity-40 transition-transform ${expandedMobile === l.label ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedMobile === l.label && (
                      <div className="pl-4 space-y-1 pb-2">
                        {(l as any).sub.map((s: any) => (
                          <Link key={s.href} href={s.href} className="block py-2 text-sm text-gray-500 dark:text-foreground/35 hover:text-[#00e5cc]">{s.label}</Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={l.href} className={['block py-2.5 text-sm transition-colors', isActive(l.href) ? 'text-[#00e5cc]' : 'text-gray-700 dark:text-foreground/50 hover:text-[#00e5cc]'].join(' ')}>{l.label}</Link>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-gray-100 dark:border-foreground/5">
              <Link href="https://app.decentralizedrights.com" target="_blank"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 text-xs font-bold tracking-widest uppercase bg-[#00e5cc] text-black hover:bg-[#00bfff] transition-all">
                Launch App <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
