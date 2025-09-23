/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: ["html-loader", "markdown-loader"],
    });
    return config;
  },
};

module.exports = nextConfig;
