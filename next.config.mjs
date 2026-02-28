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
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    serverComponentsHmrCache: false,
    optimizePackageImports: [
      '@clerk/nextjs',
      '@clerk/localizations',
      '@supabase/supabase-js',
      '@supabase/ssr',
      'lucide-react',
      'react-icons',
      'recharts',
    ],
  },
}

export default nextConfig
