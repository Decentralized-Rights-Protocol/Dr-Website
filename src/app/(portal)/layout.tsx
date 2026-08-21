import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProviders } from "@/components/providers";
import { AppShell } from "@/components/layout/AppShell";
import { ThemeProvider } from "@/components/portal/theme-provider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#00c4af" },
    { media: "(prefers-color-scheme: dark)", color: "#030308" },
  ],
};

export const metadata: Metadata = {
  title: "DRP App - Decentralized Rights Protocol",
  description:
    "Document and verify activities that advance human rights. Earn rewards for your contributions to social justice.",
  keywords:
    "human rights, blockchain, verification, rewards, social justice, activism",
  openGraph: {
    title: "DRP App - Decentralized Rights Protocol",
    description: "Your Rights, Your Proof, Your Impact",
    type: "website",
    siteName: "DRP App",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
        >
          <AppProviders>
            <div className="noise-overlay" aria-hidden="true" />
            <AppShell>{children}</AppShell>
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
