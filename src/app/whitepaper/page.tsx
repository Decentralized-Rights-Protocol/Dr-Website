'use client'

import Link from 'next/link'
import { Download, Eye, FileText, ArrowLeft, ExternalLink } from 'lucide-react'
import { ParticleBackground } from '@/components/particle-background'

export default function WhitepaperPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-neutral-950 via-primary-950 to-neutral-950 overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl animate-bounce delay-500"></div>
      </div>
      
      <div className="relative z-10">
      {/* Header */}
      <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Version 0.5
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-5xl mb-6">
            DRP Whitepaper
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-3xl mx-auto">
            The Decentralized Rights Protocol (DRP) - A Quantum-Safe Blockchain Platform 
            for Human Rights Protection and Global Impact
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="/whitepaper_v0.5.pdf"
              download="DRP_Whitepaper_v0.5.pdf"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Download className="mr-3 h-5 w-5" />
              Download PDF
            </a>
            <a
              href="/whitepaper_v0.5.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-neutral-700 dark:text-neutral-300 border-2 border-neutral-300 dark:border-neutral-600 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-300 hover:scale-105"
            >
              <Eye className="mr-3 h-5 w-5" />
              Preview Online
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Whitepaper Preview */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-700 overflow-hidden mb-12">
          <div className="p-8">
            <div className="flex items-center mb-6">
              <FileText className="h-8 w-8 text-primary-600 mr-3" />
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                Whitepaper Preview
              </h2>
            </div>
            
            {/* PDF Embed */}
            <div className="relative w-full h-[600px] rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-600">
              <iframe
                src="/whitepaper_v0.5.pdf#toolbar=1&navpanes=1&scrollbar=1"
                className="w-full h-full"
                title="DRP Whitepaper Preview"
              />
            </div>
            
            <div className="mt-6 p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                <strong>Note:</strong> If the preview doesn&rsquo;t load, you can download the PDF directly using the button above.
              </p>
            </div>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
              🔐 Quantum-Safe Security
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Built with NIST-approved CRYSTALS-Kyber and CRYSTALS-Dilithium algorithms 
              for future-proof security against quantum attacks.
            </p>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
              🤖 AI-Verified Consensus
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Proof of Status & Proof of Activities ensure trust by verifying real human 
              effort with advanced AI systems.
            </p>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
              🌱 Sustainability-First
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Rewards participants for using clean energy and sustainable resources, 
              promoting environmental responsibility.
            </p>
          </div>
          
          <div className="bg-white dark:bg-neutral-800 p-6 rounded-xl border border-neutral-200 dark:border-neutral-700">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
              👥 Human Rights Centered
            </h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Dual-token model with $RIGHTS for governance and $DeRi for utility, 
              prioritizing human dignity and fairness.
            </p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-700 p-8">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Table of Contents
          </h2>
          <div className="space-y-3">
            {[
              '1. Executive Summary',
              '2. Introduction to DRP',
              '3. Problem Statement',
              '4. Solution Architecture',
              '5. Quantum-Safe Cryptography',
              '6. Consensus Mechanisms',
              '7. Token Economy',
              '8. Governance Model',
              '9. Sustainability Framework',
              '10. Implementation Roadmap',
              '11. Risk Assessment',
              '12. Conclusion & Future Work'
            ].map((item, index) => (
              <div key={index} className="flex items-center py-2 px-4 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400 w-8">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-neutral-900 dark:text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Learn More?
            </h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Dive deeper into the technical specifications and join our community 
              to contribute to the future of human rights protection.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/docs"
                className="inline-flex items-center px-6 py-3 text-lg font-semibold text-primary-600 bg-white rounded-xl hover:bg-neutral-50 transition-colors"
              >
                Read Documentation
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/community"
                className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-colors"
              >
                Join Community
              </Link>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
