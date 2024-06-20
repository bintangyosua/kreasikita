import withMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.inflact.com", "kreasikita.rplinformatika.my.id"],
  },
  pageExtensions: ["js", "jsx", "mdx", "md", "ts", "tsx"],
  experimental: {
    serverActions: {
      allowedOrigins: [],
    },
  },
};

export default withMDX()(nextConfig);
