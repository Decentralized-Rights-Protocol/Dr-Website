'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const quickLinks = [
  { label: 'Home', href: '/' }, { label: 'About DRP', href: '/about' },
  { label: 'Protocol Docs', href: '/docs' }, { label: 'Whitepaper', href: '/whitepaper' },
  { label: 'Ecosystem', href: '/ecosystem' }, { label: 'Community', href: '/community' },
  { label: 'Learn', href: '/learn' }, { label: 'Tokens', href: '/tokens' },
]

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(0,229,204,0.025) 1px, transparent 1px),linear-gradient(90deg, rgba(0,229,204,0.025) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00e5cc]/[0.04] blur-[120px] pointer-events-none" />
      <div className="relative max-w-2xl w-full text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-4 relative select-none">
          <div className="text-[9rem] sm:text-[13rem] font-black leading-none text-foreground/[0.03]">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[9rem] sm:text-[13rem] font-black leading-none text-[#00e5cc]/12">404</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#00e5cc]/30 bg-[#00e5cc]/5 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00e5cc] animate-pulse" />
            <span className="text-[#00e5cc] text-xs font-medium tracking-widest uppercase">Page Not Found</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4">This page doesn&apos;t exist in the protocol.</h1>
          <p className="text-foreground/40 text-base mb-12 max-w-md mx-auto leading-relaxed">The route you&apos;re looking for may have moved, been removed, or never existed. Every proof needs a valid address — this one doesn&apos;t check out.</p>
          <div className="mb-12">
            <p className="text-xs tracking-widest uppercase text-foreground/20 mb-5">Jump to</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {quickLinks.map((l) => (
                <Link key={l.href} href={l.href}
                  className="px-4 py-2 border border-foreground/8 text-sm text-foreground/40 hover:border-[#00e5cc]/40 hover:text-[#00e5cc] transition-all duration-200">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#00e5cc] text-black font-bold text-sm tracking-wide hover:bg-foreground hover:text-background transition-all duration-300">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <Link href="/docs" className="inline-flex items-center justify-center gap-3 px-7 py-4 border border-foreground/15 text-foreground/55 text-sm hover:text-foreground hover:border-[#00e5cc]/30 transition-all duration-300">
              Browse Docs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
