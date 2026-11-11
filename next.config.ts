import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // The server action reads data/hasil.csv at runtime; make sure it ships with the deployment.
  outputFileTracingIncludes: {
    "/*": ["./data/hasil.csv"],
  },
};

export default nextConfig;
