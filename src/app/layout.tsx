import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/scroll-to-top";
import { ReactNode } from "react";

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
        <Navigation />
        {children}
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}
