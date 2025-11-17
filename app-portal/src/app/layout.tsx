import type { Metadata } from 'next'
import './globals.css'
import { AppProviders } from '@/components/providers'
import { AppShell } from '@/components/layout/AppShell'

export const metadata: Metadata = {
  title: 'DRP App - Decentralized Rights Protocol',
  description: 'Document and verify activities that advance human rights. Earn rewards for your contributions to social justice.',
  keywords: 'human rights, blockchain, verification, rewards, social justice, activism',
  openGraph: {
    title: 'DRP App - Decentralized Rights Protocol',
    description: 'Your Rights, Your Proof, Your Impact',
    type: 'website',
    siteName: 'DRP App'
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' }
  ]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-neutral-900 antialiased dark:bg-neutral-950 dark:text-neutral-50">
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  )
}
