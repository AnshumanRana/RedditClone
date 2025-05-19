import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "RedClone.com",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "images.redClone.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dhb1n8clj/image/upload/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home/feed",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
