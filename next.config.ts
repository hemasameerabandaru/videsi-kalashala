/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // 👈 Add this line
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com', // If you used the icon URLs I gave earlier
      },
    ],
  },
};

export default nextConfig;