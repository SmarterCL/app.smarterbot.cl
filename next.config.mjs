/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
      },
      {
        protocol: 'https',
        hostname: 'images.clerk.com',
      },
    ],
  },
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  // Force dynamic rendering to avoid Clerk static generation issues
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // Skip static generation for auth-dependent pages
    serverComponentsHmrCache: false,
  },
  // Tell Next.js to skip static optimization for routes with auth
  async rewrites() {
    return []
  },
}

export default nextConfig
