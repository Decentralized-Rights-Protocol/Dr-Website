import type { Metadata } from "next";
import "../src/app/globals.css";
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import { ThemeProvider } from "@/components/theme-provider";
import { ReactNode } from "react";
import Script from "next/script";

export const metadata: Metadata = {
  title: 'Decentralized Rights Protocol (DRP)',
  description: 'DRP — The Decentralized Rights Protocol that verifies human activity, promotes sustainability, and builds a trust-based global economy.',
  keywords: ['blockchain', 'decentralized rights', 'proof of status', 'proof of activity', 'DRP', 'AI blockchain', 'human rights', 'sustainability', 'crypto Africa', 'decentralized economy', 'Web3', 'clean energy'],
  authors: [{ name: 'Decentralized Rights Protocol Team' }],
  creator: 'NeonTechnoX',
  publisher: 'Decentralized Rights Protocol',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://decentralizedrights.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Decentralized Rights Protocol (DRP)',
    description: 'DRP — The Decentralized Rights Protocol that verifies human activity, promotes sustainability, and builds a trust-based global economy.',
    url: 'https://decentralizedrights.com',
    siteName: 'Decentralized Rights Protocol',
    images: [
      {
        url: '/08_IFOPE_20x30.jpg',
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
    description: 'DRP — The Decentralized Rights Protocol that verifies human activity, promotes sustainability, and builds a trust-based global economy.',
    images: ['/08_IFOPE_20x30.jpg'],
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
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/site-icon.png" />
        <link rel="apple-touch-icon" href="/site-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0D1B2A" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Tally embed script */}
        <Script async src="https://tally.so/widgets/embed.js" />
      </head>
      <body>
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
        {/* Google Translate Script */}
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
