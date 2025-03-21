/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com', 
      'upload.wikimedia.org', 
      'randomuser.me', 
      'placehold.co',
      'kavkopyjktifvtxqgcft.supabase.co'
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Generate sitemap during build on the server
      require('./scripts/generate-sitemap')
    }
    return config
  },
}

module.exports = nextConfig 