import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["typeorm", "pg", "bcrypt"],
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/fidelis-court",
        destination: "/fideliscourts",
        permanent: true,
      },
      {
        source: "/fideliscourt",
        destination: "/fideliscourts",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
