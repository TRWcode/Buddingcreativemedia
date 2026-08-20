import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Alleen de kwaliteitsniveaus die we daadwerkelijk gebruiken.
    qualities: [75, 82],
  },
};

export default nextConfig;
