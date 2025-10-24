'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'
import { LanguageSwitcher } from './LanguageSwitcher'
import { WalletConnectButton } from './wallet/WalletConnectButton'
import { DRPLogo } from './drp-logo'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Learn', href: '/learn' },
  { name: 'Why DRP', href: '/why-drp' },
  { name: 'Whitepaper', href: '/whitepaper' },
  { name: 'Docs', href: '/docs' },
  { name: 'Roadmap', href: '/roadmap' },
  { name: 'Community', href: '/community' },
]

const docsNavigation = [
  { name: 'Overview', href: '/docs' },
  { name: 'Protocol', href: '/docs/protocol' },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [docsMenuOpen, setDocsMenuOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/50 dark:border-neutral-800/50 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">DRP</span>
            <div className="flex items-center space-x-4">
              <Image
                src="/DRP.png"
                alt="DRP Logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg object-contain"
              />
              <span className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white">
                Decentralized Rights Protocol
              </span>
            </div>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-700 dark:text-neutral-300"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-8 lg:items-center">
          {navigation.map((item) => (
            <div key={item.name} className="relative">
              {item.name === 'Docs' ? (
                <div className="relative">
                  <button
                    type="button"
                    className={cn(
                      'flex items-center gap-x-1 text-sm font-semibold leading-6 transition-colors px-3 py-2 rounded-md',
                      pathname.startsWith('/docs')
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                        : 'text-neutral-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                    )}
                    onClick={() => setDocsMenuOpen(!docsMenuOpen)}
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  
                  {docsMenuOpen && (
                    <div className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                      <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white dark:bg-neutral-800 text-sm leading-6 shadow-lg ring-1 ring-neutral-900/5 dark:ring-neutral-100/10">
                        <div className="p-4">
                          {docsNavigation.map((docItem) => (
                            <div key={docItem.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-neutral-50 dark:hover:bg-neutral-700">
                              <div>
                                <Link
                                  href={docItem.href}
                                  className="font-semibold text-neutral-900 dark:text-white"
                                >
                                  {docItem.name}
                                  <span className="absolute inset-0" />
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'text-sm font-semibold leading-6 transition-colors px-3 py-2 rounded-md',
                    pathname === item.href
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-neutral-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                  )}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
          <ThemeToggle />
            <LanguageSwitcher compact />
          <WalletConnectButton />
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-neutral-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-neutral-900/10 dark:sm:ring-neutral-100/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">DRP</span>
                <span className="text-xl font-bold text-neutral-900 dark:text-white">
                  DRP
                </span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-neutral-700 dark:text-neutral-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-neutral-500/10 dark:divide-neutral-400/10">
                <div className="space-y-1 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'block rounded-lg px-4 py-3 text-base font-semibold leading-7 transition-colors',
                        pathname === item.href
                          ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                          : 'text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800'
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-x-4">
                      <LanguageSwitcher />
                      <ThemeToggle />
                    </div>
                    <div className="flex justify-center">
                      <WalletConnectButton />
                    </div>
                  </div>
                  <Link
                    href="/whitepaper"
                    className="w-full rounded-md bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors text-center block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}