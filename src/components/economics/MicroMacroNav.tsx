'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowLeft, TrendingUp, Globe } from 'lucide-react'

export function MicroMacroNav() {
  const pathname = usePathname()
  
  const isMicro = pathname?.includes('/micro')
  const isMacro = pathname?.includes('/macro')

  return (
    <nav className="border-b border-white/20 bg-transparent">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/economics"
            className="inline-flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Economics Overview
          </Link>
          
          <div className="flex items-center gap-4">
            <Link
              href="/economics/micro"
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isMicro
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-neutral-300 hover:bg-white/20'
              }`}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Microeconomics
            </Link>
            <Link
              href="/economics/macro"
              className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isMacro
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-neutral-300 hover:bg-white/20'
              }`}
            >
              <Globe className="mr-2 h-4 w-4" />
              Macroeconomics
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
