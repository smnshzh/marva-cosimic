import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['@cloudflare/workers-types'],
  // Fix workspace root issue
  outputFileTracingRoot: process.cwd(),
  // Ensure static export works properly
  distDir: 'out',
};

export default nextConfig;
