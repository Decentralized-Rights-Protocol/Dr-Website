'use client'

import Link from 'next/link'
import { Home, ArrowLeft, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-950 via-primary-900 to-secondary-900">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* 404 Animation */}
        <div className="relative">
          <div className="text-9xl font-bold text-white/20">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-secondary-400 to-accent-400 opacity-20 animate-pulse"></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-white">
            Page Not Found
          </h1>
          <p className="text-neutral-300 text-lg">
            Sorry, we couldn't find the page you're looking for. 
            The page might have been moved, deleted, or doesn't exist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors"
          >
            <Home className="mr-2 h-5 w-5" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </button>
        </div>

        {/* Quick Links */}
        <div className="pt-8 border-t border-white/20">
          <p className="text-neutral-300 mb-4">Or try one of these popular pages:</p>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/whitepaper"
              className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white text-sm"
            >
              Whitepaper
            </Link>
            <Link
              href="/docs"
              className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white text-sm"
            >
              Documentation
            </Link>
            <Link
              href="/roadmap"
              className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white text-sm"
            >
              Roadmap
            </Link>
            <Link
              href="/community"
              className="p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white text-sm"
            >
              Community
            </Link>
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="pt-4">
          <p className="text-neutral-400 text-sm mb-2">
            Looking for something specific?
          </p>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search the site..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  )
}