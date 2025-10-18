import type { Metadata } from 'next'
import { Inter, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({ 
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Decentralized Rights Protocol (DRP)',
  description: 'Building a human-rights-centered blockchain powered by Proof of Status and Proof of Activity.',
  keywords: ['blockchain', 'human rights', 'decentralized', 'quantum safe', 'cryptography', 'governance', 'transparency', 'DRP', 'RIGHTS token', 'DeRi token'],
  authors: [{ name: 'Decentralized Rights Protocol Team' }],
  creator: 'NeonTechnoX',
  publisher: 'Decentralized Rights Protocol',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://decentralizedrights.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Decentralized Rights Protocol (DRP)',
    description: 'Building a human-rights-centered blockchain powered by Proof of Status and Proof of Activity.',
    url: 'https://decentralizedrights.com',
    siteName: 'Decentralized Rights Protocol',
    images: [
      {
        url: '/earth-flag.jpg',
        width: 1200,
        height: 630,
        alt: 'Flag of Planet Earth representing unity and global rights',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Decentralized Rights Protocol (DRP)',
    description: 'Building a human-rights-centered blockchain powered by Proof of Status and Proof of Activity.',
    images: ['/earth-flag.jpg'],
    creator: '@De_Rights',
  },
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
  verification: {
    google: 'your-google-verification-code',
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
        <link rel="icon" type="image/png" href="/DRP.png" />
        <link rel="apple-touch-icon" href="/DRP.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0D1B2A" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script async src="https://tally.so/widgets/embed.js"></script>
      </head>
      <body className={`${inter.variable} ${ibmPlexMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
                  <div className="relative flex min-h-screen flex-col">
                    <Navigation />
                    <main className="flex-1">{children}</main>
                    <Footer />
                    <ScrollToTop />
                  </div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
