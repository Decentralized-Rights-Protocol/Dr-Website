'use client'

import Link from 'next/link'
import { Home, ArrowLeft, Search, AlertCircle, Zap, Shield, Brain } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">Page not found</h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">The page you are looking for doesn’t exist or may have moved.</p>
      </div>
    </main>
  )
}