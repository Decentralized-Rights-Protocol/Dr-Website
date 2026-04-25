import Link from 'next/link'
import { ChevronLeft, Lock, Mail, User } from 'lucide-react'

export const metadata = {
  title: 'Sign In | DRP App Portal'
}

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to portal
      </Link>

      <section className="w-full max-w-lg space-y-6 rounded-3xl border border-neutral-200/80 bg-white/90 p-8 shadow-sm backdrop-blur dark:border-neutral-800/80 dark:bg-neutral-900/60">
        <div className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-600 dark:bg-primary-500/20 dark:text-primary-200">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">Sign in to DRP</h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">Use a verified wallet or request a governance credential.</p>
        </div>

        <div className="space-y-4">
          <button className="w-full rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5">
            Connect Wallet
          </button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-dashed border-neutral-300 dark:border-neutral-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase text-neutral-400">
              <span className="bg-white px-2 dark:bg-neutral-900">or with access key</span>
            </div>
          </div>

          <form className="space-y-3">
            <label className="block">
              <span className="text-xs font-medium uppercase text-neutral-500 dark:text-neutral-400">Email</span>
              <div className="mt-1 flex items-center rounded-xl border border-neutral-200 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-950">
                <Mail className="h-4 w-4 text-neutral-400" />
                <input
                  type="email"
                  placeholder="governance@civicdao.org"
                  className="ml-2 flex-1 bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-neutral-100 dark:placeholder:text-neutral-500"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-xs font-medium uppercase text-neutral-500 dark:text-neutral-400">Access token</span>
              <div className="mt-1 flex items-center rounded-xl border border-neutral-200 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-950">
                <User className="h-4 w-4 text-neutral-400" />
                <input
                  type="password"
                  placeholder="••••••••••••••"
                  className="ml-2 flex-1 bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-neutral-100 dark:placeholder:text-neutral-500"
                />
              </div>
            </label>

            <button
              type="submit"
              className="mt-3 w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              Request one-time code
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-neutral-500 dark:text-neutral-400">
          Need organization access?{' '}
          <a href="mailto:support@decentralizedrights.com" className="font-medium text-primary-600 dark:text-primary-300">
            Contact the DRP onboarding team
          </a>
        </p>
      </section>
    </div>
  )
}

