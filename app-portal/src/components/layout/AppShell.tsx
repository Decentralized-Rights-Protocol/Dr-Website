'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, Wallet, ArrowUpRight } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { useWallet } from '@/hooks/useWallet'
import { cn } from '@/lib/utils'

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/proofs/activities', label: 'Proofs' },
  { href: '/wallet', label: 'Wallet' },
  { href: '/rewards', label: 'Rewards' },
  { href: '/leaderboard', label: 'Community' },
  { href: '/learn', label: 'Learn' },
]

function DRPMark() {
  return (
    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#00e5cc]/30 bg-[#00e5cc]/10 shadow-[0_0_28px_rgba(0,229,204,.12)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,229,204,.28),transparent_55%)]" />
      <span className="relative text-[11px] font-black tracking-[-.08em] text-[#00e5cc]">DRP</span>
    </div>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const { address, connect, isConnecting } = useWallet()

  return (
    <div className="min-h-screen bg-[#030308] text-white">
      <header className="sticky top-0 z-50 border-b border-white/[.07] bg-[#030308]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <DRPMark />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold tracking-[.08em]">DRP</span>
                <span className="rounded-full border border-[#00e5cc]/20 bg-[#00e5cc]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#00e5cc]">Portal</span>
              </div>
              <p className="hidden text-[10px] text-white/35 sm:block">Infrastructure for verified rights</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navigationLinks.map((link) => {
              const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return <Link key={link.href} href={link.href} className={cn('rounded-lg px-3 py-2 text-xs font-semibold transition', active ? 'bg-white/[.07] text-[#00e5cc]' : 'text-white/55 hover:bg-white/[.04] hover:text-white')}>{link.label}</Link>
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a href="https://decentralizedrights.com" target="_blank" rel="noreferrer" className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-white/45 transition hover:text-white md:flex">Protocol <ArrowUpRight className="h-3.5 w-3.5" /></a>
            <ThemeToggle />
            {address ? <Link href="/dashboard" className="hidden rounded-lg bg-[#00e5cc] px-4 py-2 text-xs font-bold text-[#030308] sm:block">Open Console</Link> : <button onClick={() => connect()} disabled={isConnecting} className="hidden rounded-lg bg-[#00e5cc] px-4 py-2 text-xs font-bold text-[#030308] sm:block">{isConnecting ? 'Connecting…' : 'Connect Wallet'}</button>}
            <button type="button" className="rounded-lg border border-white/10 p-2 text-white/70 lg:hidden" onClick={() => setIsMobileNavOpen(v => !v)} aria-expanded={isMobileNavOpen}><Menu className="h-5 w-5" /><span className="sr-only">Toggle navigation</span></button>
          </div>
        </div>

        {isMobileNavOpen && <div className="border-t border-white/[.07] bg-[#030308] px-4 py-4 lg:hidden"><nav className="mx-auto flex max-w-7xl flex-col gap-1">
          {navigationLinks.map(link => <Link key={link.href} href={link.href} onClick={() => setIsMobileNavOpen(false)} className={cn('rounded-xl px-4 py-3 text-sm font-semibold', pathname === link.href ? 'bg-[#00e5cc]/10 text-[#00e5cc]' : 'text-white/65 hover:bg-white/[.04]')}>{link.label}</Link>)}
          {!address && <button onClick={() => connect()} disabled={isConnecting} className="mt-2 rounded-xl bg-[#00e5cc] px-4 py-3 text-sm font-bold text-[#030308]">{isConnecting ? 'Connecting…' : 'Connect Wallet'}</button>}
        </nav></div>}
      </header>

      <main>{children}</main>

      <footer className="border-t border-white/[.07] bg-[#030308]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-3"><DRPMark /><div><p className="text-xs font-bold tracking-widest">DECENTRALIZED RIGHTS PROTOCOL</p><p className="mt-1 text-[11px] text-white/35">Engineered for human rights. Built for a verified world.</p></div></div>
          <div className="flex flex-wrap gap-4 text-xs text-white/40"><Link href="/learn" className="hover:text-[#00e5cc]">Learn</Link><Link href="/roadmap" className="hover:text-[#00e5cc]">Roadmap</Link><Link href="/privacy" className="hover:text-[#00e5cc]">Privacy</Link><a href="https://decentralizedrights.com" target="_blank" rel="noreferrer" className="hover:text-[#00e5cc]">Protocol website ↗</a></div>
        </div>
        <div className="border-t border-white/[.05] px-4 py-4 text-center text-[10px] text-white/25">© {new Date().getFullYear()} Decentralized Rights Protocol · Your rights. Your proof. Your impact.</div>
      </footer>
    </div>
  )
}
