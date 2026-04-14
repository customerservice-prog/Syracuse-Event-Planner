import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'uploadthing.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: { serverActions: { allowedOrigins: ['localhost:3000'] } },
};
export default nextConfig;
