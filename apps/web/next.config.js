/** @type {import('next').NextConfig} */
module.exports = {
  distDir: 'dist',
  output: "export",
  trailingSlash: true,
  assetPrefix: "/",
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: '**',
    }],
    unoptimized: true
  },
};
