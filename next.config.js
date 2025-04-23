/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export
  basePath: '/', // Must match your repository name
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
};

module.exports = nextConfig;
