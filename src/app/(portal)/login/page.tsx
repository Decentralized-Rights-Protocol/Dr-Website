import Link from "next/link";
import { ChevronLeft, Lock, Mail, User } from "lucide-react";

export const metadata = {
  title: "Sign In | DRP App Portal",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/40 transition-colors hover:text-[#00e5cc]"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to portal
      </Link>

      <section className="glass-card w-full max-w-lg space-y-6 p-8">
        <div className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center border border-[#00e5cc]/30 bg-[#00e5cc]/10 text-[#00e5cc]">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-black text-foreground">
            Sign in to DRP
          </h1>
          <p className="text-sm text-foreground/40">
            Use a verified wallet or request a governance credential.
          </p>
        </div>

        <div className="space-y-4">
          <button className="drp-button w-full">Connect Wallet</button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-dashed border-foreground/15" />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest text-foreground/30">
              <span className="bg-background px-2">or with access key</span>
            </div>
          </div>

          <form className="space-y-3">
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-foreground/40">
                Email
              </span>
              <div className="mt-1.5 flex items-center border border-foreground/10 bg-foreground/[0.02] px-3 py-2.5">
                <Mail className="h-4 w-4 text-foreground/30" />
                <input
                  type="email"
                  placeholder="governance@civicdao.org"
                  className="ml-2 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/25"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-xs font-bold uppercase tracking-widest text-foreground/40">
                Access token
              </span>
              <div className="mt-1.5 flex items-center border border-foreground/10 bg-foreground/[0.02] px-3 py-2.5">
                <User className="h-4 w-4 text-foreground/30" />
                <input
                  type="password"
                  placeholder="••••••••••••••"
                  className="ml-2 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/25"
                />
              </div>
            </label>

            <button
              type="submit"
              className="mt-3 w-full border border-foreground/15 px-4 py-3 text-xs font-bold uppercase tracking-widest text-foreground/70 transition-colors hover:border-[#00e5cc]/40 hover:text-[#00e5cc]"
            >
              Request one-time code
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-foreground/30">
          Need organization access?{" "}
          <a
            href="mailto:support@decentralizedrights.com"
            className="font-bold text-[#00e5cc]"
          >
            Contact the DRP onboarding team
          </a>
        </p>
      </section>
    </div>
  );
}
