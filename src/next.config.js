/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [], // Add domains if needed for external images
    unoptimized: process.env.NODE_ENV !== 'production', // For easier local development
  },
  // Support for imported images from src/assets
  webpack(config) {
    return config;
  },
}

module.exports = nextConfig 