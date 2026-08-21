"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Wallet, User, Bell, ExternalLink } from "lucide-react";
import { useMutation as useConvexMutation } from "convex/react";
import { ThemeToggle } from "@/components/portal/theme-toggle";
import { useWallet } from "@/hooks/useWallet";
import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";

const NAV_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/proofs/activities", label: "Proofs" },
  { href: "/governance", label: "Governance" },
  { href: "/review", label: "Review" },
  { href: "/wallet", label: "Wallet" },
  { href: "/rewards", label: "Rewards" },
  { href: "/leaderboard", label: "Community" },
  { href: "/learn", label: "Learn" },
];

const FOOTER_COLS = [
  {
    title: "Platform",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Governance", href: "/governance" },
      { label: "Review", href: "/review" },
      { label: "Explorer", href: "/explorer" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "https://decentralizedrights.com/docs" },
      { label: "Learn", href: "/learn" },
      { label: "Roadmap", href: "https://decentralizedrights.com/roadmap" },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        label: "Privacy Policy",
        href: "https://decentralizedrights.com/legal/privacy-policy",
      },
      {
        label: "Terms of Service",
        href: "https://decentralizedrights.com/legal/terms-of-service",
      },
    ],
  },
];

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { address, connect, isConnecting } = useWallet();
  const touchWalletSession = useConvexMutation(api.users.touchWalletSession);

  useEffect(() => {
    if (!address) return;
    void touchWalletSession({ walletAddress: address });
  }, [address, touchWalletSession]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname?.startsWith(href) ?? false;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-[#00e5cc]/20">
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-foreground/[0.06] bg-background/95 shadow-sm backdrop-blur-2xl dark:shadow-none"
            : "border-b border-transparent bg-background/60 backdrop-blur-xl",
        )}
      >
        <div className="mx-auto flex h-[60px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-6">
          <Link
            href="/dashboard"
            className="group flex shrink-0 items-center gap-2.5"
          >
            <Image
              src="/logo.png"
              alt="DRP"
              width={28}
              height={28}
              className="opacity-85 transition-opacity group-hover:opacity-100"
              priority
            />
            <div className="hidden sm:block">
              <span className="block text-xs font-bold uppercase tracking-[0.2em] text-foreground">
                DRP App
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-foreground/30">
                Decentralized Rights
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "px-3 py-2 text-sm tracking-wide transition-colors duration-200",
                  isActive(l.href)
                    ? "text-[#00e5cc]"
                    : "text-foreground/45 hover:text-foreground",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://decentralizedrights.com"
              className="hidden items-center gap-1.5 text-xs uppercase tracking-widest text-foreground/30 hover:text-foreground/60 transition-colors md:inline-flex"
            >
              decentralizedrights.com <ExternalLink className="h-3 w-3" />
            </a>
            <ThemeToggle />
            <button
              type="button"
              className="hidden h-8 w-8 items-center justify-center text-foreground/40 hover:text-foreground/70 transition-colors lg:flex"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
            </button>
            {address ? (
              <Link
                href="/profile"
                className="hidden items-center gap-2 bg-[#00e5cc] px-4 py-2 text-xs font-bold uppercase tracking-widest text-background transition-all hover:bg-[#00bfff] sm:inline-flex"
              >
                <User className="h-3.5 w-3.5" />
                {address.slice(0, 6)}…{address.slice(-4)}
              </Link>
            ) : (
              <button
                type="button"
                onClick={async () => {
                  try {
                    await connect();
                  } catch (error) {
                    console.error("Failed to connect wallet:", error);
                  }
                }}
                disabled={isConnecting}
                className="hidden items-center gap-2 bg-[#00e5cc] px-4 py-2 text-xs font-bold uppercase tracking-widest text-background transition-all hover:bg-[#00bfff] disabled:opacity-50 sm:inline-flex"
              >
                <Wallet className="h-3.5 w-3.5" />
                {isConnecting ? "Connecting…" : "Connect Wallet"}
              </button>
            )}
            <button
              type="button"
              className="flex h-8 w-8 items-center justify-center text-foreground/50 lg:hidden"
              onClick={() => setIsMobileNavOpen((prev) => !prev)}
              aria-expanded={isMobileNavOpen}
              aria-controls="mobile-navigation"
              aria-label="Toggle menu"
            >
              {isMobileNavOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {isMobileNavOpen && (
          <div
            id="mobile-navigation"
            className="max-h-[80vh] overflow-y-auto border-t border-foreground/5 bg-background lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-4">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "py-2.5 text-sm transition-colors",
                    isActive(l.href)
                      ? "text-[#00e5cc]"
                      : "text-foreground/50 hover:text-[#00e5cc]",
                  )}
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-4 border-t border-foreground/5 pt-4">
                {address ? (
                  <Link
                    href="/profile"
                    className="flex w-full items-center justify-center gap-2 bg-[#00e5cc] py-3 text-xs font-bold uppercase tracking-widest text-background"
                  >
                    <User className="h-4 w-4" />
                    {address.slice(0, 6)}…{address.slice(-4)}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await connect();
                        setIsMobileNavOpen(false);
                      } catch (error) {
                        console.error("Failed to connect wallet:", error);
                      }
                    }}
                    disabled={isConnecting}
                    className="flex w-full items-center justify-center gap-2 bg-[#00e5cc] py-3 text-xs font-bold uppercase tracking-widest text-background disabled:opacity-50"
                  >
                    <Wallet className="h-4 w-4" />
                    {isConnecting ? "Connecting…" : "Connect Wallet"}
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      <footer className="border-t border-foreground/5 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
            <div className="flex items-center gap-2.5">
              <Image src="/logo.png" alt="DRP Logo" width={26} height={26} />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">
                  DRP App
                </p>
                <p className="text-xs text-foreground/30">
                  Engineered for human rights.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-12">
              {FOOTER_COLS.map((col) => (
                <div key={col.title} className="flex flex-col gap-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-foreground/40">
                    {col.title}
                  </p>
                  {col.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-foreground/40 hover:text-[#00e5cc] transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-foreground/5 pt-8 sm:flex-row">
            <p className="text-xs text-foreground/30">
              © {new Date().getFullYear()} Decentralized Rights Protocol.
            </p>
            <div className="flex gap-6">
              <a
                href="https://twitter.com/De_Rights"
                target="_blank"
                rel="noreferrer"
                className="text-foreground/30 transition-colors hover:text-[#00e5cc]"
              >
                <span className="sr-only">X</span>
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.261 5.636L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                </svg>
              </a>
              <a
                href="https://github.com/Decentralized-Rights-Protocol"
                target="_blank"
                rel="noreferrer"
                className="text-foreground/30 transition-colors hover:text-[#00e5cc]"
              >
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.008.069-.008 1.008.07 1.536 1.037 1.536 1.037.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://discord.gg/zbWg92AnQQ"
                target="_blank"
                rel="noreferrer"
                className="text-foreground/30 transition-colors hover:text-[#00e5cc]"
              >
                <span className="sr-only">Discord</span>
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.03.054a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
