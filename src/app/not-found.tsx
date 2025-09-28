'use client'

import Link from 'next/link'
import { Home, ArrowLeft, Search, AlertCircle, Zap, Shield, Brain } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-primary-900 to-secondary-900 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Blockchain Blocks */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary-400 rounded animate-float opacity-60" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-20 w-3 h-3 bg-secondary-400 rounded animate-float opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-5 h-5 bg-accent-400 rounded animate-float opacity-50" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-primary-300 rounded animate-float opacity-70" style={{ animationDelay: '3s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Blockchain 404 Animation */}
        <div className="mb-12">
          <div className="relative inline-block">
            {/* Main 404 with blockchain styling */}
            <div className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 mb-4 animate-pulse-glow">
              404
            </div>
            
            {/* Blockchain blocks around 404 */}
            <div className="absolute -top-4 -left-4 w-6 h-6 bg-primary-500 rounded animate-bounce" style={{ animationDelay: '0.5s' }} />
            <div className="absolute -top-4 -right-4 w-6 h-6 bg-secondary-500 rounded animate-bounce" style={{ animationDelay: '1s' }} />
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent-500 rounded animate-bounce" style={{ animationDelay: '1.5s' }} />
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-primary-400 rounded animate-bounce" style={{ animationDelay: '2s' }} />
            
            {/* Connection lines */}
            <div className="absolute top-1/2 left-0 w-8 h-0.5 bg-gradient-to-r from-primary-500 to-transparent transform -translate-y-1/2" />
            <div className="absolute top-1/2 right-0 w-8 h-0.5 bg-gradient-to-l from-secondary-500 to-transparent transform -translate-y-1/2" />
          </div>
        </div>

        {/* Error Message with Blockchain Theme */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-full">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <span className="text-red-300 font-medium">Block Not Found</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Transaction Failed
          </h1>
          <p className="text-neutral-300 mb-8 text-lg leading-relaxed max-w-xl mx-auto">
            The block you're looking for doesn't exist in our blockchain. 
            It might have been orphaned or never mined.
          </p>
          
          {/* Blockchain Status */}
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
              Network: Online
            </div>
            <div className="flex items-center text-blue-400">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
              Consensus: Active
            </div>
            <div className="flex items-center text-purple-400">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse" />
              Hash: 0x404...
            </div>
          </div>
        </div>

        {/* Action Buttons with Blockchain Styling */}
        <div className="space-y-4 mb-12">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-2xl text-white bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Home className="w-6 h-6 mr-3" />
            Return to Genesis Block
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full inline-flex items-center justify-center px-8 py-4 border-2 border-neutral-400 text-lg font-semibold rounded-2xl text-neutral-300 bg-transparent hover:bg-neutral-800/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft className="w-6 h-6 mr-3" />
            Previous Block
          </button>
        </div>

        {/* DRP Features Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
            <Shield className="w-8 h-8 text-primary-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold mb-1">Quantum-Safe</h3>
            <p className="text-neutral-300 text-sm">NIST-approved cryptography</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
            <Brain className="w-8 h-8 text-secondary-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold mb-1">AI-Verified</h3>
            <p className="text-neutral-300 text-sm">Proof of Activities</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
            <Zap className="w-8 h-8 text-accent-400 mx-auto mb-2" />
            <h3 className="text-white font-semibold mb-1">Sustainable</h3>
            <p className="text-neutral-300 text-sm">Clean energy rewards</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link
            href="/whitepaper"
            className="p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 text-white text-sm border border-white/20 hover:border-white/40"
          >
            Whitepaper
          </Link>
          <Link
            href="/docs"
            className="p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 text-white text-sm border border-white/20 hover:border-white/40"
          >
            Documentation
          </Link>
          <Link
            href="/roadmap"
            className="p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 text-white text-sm border border-white/20 hover:border-white/40"
          >
            Roadmap
          </Link>
          <Link
            href="/community"
            className="p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 text-white text-sm border border-white/20 hover:border-white/40"
          >
            Community
          </Link>
        </div>

        {/* Help Text */}
        <div className="text-neutral-400 text-sm">
          <p>
            Need help? Check our{' '}
            <Link href="/docs" className="text-primary-400 hover:text-primary-300 transition-colors">
              documentation
            </Link>{' '}
            or{' '}
            <Link href="/community" className="text-primary-400 hover:text-primary-300 transition-colors">
              join our community
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}