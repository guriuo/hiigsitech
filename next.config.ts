/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'i.ytimg.com' }, // YouTube thumbnails
    ],
  },
  eslint: {
    // Skip ESLint errors during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip TypeScript errors during builds
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
