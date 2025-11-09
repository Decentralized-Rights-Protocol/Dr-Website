/** @type {import('next').NextConfig} */
const path = require('path');
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  i18n,
  images: {
    unoptimized: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  async rewrites() {
    return [
      {
        source: '/:locale/explorer/:path*',
        destination: 'https://explorer.decentralizedrights.com/:path*',
      },
      {
        source: '/:locale/api-docs/:path*',
        destination: 'https://api.decentralizedrights.com/:path*',
      },
      {
        source: '/:locale/dashboard/:path*',
        destination: 'https://app.decentralizedrights.com/:path*',
      },
      {
        source: '/explorer/:path*',
        destination: 'https://explorer.decentralizedrights.com/:path*',
      },
      {
        source: '/api-docs/:path*',
        destination: 'https://api.decentralizedrights.com/:path*',
      },
      {
        source: '/dashboard/:path*',
        destination: 'https://app.decentralizedrights.com/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
