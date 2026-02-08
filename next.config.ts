import type { NextConfig } from "next";

import { dirname } from "path";
import { fileURLToPath } from "url";

const currentDir = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: currentDir,
  },
};

export default nextConfig;
