/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",         // Enables static HTML export
  images: {
    unoptimized: true,      // Allows Next/Image to work in static export
  },
};

export default nextConfig;
