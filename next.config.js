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
}

module.exports = nextConfig 