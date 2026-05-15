/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  staticPageGenerationTimeout: 300, // Increase to 300 seconds
  images: {
    unoptimized: true,
  },
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
