import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Evita que Next intente empaquetar carpetas innecesarias
    config.externals.push({ prisma: 'commonjs prisma' });
    return config;
  },
};

export default nextConfig;
