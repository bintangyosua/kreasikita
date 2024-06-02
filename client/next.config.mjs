/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.inflact.com"],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [],
    },
  },
};

export default nextConfig;
