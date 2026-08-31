'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, Wallet, Heart, User } from 'lucide-react'
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
  { href: '/learn', label: 'Learn' }
]

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const { address, connect, isConnecting } = useWallet()

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-white via-neutral-50 to-primary-50/40 text-neutral-900 dark:from-neutral-950 dark:via-neutral-900 dark:to-primary-950/20 dark:text-neutral-50">
      <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/90 backdrop-blur-lg dark:border-neutral-800/80 dark:bg-neutral-950/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg">
              <Heart className="h-5 w-5" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">DRP App</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Human Rights · Verified Impact</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navigationLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-300',
                    isActive ? 'text-primary-600 dark:text-primary-200' : 'text-neutral-600 dark:text-neutral-300'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            {address ? (
              <Link
                href="/dashboard"
                className="hidden items-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg sm:inline-flex"
              >
                <User className="h-4 w-4" />
                <span className="hidden lg:inline">Dashboard</span>
              </Link>
            ) : (
              <button
                onClick={async () => {
                  try {
                    await connect()
                  } catch (error) {
                    console.error('Failed to connect wallet:', error)
                  }
                }}
                disabled={isConnecting}
                className="hidden items-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg disabled:opacity-50 sm:inline-flex"
              >
                <Wallet className="h-4 w-4" />
                {isConnecting ? 'Connecting...' : <span className="hidden lg:inline">Connect Wallet</span>}
              </button>
            )}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-neutral-200 p-2 text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-800 md:hidden"
              onClick={() => setIsMobileNavOpen((prev) => !prev)}
              aria-expanded={isMobileNavOpen}
              aria-controls="mobile-navigation"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
        </div>

        {isMobileNavOpen && (
          <div id="mobile-navigation" className="border-t border-neutral-200 bg-white px-4 py-4 dark:border-neutral-800 dark:bg-neutral-950 md:hidden">
            <nav className="flex flex-col gap-2">
              {navigationLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileNavOpen(false)}
                    className={cn(
                      'rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900',
                      isActive ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-200' : 'text-neutral-600 dark:text-neutral-300'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
              {address ? (
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 px-4 py-2 text-sm font-medium text-white"
                >
                  <User className="h-4 w-4" />
                  Dashboard
                </Link>
              ) : (
                <button
                  onClick={async () => {
                    try {
                      await connect()
                      setIsMobileNavOpen(false)
                    } catch (error) {
                      console.error('Failed to connect wallet:', error)
                    }
                  }}
                  disabled={isConnecting}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                >
                  <Wallet className="h-4 w-4" />
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
              )}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">{children}</div>
      </main>

      <footer className="border-t border-neutral-200/80 bg-white/80 py-6 text-center text-sm text-neutral-500 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80 dark:text-neutral-400">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Decentralized Rights Protocol. Engineered for human rights.</p>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <Link href="/docs" className="transition hover:text-primary-600 dark:hover:text-primary-300">
              Docs
            </Link>
            <Link href="/roadmap" className="transition hover:text-primary-600 dark:hover:text-primary-300">
              Roadmap
            </Link>
            <Link href="/privacy" className="transition hover:text-primary-600 dark:hover:text-primary-300">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-primary-600 dark:hover:text-primary-300">
              Terms
            </Link>
            <a href="https://x.com/drp" className="transition hover:text-primary-600 dark:hover:text-primary-300" target="_blank" rel="noreferrer">
              X
            </a>
            <a href="https://linkedin.com/company/decentralizedrights" className="transition hover:text-primary-600 dark:hover:text-primary-300" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
