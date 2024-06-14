/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.inflact.com", "kreasikita.rplinformatika.my.id"],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [],
    },
  },
};

export default nextConfig;
