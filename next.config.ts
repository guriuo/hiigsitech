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
        protocol: 'https',
        hostname: 'cdn.sanity.io', // For Sanity images
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com', // For YouTube thumbnails
      },
    ],
  },
  eslint: {
    // This will skip ESLint errors during the build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This will skip TypeScript errors during the build
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;