import { Metadata } from 'next';
import Link from 'next/link';
import { readFileSync } from 'fs';
import { join } from 'path';
import ReactMarkdown from 'react-markdown';

export const metadata: Metadata = {
  title: 'ElderCore Terms of Service | Decentralized Rights Protocol',
  description: 'Terms of Service for the ElderCore platform by Decentralized Rights Protocol.',
  openGraph: {
    title: 'ElderCore Terms | DRP',
    description: 'Legal terms for ElderCore eldercare coordination platform',
    images: ['/DRP.png'],
  },
};

export default function ElderCoreTermsPage() {
  const content = readFileSync(join(process.cwd(), 'legal', 'eldercore-terms.mdx'), 'utf-8');
  
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            ElderCore Terms of Service
          </h1>
          <p className="text-muted-foreground text-lg">
            ElderCare Coordination Platform
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        {/* Cross-links */}
        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-xl font-semibold mb-4">Related Documents</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/eldercore-privacy"
              className="p-4 rounded-lg border border-border hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">ElderCore Privacy Policy</h3>
              <p className="text-sm text-muted-foreground">How we protect your data</p>
            </Link>
            <Link
              href="/terms-of-service"
              className="p-4 rounded-lg border border-border hover:border-primary transition-colors"
            >
              <h3 className="font-semibold mb-2">DRP Terms of Service</h3>
              <p className="text-sm text-muted-foreground">Main platform terms</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
