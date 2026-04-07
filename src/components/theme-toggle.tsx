'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="p-2 rounded-lg border border-neutral-200 dark:border-neutral-800">
        <div className="h-5 w-5" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={cn(
        'p-2 rounded-lg border transition-all duration-300',
        'border-neutral-200 dark:border-neutral-800',
        'hover:bg-neutral-100 dark:hover:bg-neutral-800',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        'dark:focus:ring-offset-neutral-900',
        'active:scale-95'
      )}
      aria-label="Toggle theme"
    >
      <span className="relative inline-block h-5 w-5">
        <Sun className={cn('absolute inset-0 h-5 w-5 text-yellow-500 transition-transform duration-300', theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0')} />
        <Moon className={cn('absolute inset-0 h-5 w-5 text-neutral-600 transition-transform duration-300', theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100')} />
      </span>
    </button>
  )
}

