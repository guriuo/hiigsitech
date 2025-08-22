/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        // For Sanity images
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        // ✅ ADD THIS FOR YOUTUBE THUMBNAILS
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
};

module.exports = nextConfig;