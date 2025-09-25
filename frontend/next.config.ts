import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["res.cloudinary.com", "example.com", "img.icons8.com"],
  },
  output: "standalone",
};

export default nextConfig;
