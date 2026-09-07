import * as React from "react";
import Link from "next/link";
import { Cookie, FileText } from "lucide-react";
import { readFileSync } from "fs";
import { join } from "path";
import ReactMarkdown from "react-markdown";

export const metadata = {
  title: "Cookie Policy | Decentralized Rights Protocol",
  description: "How DRP uses cookies, browser storage, and third-party embeds.",
};

export default function CookiePolicyPage() {
  const content = readFileSync(join(process.cwd(), "legal", "cookie-policy.mdx"), "utf-8");
  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <header className="mb-10 text-center">
          <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Cookie className="h-7 w-7" aria-hidden="true" />
          </div>
          <h1 className="text-4xl font-bold">Cookie Policy</h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            How DRP uses cookies, browser storage, and third-party embeds.
          </p>
        </header>
        <article className="prose prose-neutral prose-lg dark:prose-invert max-w-none rounded-xl border bg-background/90 p-6 shadow-sm sm:p-8">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
        <nav aria-label="Legal pages" className="mt-8 grid gap-3 sm:grid-cols-3">
          <Link href="/legal/privacy-policy" className="flex items-center gap-2 rounded-lg border p-4 hover:bg-muted">
            <FileText className="h-5 w-5" aria-hidden="true" /> Privacy Policy
          </Link>
          <Link href="/legal/terms-of-service" className="flex items-center gap-2 rounded-lg border p-4 hover:bg-muted">
            <FileText className="h-5 w-5" aria-hidden="true" /> Terms of Service
          </Link>
          <Link href="/refund-policy" className="flex items-center gap-2 rounded-lg border p-4 hover:bg-muted">
            <FileText className="h-5 w-5" aria-hidden="true" /> Refund Policy
          </Link>
        </nav>
      </div>
    </main>
  );
}
