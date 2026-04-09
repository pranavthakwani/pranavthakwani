/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next-build',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
