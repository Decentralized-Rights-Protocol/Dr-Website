/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Next.js automatically supports src/app directory
  // No experimental.appDir needed in Next.js 14+
  async rewrites() {
    return [
      {
        source: '/explorer/:path*',
        destination: 'https://explorer.decentralizedrights.com/:path*',
      },
      {
        source: '/api-external/:path*',
        destination: 'https://api.decentralizedrights.com/:path*',
      },
      {
        source: '/app-external/:path*',
        destination: 'https://app.decentralizedrights.com/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
