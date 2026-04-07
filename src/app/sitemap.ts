import type { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/seo/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl()

  const now = new Date()
  const lastmod = now.toISOString()

  const urls: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: lastmod, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/why-drp`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/whitepaper`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/learn`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/docs`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/faq`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/glossary`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/community`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/philosophy`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/tokens`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/economics`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.7 },
    {
      url: `${baseUrl}/economics/governance`,
      lastModified: lastmod,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    { url: `${baseUrl}/api`, lastModified: lastmod, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/status`, lastModified: lastmod, changeFrequency: 'monthly', priority: 0.3 },

    // Definition-first, high-intent pages (created in this task)
    { url: `${baseUrl}/what-is-drp`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/how-drp-works`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/proof-of-status`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/proof-of-activity`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/ai-governance`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/human-rights-blockchain`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/drp-vs-ethereum`, lastModified: lastmod, changeFrequency: 'weekly', priority: 0.7 },
  ]

  return urls
}

