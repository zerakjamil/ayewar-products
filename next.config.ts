import type { NextConfig } from "next";

import { dirname } from "path";
import { fileURLToPath } from "url";

const currentDir = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/products/students", destination: "/products/passengers", permanent: true }];
  },
  turbopack: {
    root: currentDir,
  },
};

export default nextConfig;
