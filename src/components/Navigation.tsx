'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Whitepaper', href: '/whitepaper' },
  { name: 'Roadmap', href: '/roadmap' },
  { name: 'Ecosystem', href: '/ecosystem' },
  { name: 'Governance', href: '/governance' },
  { name: 'Community', href: '/community' },
]

const mobileNavigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Whitepaper', href: '/whitepaper' },
  { name: 'Roadmap', href: '/roadmap' },
  { name: 'Ecosystem', href: '/ecosystem' },
  { name: 'Governance', href: '/governance' },
  { name: 'Community', href: '/community' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-neutral-200 dark:bg-neutral-900/80 dark:border-neutral-700'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-10 h-10 lg:w-12 lg:h-12">
              <Image
                src="/DRP.png"
                alt="Decentralized Rights Protocol"
                fill
                className="object-contain transition-transform duration-200 group-hover:scale-105"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'relative text-sm font-medium transition-all duration-200 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800',
                  pathname === item.href
                    ? 'text-primary-600 dark:text-primary-400 bg-neutral-100 dark:bg-neutral-800'
                    : 'text-neutral-700 dark:text-neutral-300'
                )}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-secondary-600 to-accent-600"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </button>

            {/* CTA Button */}
            <Link
              href="/whitepaper"
              className="hidden sm:inline-flex items-center px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-secondary-600 to-accent-600 rounded-xl hover:from-secondary-700 hover:to-accent-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Read Whitepaper
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-700"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                {mobileNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'text-base font-medium transition-colors duration-200 hover:text-primary-600 dark:hover:text-primary-400',
                      pathname === item.href
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-neutral-700 dark:text-neutral-300'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/whitepaper"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-secondary-600 to-accent-600 rounded-xl hover:from-secondary-700 hover:to-accent-700 transition-all duration-200 mt-4 shadow-lg"
                >
                  Read Whitepaper
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}