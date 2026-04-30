/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  // Enable Turbopack compatibility with empty config if no specific turbopack options needed
  turbopack: {},
  // Explicitly set paths to use src directory
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  // Updated rewrites to reflect consolidated architecture
  async rewrites() {
    return [
      // Many of these are now local routes in src/app/
      // If we still want to proxy some paths to external services, keep them here
      // But for the consolidated repo, we prefer local routing
      {
        source: '/api-docs/:path*',
        destination: 'https://api.decentralizedrights.com/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
