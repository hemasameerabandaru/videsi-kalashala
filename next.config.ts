import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 🟢 1. REDIRECTS (Fixes 404s by sending old links to new pages)
  async redirects() {
    return [
      {
        source: '/sign-up',
        destination: '/signup',
        permanent: true,
      },
      {
        source: '/sign-in',
        destination: '/login',
        permanent: true,
      },
      // Catch-all for any sub-routes of sign-up
      {
        source: '/sign-up/(.*)', 
        destination: '/signup',
        permanent: true,
      },
    ];
  },

  // 🟢 2. IMAGES (Allows external images from Unsplash & Google)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // For Google Profile Pictures
      },
    ],
  },
};

export default nextConfig;