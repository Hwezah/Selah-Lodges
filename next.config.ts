import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The privacy policy and terms now live on one page; keep the old links working.
  async redirects() {
    return [
      { source: "/terms", destination: "/policies", permanent: true },
      { source: "/privacy", destination: "/policies#privacy", permanent: true },
    ];
  },
  // Security headers carried over from the prototype's vercel.json.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
