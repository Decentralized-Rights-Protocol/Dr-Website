/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/explorer/:path*',
        destination: 'https://explorer.decentralizedrights.com/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'https://api.decentralizedrights.com/:path*',
      },
      {
        source: '/app/:path*',
        destination: 'https://app.decentralizedrights.com/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
