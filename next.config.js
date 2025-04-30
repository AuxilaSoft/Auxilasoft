/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Enable static export
  basePath: '/Auxilasoft', // Must match your repository name
  assetPrefix: '/Auxilasoft',
  images: {
    unoptimized: false, // Disable image optimization for static export
  },
};

module.exports = nextConfig;
