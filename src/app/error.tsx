'use client'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">Something went wrong</h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">An unexpected error occurred. Please try again later.</p>
        <button
          className="mt-6 rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-500"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </main>
  )
}
