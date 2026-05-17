'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ExternalLink } from 'lucide-react'

const links = [
  { label: 'About', href: '/about' },
  { label: 'Protocol', href: '/docs/protocol' },
  { label: 'Ecosystem', href: '/ecosystem' },
  { label: 'Learn', href: '/learn' },
  { label: 'Tokens', href: '/tokens' },
  { label: 'Roadmap', href: '/roadmap' },
  { label: 'Whitepaper', href: '/whitepaper' },
  { label: 'Community', href: '/community' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname?.startsWith(href) ?? false

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#030308]/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/logo.png" alt="DRP" width={32} height={32} className="opacity-90 group-hover:opacity-100 transition-opacity" />
            <span className="text-white font-semibold tracking-widest text-sm uppercase hidden sm:block">DRP</span>
          </Link>
          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href}
                className={`px-4 py-2 text-sm transition-colors duration-200 ${
                  isActive(l.href) ? 'text-[#00d4ff]' : 'text-white/40 hover:text-white/80'
                }`}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <Link href="https://app.decentralizedrights.com"
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold tracking-widest uppercase text-black bg-[#00d4ff] hover:bg-white transition-colors duration-300">
              Launch App <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
          <button className="lg:hidden text-white/60 hover:text-white p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div className="fixed inset-0 z-40 bg-[#030308] pt-16">
          <div className="px-6 py-8 flex flex-col gap-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className={`py-4 text-lg border-b border-white/5 transition-colors ${
                  isActive(l.href) ? 'text-[#00d4ff]' : 'text-white/60 hover:text-white'
                }`}>
                {l.label}
              </Link>
            ))}
            <div className="mt-8">
              <Link href="https://app.decentralizedrights.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#00d4ff] text-black font-semibold text-sm tracking-widest uppercase">
                Launch App <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
