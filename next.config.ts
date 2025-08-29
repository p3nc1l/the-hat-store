import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://etmdjmdawnjncqaxmwou.supabase.co/**')],
  },
};

export default nextConfig;
