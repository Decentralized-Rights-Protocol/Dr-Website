import * as React from 'react'
import Link from 'next/link'
import { Shield, FileText } from 'lucide-react'
import { readFileSync } from 'fs'
import { join } from 'path'
import ReactMarkdown from 'react-markdown'

export const metadata = {
  title: 'ElderCore Privacy Policy | DRP',
  description: 'Privacy Policy for the ElderCore Discord bot and how data is handled.',
  openGraph: {
    title: 'ElderCore Privacy Policy | DRP',
    description: 'Privacy Policy for the ElderCore Discord bot and how data is handled.',
    images: ['/DRP.png'],
  },
}

export default function EldercorePrivacyPage() {
  const content = readFileSync(join(process.cwd(), 'legal', 'eldercore-privacy.mdx'), 'utf-8')
  
  return (
    <div className="min-h-screen py-12" style={{ background: 'linear-gradient(to bottom right, #1e3a8a, #312e81, #581c87)' }}>
      <div className="container mx-auto px-4 max-w-4xl">
        <section className="mb-10 text-center">
          <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">ElderCore Privacy Policy</h1>
          <p className="mt-3 text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
            How ElderCore handles data within Discord servers in line with permissions and safeguards.
          </p>
        </section>

        <article className="prose prose-neutral prose-lg dark:prose-invert max-w-none bg-white/80 dark:bg-neutral-900/60 backdrop-blur-sm rounded-xl p-6 border border-neutral-200/60 dark:border-neutral-800/60 shadow-md">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>

        <nav className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link href="/eldercore-terms" className="flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition">
            <FileText className="h-5 w-5" /> ElderCore Terms of Service
          </Link>
          <Link href="/privacy-policy" className="flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition">
            <FileText className="h-5 w-5" /> DRP Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition">
            <FileText className="h-5 w-5" /> DRP Terms of Service
          </Link>
        </nav>
      </div>
    </div>
  )
}


