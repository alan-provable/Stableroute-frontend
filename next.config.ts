import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            // Prevent MIME sniffing so browsers honor declared content types.
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // Keep full referrers on-site while trimming cross-origin leakage.
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            // Block clickjacking by preventing the dashboard from being framed.
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            // Disable device APIs the dashboard does not use.
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
