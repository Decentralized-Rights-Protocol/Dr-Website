import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DRP Explorer | Decentralized Rights Protocol",
  description: "Explore DRP network activity, blocks, transactions, and verification infrastructure using live API data.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
