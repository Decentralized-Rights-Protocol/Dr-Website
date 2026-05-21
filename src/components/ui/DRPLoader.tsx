'use client'

import { useEffect, useState } from 'react'

// DRP-branded futuristic loader — replaces all old purple spinners
export function DRPLoader({ size = 'md', label }: { size?: 'sm' | 'md' | 'lg'; label?: string }) {
  const dim = size === 'sm' ? 24 : size === 'lg' ? 56 : 36
  const stroke = size === 'sm' ? 2 : 2.5
  const r = (dim / 2) - stroke * 2
  const circ = 2 * Math.PI * r
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`} className="animate-spin" style={{ animationDuration: '1.2s' }}>
        <circle cx={dim/2} cy={dim/2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-gray-100 dark:text-white/10" />
        <circle cx={dim/2} cy={dim/2} r={r} fill="none" stroke="url(#drp-grad)" strokeWidth={stroke}
          strokeDasharray={`${circ * 0.7} ${circ * 0.3}`} strokeLinecap="round"
          transform={`rotate(-90 ${dim/2} ${dim/2})`} />
        <defs>
          <linearGradient id="drp-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00e5cc" />
            <stop offset="100%" stopColor="#00bfff" />
          </linearGradient>
        </defs>
      </svg>
      {label && <span className="text-xs text-gray-400 dark:text-white/30 tracking-widest uppercase animate-pulse">{label}</span>}
    </div>
  )
}

export function DRPSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-gray-100 dark:bg-white/5 ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,204,0.06), transparent)' }} />
    </div>
  )
}

export function DRPPageLoader({ message = 'Loading...' }: { message?: string }) {
  const [dots, setDots] = useState('.')
  useEffect(() => {
    const t = setInterval(() => setDots(d => d.length >= 3 ? '.' : d + '.'), 400)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="fixed inset-0 bg-white dark:bg-[#030308] flex flex-col items-center justify-center z-50">
      <div className="relative mb-8">
        <DRPLoader size="lg" />
        <div className="absolute inset-0 rounded-full bg-[#00e5cc]/10 blur-xl animate-pulse" />
      </div>
      <p className="text-sm text-gray-400 dark:text-white/30 tracking-widest uppercase font-medium">
        {message.replace(/\.+$/, '')}{dots}
      </p>
    </div>
  )
}

export function DashboardCardSkeleton() {
  return (
    <div className="border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#0a0a14] p-6 space-y-4">
      <div className="flex items-center gap-3">
        <DRPSkeleton className="w-10 h-10 rounded-sm" />
        <div className="flex-1 space-y-2">
          <DRPSkeleton className="h-3 w-24 rounded" />
          <DRPSkeleton className="h-2 w-16 rounded" />
        </div>
      </div>
      <DRPSkeleton className="h-8 w-32 rounded" />
      <DRPSkeleton className="h-2 w-full rounded" />
    </div>
  )
}
