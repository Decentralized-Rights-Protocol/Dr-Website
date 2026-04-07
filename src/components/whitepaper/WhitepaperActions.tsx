'use client'

import * as React from 'react'
import { Download, Eye, ExternalLink } from 'lucide-react'
import { trackDRPEvent } from '@/lib/analytics'

export function WhitepaperActions(): JSX.Element {
  const onDownload = React.useCallback(() => {
    trackDRPEvent('whitepaper_download', { source: 'hero' })
  }, [])
  const onRead = React.useCallback(() => {
    trackDRPEvent('whitepaper_download', { source: 'preview' })
  }, [])
  return (
    <>
      <a
        href="/whitepaper_v0.5.pdf"
        download="DRP_Whitepaper_v0.5.pdf"
        onClick={onDownload}
        className="inline-flex items-center rounded-xl border border-border bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
      >
        <Download className="mr-2 h-4 w-4" />
        Download PDF
      </a>
      <a
        href="/whitepaper_v0.5.pdf"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onRead}
        className="inline-flex items-center rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold text-card-foreground transition hover:bg-accent hover:text-accent-foreground"
      >
        <Eye className="mr-2 h-4 w-4" />
        Read Online
        <ExternalLink className="ml-2 h-4 w-4" />
      </a>
    </>
  )
}

