import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      new URL("https://img.clerk.com/**"),
      new URL("https://ik.imagekit.io/storIt/**"),
    ],
  },
};

export default nextConfig;
