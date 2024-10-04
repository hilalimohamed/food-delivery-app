/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  eslint: {
    ignoreDuringBuilds: true, // تجاهل التحذيرات أثناء البناء
  },
};

export default nextConfig;
