import type { NextConfig } from "next";
import { serviceRoutes } from "./src/modules/travel/service-routes";

const isDevelopment = process.env.NODE_ENV === "development";
const contentSecurityPolicy = [
  "default-src 'self'",
  "img-src 'self' data: https:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ""}`,
  "font-src 'self' data:",
  "connect-src 'self' https:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
].join("; ");

const config: NextConfig = {
  ...(process.env.VERCEL ? {} : { output: "standalone" as const }),
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      ...Object.entries(serviceRoutes).map(([type, destination]) => ({
        source: "/dich-vu",
        has: [{ type: "query" as const, key: "type", value: type }],
        destination,
        permanent: true,
      })),
      { source: "/dich-vu", destination: "/", permanent: true },
      // A distinct URL avoids sending browsers back to the previous cached 308.
      {
        source: "/e-visa",
        destination: "/fast-track?via=legacy",
        permanent: false,
      },
      {
        source: "/admin/e-visa",
        destination: "/admin/fast-track",
        permanent: false,
      },
      {
        source: "/admin/noi-dung/e-visa",
        destination: "/admin/noi-dung/fast-track",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "private, no-store" }],
      },
      {
        source: "/admin/:path*",
        headers: [{ key: "Cache-Control", value: "private, no-store" }],
      },
    ];
  },
};
export default config;
