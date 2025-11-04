import * as React from 'react'
import Link from 'next/link'
import { ShieldCheck, FileText } from 'lucide-react'
import TermsContent from '../../../legal/terms-of-service.mdx'

export const metadata = {
  title: 'Terms of Service | Decentralized Rights Protocol',
  description:
    'Terms of Service for using the Decentralized Rights Protocol (DRP) websites, apps, smart contracts, APIs, and services.',
  openGraph: {
    title: 'Terms of Service | Decentralized Rights Protocol',
    description:
      'Terms of Service for using the Decentralized Rights Protocol (DRP) websites, apps, smart contracts, APIs, and services.',
    images: ['/DRP.png'],
  },
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <section className="mb-10 text-center">
          <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">Terms of Service</h1>
          <p className="mt-3 text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
            The terms that govern your use of DRP websites, applications, smart contracts, and services.
          </p>
        </section>

        <article className="prose prose-neutral prose-lg dark:prose-invert max-w-none bg-white/80 dark:bg-neutral-900/60 backdrop-blur-sm rounded-xl p-6 border border-neutral-200/60 dark:border-neutral-800/60 shadow-md">
          {/* @ts-expect-error MDX component */}
          <TermsContent />
        </article>

        <nav className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/privacy-policy" className="flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition">
            <FileText className="h-5 w-5" /> DRP Privacy Policy
          </Link>
          <Link href="/eldercore-terms" className="flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition">
            <ShieldCheck className="h-5 w-5" /> ElderCore Terms of Service
          </Link>
          <Link href="/eldercore-privacy" className="flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition">
            <FileText className="h-5 w-5" /> ElderCore Privacy Policy
          </Link>
        </nav>
      </div>
    </div>
  )
}


