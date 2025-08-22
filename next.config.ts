/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // For Sanity images
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', // ✅ ADDED: For fallback images
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc', // For author placeholders
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
};

module.exports = nextConfig;