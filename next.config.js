/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  i18n: {
    locales: ['en', 'fr', 'es', 'ar', 'de', 'it', 'ja', 'ko', 'pt', 'ru', 'sw', 'zh', 'hi'],
    defaultLocale: 'en',
  },
  productionBrowserSourceMaps: false,
  compress: true,
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://translate.google.com https://translate.googleapis.com https://vercel.live https://tally.so",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https:",
      "font-src 'self' https://fonts.gstatic.com data:",
      "connect-src 'self' https://*.vercel.app https://vercel.com https://www.google-analytics.com https://vitals.vercel-insights.com https://translate.google.com https://translate.googleapis.com",
      "frame-src 'self' https://translate.google.com https://vercel.live https://tally.so",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests"
    ].join('; ')

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
        ],
      },
    ];
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  async redirects() {
    return [
      { source: '/privacy-policy', destination: '/legal/privacy-policy', permanent: true },
      { source: '/terms-of-service', destination: '/legal/terms-of-service', permanent: true },
      { source: '/eldercore-terms', destination: '/legal/eldercore-terms', permanent: true },
      { source: '/eldercore-privacy', destination: '/legal/eldercore-privacy', permanent: true },
      {
        source: '/explorer',
        destination: 'https://explorer.decentralizedrights.com',
        permanent: false,
      },
      {
        source: '/explorer/:path*',
        destination: 'https://explorer.decentralizedrights.com/:path*',
        permanent: false,
      },
      {
        source: '/api/:path*',
        destination: 'https://api.decentralizedrights.com/:path*',
        permanent: false,
      },
      {
        source: '/app/:path*',
        destination: 'https://app.decentralizedrights.com/:path*',
        permanent: false,
      },
    ]
  },
};

module.exports = nextConfig;
