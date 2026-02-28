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
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
      {
        source: '/:path*{/}',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://challenges.cloudflare.com https://cdn.clerk.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' blob: data: https://img.clerk.com https://images.clerk.com",
              "font-src 'self' data:",
              "connect-src 'self' https://api.clerk.com https://*.supabase.co https://*.smarterbot.cl",
              "frame-src 'self' https://challenges.cloudflare.com https://*.metabase.com",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
