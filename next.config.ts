import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,

  // ===== Security: Protect sensitive headers from exposure =====
  poweredByHeader: false,

  // ===== Security: Block common attack paths =====
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Prevent MIME type sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // XSS protection for older browsers
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          // Prevent clickjacking
          { key: 'X-Frame-Options', value: 'DENY' },
          // Referrer policy
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Permissions policy
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // HSTS — force HTTPS
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          // Remove X-Powered-By
          { key: 'X-Powered-By', value: '' },
        ],
      },
    ];
  },
};

export default nextConfig;
