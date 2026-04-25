'use client'

import { Bell, ExternalLink } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

interface NotificationsPanelProps {
  walletAddress: string | null
}

export function NotificationsPanel({ walletAddress }: NotificationsPanelProps) {
  const notifications = useQuery(api.notifications.listNotifications, { walletAddress })

  return (
    <section className="rounded-3xl border border-neutral-200/80 bg-white/80 p-6 shadow-sm dark:border-neutral-800/80 dark:bg-neutral-900/60">
      <header className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600 dark:bg-primary-500/15 dark:text-primary-200">
          <Bell className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Notifications</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Reviews, governance, and learning updates.</p>
        </div>
      </header>

      {!notifications ? (
        <div className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">Loading notifications…</div>
      ) : notifications.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-neutral-300/80 p-4 text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
          Connect a wallet and submit activity to start receiving notifications.
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {notifications.slice(0, 5).map((notification: any) => (
            <li key={notification._id} className="rounded-2xl border border-neutral-200/70 bg-neutral-50/70 p-4 dark:border-neutral-800/70 dark:bg-neutral-950/30">
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{notification.title}</p>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{notification.message}</p>
              <div className="mt-2 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                <span>{new Date(notification.createdAt).toLocaleString()}</span>
                {notification.href ? (
                  <a href={notification.href} className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-300">
                    Open
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
