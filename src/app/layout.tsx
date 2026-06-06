import './globals.css'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import { Footer } from '@/components/footer'
import { ThemeProvider } from '@/components/theme-provider'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { AppProviders } from '@/components/providers'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: {
    default: 'Decentralized Rights Protocol | Quantum-Safe Blockchain for Human Rights',
    template: '%s | Decentralized Rights Protocol',
  },
  description:
    'Decentralized Rights Protocol (DRP) is a quantum-safe blockchain platform that protects human rights through AI-verified consensus, Proof of Status (PoST), and Proof of Activity (PoAT). Built with NIST-approved post-quantum cryptography, DRP prioritizes human dignity, sustainability, and transparent governance.',
  keywords: [
    'decentralized rights protocol','human rights infrastructure','proof of status','proof of activity',
    'AI-assisted governance','sustainable blockchain','transparent verification','rights-centered governance',
    'decentralized identity','blockchain for social impact','DRP blockchain','quantum-safe blockchain',
    'human rights blockchain','RIGHTS token','DeRi token','CRYSTALS-Kyber','CRYSTALS-Dilithium',
    'post-quantum cryptography','decentralized governance','sustainable web3','human-centered blockchain',
  ],
  metadataBase: new URL('https://decentralizedrights.com'),
  openGraph: {
    title: 'Decentralized Rights Protocol',
    description: 'DRP — The Decentralized Rights Protocol that verifies human activity, promotes sustainability, and builds a trust-based global economy.',
    url: 'https://decentralizedrights.com',
    siteName: 'Decentralized Rights Protocol',
    images: [{ url: 'https://decentralizedrights.com/08_IFOPE_20x30.jpg', width: 1200, height: 800, alt: 'Decentralized Rights Protocol' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Decentralized Rights Protocol',
    description: 'DRP — The Decentralized Rights Protocol that verifies human activity, promotes sustainability, and builds a trust-based global economy.',
    creator: '@De_Rights',
    images: ['https://decentralizedrights.com/08_IFOPE_20x30.jpg'],
  },
  icons: {
    icon: [
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/icons/apple-touch-icon.png',
  },
  manifest: '/icons/site.webmanifest',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('min-h-screen bg-background font-sans antialiased')}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AppProviders>
            <div className="noise-overlay" aria-hidden="true" />
            <Navigation />
            <div className="flex flex-col min-h-screen">
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </AppProviders>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
