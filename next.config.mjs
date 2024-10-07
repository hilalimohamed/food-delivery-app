/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript build errors
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint build errors
  },
  experimental: {
    appDir: true, // Keep this if you want to use the App Router
    output: "standalone",
  },
};

export default nextConfig;
