import withBundleAnalyzer from "@next/bundle-analyzer";
export const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

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

// export default withBundleAnalyzer(nextConfig);
export default nextConfig;
