import './globals.css'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import { Footer } from '@/components/footer'
import { ThemeProvider } from '@/components/theme-provider'
import { ScrollToTop } from '@/components/scroll-to-top'

export const metadata: Metadata = {
  title: 'Decentralized Rights Protocol',
  description: 'Empowering human rights, sustainability, and AI transparency through blockchain',
  metadataBase: new URL('https://decentralizedrights.com'),
  openGraph: {
    title: 'Decentralized Rights Protocol',
    description: 'Empowering human rights, sustainability, and AI transparency through blockchain',
    url: 'https://decentralizedrights.com',
    siteName: 'Decentralized Rights Protocol',
    images: [
      {
        url: '/DRP.png',
        width: 1200,
        height: 630,
        alt: 'Decentralized Rights Protocol',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Decentralized Rights Protocol',
    description: 'Empowering human rights, sustainability, and AI transparency through blockchain',
    creator: '@De_Rights',
    images: ['/DRP.png'],
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
