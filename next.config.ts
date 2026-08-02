import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // /about moved to /company/about in Phase 3E (Company hub restructure) —
  // redirect rather than leave the old URL as a dead link.
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/company/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
