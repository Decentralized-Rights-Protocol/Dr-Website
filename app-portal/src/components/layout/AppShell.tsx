import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, Wallet, User, Bell } from 'lucide-react'
import { useMutation as useConvexMutation } from 'convex/react'
import { ThemeToggle } from '@/components/theme-toggle'
import { useWallet } from '@/hooks/useWallet'
import { cn } from '@/lib/utils'
import { api } from '../../../convex/_generated/api'

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/proofs/activities', label: 'Proofs' },
  { href: '/governance', label: 'Governance' },
  { href: '/review', label: 'Review' },
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
  const touchWalletSession = useConvexMutation(api.users.touchWalletSession)

  useEffect(() => {
    if (!address) return
    void touchWalletSession({ walletAddress: address })
  }, [address, touchWalletSession])

  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900 selection:bg-drp-blue/30 dark:bg-drp-dark dark:text-neutral-50">
      <header className="sticky top-0 z-50 border-b border-neutral-200/80 bg-white/80 backdrop-blur-xl dark:border-neutral-800/50 dark:bg-drp-dark/80">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
            <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-drp-dark shadow-xl ring-1 ring-white/10">
              <Image 
                src="/logo.png" 
                alt="DRP Logo" 
                fill 
                className="object-cover"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <p className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">DRP</p>
              <p className="text-[10px] font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-400">Decentralized Rights</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navigationLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-lg px-4 py-2 text-sm font-semibold transition-all hover:bg-neutral-100 dark:hover:bg-white/5',
                    isActive 
                      ? 'bg-neutral-100 text-drp-blue dark:bg-white/10 dark:text-drp-blue' 
                      : 'text-neutral-600 dark:text-neutral-400'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button className="hidden rounded-full p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-white/5 lg:block">
              <Bell className="h-5 w-5" />
            </button>
            {address ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-xl bg-drp-blue px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-drp-blue/20 transition-all hover:scale-105 hover:bg-drp-blue/90 active:scale-95"
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
                className="flex items-center gap-2 rounded-xl bg-drp-blue px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-drp-blue/20 transition-all hover:scale-105 hover:bg-drp-blue/90 active:scale-95 disabled:opacity-50"
              >
                <Wallet className="h-4 w-4" />
                {isConnecting ? 'Connecting...' : <span className="hidden lg:inline">Connect Wallet</span>}
              </button>
            )}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-200 p-2 text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-white/5 md:hidden"
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
          <div id="mobile-navigation" className="animate-fade-in border-t border-neutral-200 bg-white/95 px-4 py-6 backdrop-blur-lg dark:border-neutral-800 dark:bg-drp-dark/95 md:hidden">
            <nav className="flex flex-col gap-2">
              {navigationLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileNavOpen(false)}
                    className={cn(
                      'flex items-center rounded-xl px-4 py-3 text-base font-bold transition-all',
                      isActive 
                        ? 'bg-drp-blue/10 text-drp-blue' 
                        : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-white/5'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                {address ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileNavOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-drp-blue py-4 text-base font-bold text-white shadow-lg shadow-drp-blue/20"
                  >
                    <User className="h-5 w-5" />
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
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-drp-blue py-4 text-base font-bold text-white shadow-lg shadow-drp-blue/20 disabled:opacity-50"
                  >
                    <Wallet className="h-5 w-5" />
                    {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 animate-fade-in">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </main>

      <footer className="border-t border-neutral-200/80 bg-neutral-50/50 py-12 dark:border-neutral-800/50 dark:bg-drp-dark/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-drp-dark shadow-lg ring-1 ring-white/10">
                <Image src="/logo.png" alt="DRP Logo" fill className="object-cover" />
              </div>
              <div>
                <p className="text-lg font-bold text-neutral-900 dark:text-white">DRP</p>
                <p className="text-xs text-neutral-500">Engineered for human rights.</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white">Platform</p>
                <Link href="/dashboard" className="text-sm text-neutral-500 hover:text-drp-blue dark:text-neutral-400">Dashboard</Link>
                <Link href="/governance" className="text-sm text-neutral-500 hover:text-drp-blue dark:text-neutral-400">Governance</Link>
                <Link href="/review" className="text-sm text-neutral-500 hover:text-drp-blue dark:text-neutral-400">Review</Link>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white">Resources</p>
                <Link href="/docs" className="text-sm text-neutral-500 hover:text-drp-blue dark:text-neutral-400">Documentation</Link>
                <Link href="/learn" className="text-sm text-neutral-500 hover:text-drp-blue dark:text-neutral-400">Learn</Link>
                <Link href="/roadmap" className="text-sm text-neutral-500 hover:text-drp-blue dark:text-neutral-400">Roadmap</Link>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white">Legal</p>
                <Link href="/privacy" className="text-sm text-neutral-500 hover:text-drp-blue dark:text-neutral-400">Privacy Policy</Link>
                <Link href="/terms" className="text-sm text-neutral-500 hover:text-drp-blue dark:text-neutral-400">Terms of Service</Link>
              </div>
            </div>
          </div>
          
          <div className="mt-12 flex flex-col items-center justify-between border-t border-neutral-200 pt-8 dark:border-neutral-800 sm:flex-row">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              © {new Date().getFullYear()} Decentralized Rights Protocol.
            </p>
            <div className="mt-4 flex gap-6 sm:mt-0">
              <a href="https://x.com/drp" className="text-neutral-400 hover:text-drp-blue transition-colors" target="_blank" rel="noreferrer">
                <span className="sr-only">X</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://github.com/drp" className="text-neutral-400 hover:text-drp-blue transition-colors" target="_blank" rel="noreferrer">
                <span className="sr-only">GitHub</span>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.008.069-.008 1.008.07 1.536 1.037 1.536 1.037.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
