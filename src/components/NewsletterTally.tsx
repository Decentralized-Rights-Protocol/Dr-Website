"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, Sparkles } from "lucide-react";

export default function NewsletterTally() {
  const [consented, setConsented] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (!consented) return;
    if (document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
      setScriptReady(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    script.onload = () => setScriptReady(true);
    document.body.appendChild(script);
    return () => {
      script.remove();
    };
  }, [consented]);

  return (
    <div className="relative overflow-hidden border border-gray-100 bg-gray-50 p-8 dark:border-white/8 dark:bg-[#0a0a14] sm:p-10">
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-[#00e5cc]/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[#00bfff]/5 blur-3xl" />
      <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex items-start gap-4">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-[#00e5cc]/20 bg-[#00e5cc]/10">
            <Mail className="h-4 w-4 text-[#00e5cc]" aria-hidden="true" />
          </div>
          <div>
            <div className="mb-1 flex items-center gap-2">
              <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">Stay in the Loop</h3>
              <Sparkles className="h-3 w-3 text-[#00e5cc]" aria-hidden="true" />
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-gray-500 dark:text-foreground/35">Protocol updates, launches, and human-rights milestones — straight to your inbox.</p>
          </div>
        </div>
        <div className="shrink-0">
          {!consented ? (
            <div className="max-w-xs space-y-3">
              <label className="flex cursor-pointer items-start gap-2 text-xs leading-relaxed text-foreground/50">
                <input type="checkbox" checked={consented} onChange={(e) => setConsented(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#00e5cc]" />
                <span>I agree that opening the newsletter form may send my information to Tally for subscription processing. See our <Link href="/legal/privacy-policy" className="underline hover:text-[#00e5cc]">Privacy Policy</Link> and <Link href="/cookie-policy" className="underline hover:text-[#00e5cc]">Cookie Policy</Link>.</span>
              </label>
              <button type="button" disabled className="inline-flex cursor-not-allowed items-center gap-2 bg-[#00e5cc]/40 px-6 py-3 text-sm font-bold tracking-wide text-background/70" aria-disabled="true">
                <Mail className="h-4 w-4" aria-hidden="true" /> Subscribe
              </button>
            </div>
          ) : (
            <button
              type="button"
              data-tally-open="3xKMro"
              data-tally-layout="modal"
              data-tally-align-left="1"
              data-tally-hide-title="1"
              data-tally-overlay="1"
              data-tally-emoji-text="👋"
              data-tally-emoji-animation="wave"
              disabled={!scriptReady}
              className="inline-flex items-center gap-2 bg-[#00e5cc] px-6 py-3 text-sm font-bold tracking-wide text-background transition-all hover:bg-[#00bfff] disabled:cursor-wait disabled:opacity-60"
            >
              <Mail className="h-4 w-4" aria-hidden="true" /> {scriptReady ? "Open subscription form" : "Loading form…"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
