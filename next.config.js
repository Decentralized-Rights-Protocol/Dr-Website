/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/404',
        destination: '/404',
      },
    ]
  },
}

module.exports = nextConfig
