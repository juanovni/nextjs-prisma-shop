import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  },
  compiler: {
    styledComponents: true
  },
  webpack: (config) => {
    // Evita que Next intente empaquetar carpetas innecesarias
    config.externals.push({ prisma: 'commonjs prisma' });
    return config;
  },
};

export default nextConfig;
