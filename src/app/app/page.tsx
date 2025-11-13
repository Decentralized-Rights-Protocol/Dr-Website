'use client'

import { useEffect } from 'react'

const APP_URL = 'https://app.decentralizedrights.com'

export default function AppRedirect() {
  useEffect(() => {
    window.location.replace(APP_URL)
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">Redirecting to the DRP App…</h1>
      <p className="mt-3 max-w-md text-base text-neutral-600 dark:text-neutral-300">
        You will be redirected automatically. If the redirect does not happen, tap the button below to continue.
      </p>
      <a
        href={APP_URL}
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
      >
        Continue to App
      </a>
    </div>
  )
}
