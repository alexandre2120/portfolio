import path from "node:path"

import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Self-contained server for the Docker image that Coolify runs.
  output: "standalone",
  // The repo sits inside a bigger folder with its own lockfile; trace from here.
  outputFileTracingRoot: path.join(__dirname),
}

export default nextConfig
