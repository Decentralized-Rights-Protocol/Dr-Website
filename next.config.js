/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Explicitly set paths to use src directory
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  // Exclude other project directories from root build
  // These are separate Next.js projects with their own builds
  webpack: (config, { isServer }) => {
    // Exclude app-portal, explorer, api from root build
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules/**',
        '**/.next/**',
        '**/app-portal/**',
        '**/explorer/**',
        '**/api/**',
      ],
    };
    return config;
  },
  // Skip app/ folder, use src/app/ only
  // This is automatic in Next.js 14 but we'll be explicit
  async rewrites() {
    return [
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
