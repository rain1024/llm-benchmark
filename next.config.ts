import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/llm-benchmark',
  assetPrefix: '/llm-benchmark/',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
