import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_ORIGINS = [
  'https://my-project-pink-six-75.vercel.app',
  // Add your custom domain here, e.g.:
  // 'https://codex.ma',
];

// Add localhost for development
if (process.env.NODE_ENV === 'development') {
  ALLOWED_ORIGINS.push('http://localhost:3000');
}

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const origin = req.headers.get('origin') || '';
  const url = req.nextUrl;

  // ===== 1. Security Headers =====
  // Prevent clickjacking
  res.headers.set('X-Frame-Options', 'DENY');

  // XSS Protection
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-XSS-Protection', '1; mode=block');

  // Referrer Policy — only send origin, not full URL
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions Policy — restrict browser features
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // HSTS — force HTTPS (1 year, include subdomains)
  res.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "frame-src https://formspree.io",
    "connect-src 'self' https://formspree.io",
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://formspree.io",
  ].join('; ');
  res.headers.set('Content-Security-Policy', csp);

  // ===== 2. CORS Configuration =====
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.headers.set('Access-Control-Allow-Origin', origin);
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-CSRF-Token'
    );
  }

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: res.headers,
    });
  }

  // ===== 3. Block common attack paths =====
  // Block access to sensitive files
  const blockedPaths = [
    '/.env',
    '/.env.local',
    '/.env.production',
    '/.git',
    '/.gitignore',
    '/.next/',
    '/node_modules/',
    '/package.json',
    '/package-lock.json',
    '/tsconfig.json',
    '/next.config.ts',
  ];

  if (blockedPaths.some((path) => url.pathname.startsWith(path))) {
    return new NextResponse(null, { status: 404 });
  }

  return res;
}

// Run middleware on all routes except _next/static and _next/image (static files)
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons/|images/).*)',
  ],
};
