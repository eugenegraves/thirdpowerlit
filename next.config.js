/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [], // Add domains if needed for external images
    remotePatterns: [],
    unoptimized: process.env.NODE_ENV === 'development', // For easier local development
  },
  webpack(config) {
    // Configure webpack to handle image imports properly
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            publicPath: '/_next/static/images/',
            outputPath: 'static/images',
          },
        },
      ],
    });

    return config;
  },
  async redirects() {
    return [
      // Add any needed redirects here
    ];
  },
}

module.exports = nextConfig 