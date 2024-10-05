/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  typescript: {
    // ignoreDuringBuilds: true, // تجاهل التحذيرات أثناء البناء
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
