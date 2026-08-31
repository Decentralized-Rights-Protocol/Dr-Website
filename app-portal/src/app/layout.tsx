import type { Metadata } from 'next'
import './globals.css'
import { AppProviders } from '@/components/providers'
import { AppShell } from '@/components/layout/AppShell'

export const metadata: Metadata = {
  title: 'DRP Portal | Infrastructure for Verified Rights',
  description: 'The Decentralized Rights Protocol application portal for submitting activity, committing evidence, reviewing claims, and participating in a rights-first verification network.',
  keywords: ['Decentralized Rights Protocol', 'DRP', 'Proof of Activity', 'Proof of Status', 'verified rights', 'human rights infrastructure'],
  metadataBase: new URL('https://app.decentralizedrights.com'),
  openGraph: {
    title: 'DRP Portal | Infrastructure for Verified Rights',
    description: 'Your rights. Your proof. Your impact.',
    url: 'https://app.decentralizedrights.com',
    type: 'website',
    siteName: 'Decentralized Rights Protocol',
    images: [{ url: 'https://decentralizedrights.com/08_IFOPE_20x30.jpg', width: 1200, height: 1500, alt: 'Decentralized Rights Protocol' }],
  },
  icons: { icon: '/drp-icon.svg' },
  themeColor: '#030308',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  )
}
