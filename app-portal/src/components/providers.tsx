'use client'

import { type ReactNode, useState } from 'react'
import { ConvexReactClient } from 'convex/react'
import { ConvexProvider } from 'convex/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from '@/components/theme-provider'
import { env } from '@/lib/env'

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  const convexUrl = env.NEXT_PUBLIC_CONVEX_URL
  const [convex] = useState(() => (convexUrl ? new ConvexReactClient(convexUrl) : null))
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        refetchOnWindowFocus: false,
        retry: 1
      },
      mutations: {
        retry: 1
      }
    }
  }))

  return (
    <ThemeProvider>
      {!convex ? (
        <div className="flex min-h-screen items-center justify-center bg-white px-6 text-center text-sm text-neutral-600 dark:bg-neutral-950 dark:text-neutral-300">
          Set `NEXT_PUBLIC_CONVEX_URL` in Vercel or `.env.local` before loading the DRP app portal.
        </div>
      ) : (
      <ConvexProvider client={convex}>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ConvexProvider>
      )}
    </ThemeProvider>
  )
}
