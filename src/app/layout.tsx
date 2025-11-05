import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import { ReactNode } from "react";
import Script from "next/script";

export const metadata: Metadata = {
  title: 'Decentralized Rights Protocol (DRP)',
  description: 'Building a human-rights-centered blockchain powered by Proof of Status and Proof of Activity.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dr-website.vercel.app'),
  openGraph: {
    title: 'Decentralized Rights Protocol (DRP)',
    description:
      'Building a human-rights-centered blockchain powered by Proof of Status and Proof of Activity.',
    images: [
      {
        url: '/08_IFOPE_20x30.jpg',
        width: 1200,
        height: 630,
        alt: 'Flag of Planet Earth representing unity and global rights',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Decentralized Rights Protocol (DRP)',
    description:
      'Building a human-rights-centered blockchain powered by Proof of Status and Proof of Activity.',
    images: ['/08_IFOPE_20x30.jpg'],
    creator: '@De_Rights',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Tally embed script (only loads when used) */}
        {process.env.NEXT_PUBLIC_TALLY_FORM_ID ? (
          <Script src="https://tally.so/widgets/embed.js" strategy="afterInteractive" />
        ) : null}
        <Navigation />
        {children}
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}
