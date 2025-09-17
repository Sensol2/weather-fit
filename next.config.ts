import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true, // ✅ styled-components 최적화
  },
};

export default nextConfig;
