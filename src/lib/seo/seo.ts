import type { Metadata } from 'next'

const DEFAULT_SITE_URL = 'https://decentralizedrights.com'
const DEFAULT_OG_IMAGE_URL = 'https://decentralizedrights.com/08_IFOPE_20x30.jpg'

function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL
}

function toAbsoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) return pathOrUrl
  const baseUrl = getSiteUrl().replace(/\/+$/, '')
  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${baseUrl}${path}`
}

export type PageSeoInput = {
  /**
   * SEO title. Prefer a concise, query-aligned phrase.
   */
  title: string
  /**
   * Meta description shown in search results.
   */
  description: string
  /**
   * Path for the page (e.g. `/what-is-drp`) or an absolute URL.
   */
  canonical: string
  /**
   * Optional OG/Twitter image URL override.
   */
  ogImageUrl?: string
}

/**
 * Centralized page-level metadata builder.
 * This avoids drift between canonical URL, Open Graph, and Twitter preview tags.
 */
export function buildPageMetadata({ title, description, canonical, ogImageUrl }: PageSeoInput): Metadata {
  const canonicalUrl = toAbsoluteUrl(canonical)
  const imageUrl = ogImageUrl ? toAbsoluteUrl(ogImageUrl) : DEFAULT_OG_IMAGE_URL

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 800,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export function getBaseUrl(): string {
  return getSiteUrl().replace(/\/+$/, '')
}

export const DEFAULT_OG_IMAGE_PATH = '/08_IFOPE_20x30.jpg'

