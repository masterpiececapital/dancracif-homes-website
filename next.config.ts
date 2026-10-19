import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["typeorm", "pg", "bcrypt"],
  reactCompiler: true,
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
