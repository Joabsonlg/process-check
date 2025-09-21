import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  basePath: '/process-check',
  assetPrefix: '/process-check',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
