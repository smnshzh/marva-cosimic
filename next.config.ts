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
  // Disable tracing to avoid permission issues
  outputFileTracingExcludes: {
    '*': ['./node_modules/@swc/core-linux-x64-gnu', './node_modules/@swc/core-linux-x64-musl'],
  },
};

export default nextConfig;
