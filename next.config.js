/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [], // Add domains if needed for external images
    remotePatterns: [],
    unoptimized: false, // Ensure images are optimized in production
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
      {
        source: "/home",
        destination: "/",
        permanent: true
      },
      {
        source: "/portfolio.html",
        destination: "/portfolio",
        permanent: true
      },
      {
        source: "/services.html",
        destination: "/services",
        permanent: true
      },
      {
        source: "/about.html",
        destination: "/about",
        permanent: true
      },
      {
        source: "/contact.html",
        destination: "/contact",
        permanent: true
      }
    ];
  },
  output: 'standalone', // Optimize for Vercel deployment
}

module.exports = nextConfig 