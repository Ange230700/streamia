// next.config.ts

import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "next/dist/esm/server/lib/lru-cache": "next/dist/server/lib/lru-cache",
      "next/dist/esm/server/lib/patch-fetch":
        "next/dist/server/lib/patch-fetch",
    },
  },
};

export default nextConfig;
