import './globals.css'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import { Footer } from '@/components/footer'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: {
    default: 'Decentralized Rights Protocol | Quantum-Safe Blockchain for Human Rights',
    template: '%s | Decentralized Rights Protocol',
  },
  description: 'Decentralized Rights Protocol (DRP) is a quantum-safe blockchain platform that protects human rights through AI-verified consensus, Proof of Status (PoST), and Proof of Activity (PoAT). Built with NIST-approved post-quantum cryptography, DRP prioritizes human dignity, sustainability, and transparent governance.',
  keywords: [
    'decentralized rights protocol',
    'DRP blockchain',
    'quantum-safe blockchain',
    'human rights blockchain',
    'proof of activity',
    'proof of status',
    'AI-verified consensus',
    'sustainable blockchain',
    'blockchain governance',
    'RIGHTS token',
    'DeRi token',
    'CRYSTALS-Kyber',
    'CRYSTALS-Dilithium',
    'post-quantum cryptography',
    'decentralized governance',
    'sustainable web3',
    'human-centered blockchain',
  ],
  metadataBase: new URL('https://decentralizedrights.com'),
  openGraph: {
    title: 'Decentralized Rights Protocol',
    description: 'DRP — The Decentralized Rights Protocol that verifies human activity, promotes sustainability, and builds a trust-based global economy.',
    url: 'https://decentralizedrights.com',
    siteName: 'Decentralized Rights Protocol',
    images: [
      {
        url: 'https://decentralizedrights.com/08_IFOPE_20x30.jpg',
        width: 1200,
        height: 800,
        alt: 'Decentralized Rights Protocol',
      },
    ],
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
    icon: '/site-icon.png',
    shortcut: '/site-icon.png',
    apple: '/site-icon.png',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
