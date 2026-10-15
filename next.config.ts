import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["typeorm", "pg", "bcrypt"],
  reactCompiler: true,
};

export default nextConfig;
