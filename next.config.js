/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
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
    return [
      {
        source: '/:path*',
        headers: [
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
    ]
  },
};

module.exports = nextConfig;
