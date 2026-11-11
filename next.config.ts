import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // The server action reads data/lolos.csv at runtime; make sure it ships with the deployment.
  outputFileTracingIncludes: {
    "/*": ["./data/lolos.csv"],
  },
};

export default nextConfig;
