import * as React from 'react'
import Link from 'next/link'
import { Shield, FileText } from 'lucide-react'
import PrivacyContent from '../../../legal/privacy-policy.mdx'

export const metadata = {
  title: 'Privacy Policy | Decentralized Rights Protocol',
  description:
    'Privacy Policy for Decentralized Rights Protocol (DRP) explaining data handling, security, and user rights.',
  openGraph: {
    title: 'Privacy Policy | Decentralized Rights Protocol',
    description:
      'Privacy Policy for Decentralized Rights Protocol (DRP) explaining data handling, security, and user rights.',
    images: ['/DRP.png'],
  },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <section className="mb-10 text-center">
          <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">Privacy Policy</h1>
          <p className="mt-3 text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
            How DRP collects, uses, and protects information across our websites, applications, and services.
          </p>
        </section>

        <article className="prose prose-neutral prose-lg dark:prose-invert max-w-none bg-white/80 dark:bg-neutral-900/60 backdrop-blur-sm rounded-xl p-6 border border-neutral-200/60 dark:border-neutral-800/60 shadow-md">
          {/* @ts-expect-error MDX component */}
          <PrivacyContent />
        </article>

        <nav className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/terms-of-service" className="flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition">
            <FileText className="h-5 w-5" /> DRP Terms of Service
          </Link>
          <Link href="/eldercore-terms" className="flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition">
            <FileText className="h-5 w-5" /> ElderCore Terms of Service
          </Link>
          <Link href="/eldercore-privacy" className="flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition">
            <FileText className="h-5 w-5" /> ElderCore Privacy Policy
          </Link>
        </nav>
      </div>
    </div>
  )
}


