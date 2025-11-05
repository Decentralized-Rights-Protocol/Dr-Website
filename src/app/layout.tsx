import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { Footer } from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import { ReactNode } from "react";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Decentralized Rights Protocol",
  description: "Blockchain-based rights management and verification system",
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
