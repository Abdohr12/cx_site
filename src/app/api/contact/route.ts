import { NextRequest, NextResponse } from 'next/server';

const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT || '';

// ===== 1. Rate Limiting (In-memory) =====
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // max 3 requests per window per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }
  return false;
}

// ===== 2. Input Validation =====
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function isValidName(name: string): boolean {
  // Arabic + Latin letters, spaces, hyphens, apostrophes. Min 2, max 100 chars.
  const nameRegex = /^[\u0600-\u06FFa-zA-ZÀ-ÿ\s\-']{2,100}$/;
  return nameRegex.test(name.trim());
}

function isValidPhone(phone: string): boolean {
  // Digits, spaces, +, -, (, ). Min 7, max 20 chars.
  const phoneRegex = /^[\d\s\+\-\(\)]{7,20}$/;
  return phoneRegex.test(phone);
}

function sanitizeInput(input: string): string {
  // Remove potential XSS vectors and trim
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}

function isValidMessage(message: string): boolean {
  // Min 10, max 5000 chars. Allow Arabic, Latin, numbers, basic punctuation.
  const msgRegex = /^[\u0600-\u06FFa-zA-ZÀ-ÿ0-9\s.,!?;:'"\-@#()/\n\r]{10,5000}$/;
  return msgRegex.test(message.trim());
}

function isValidCompany(company: string): boolean {
  // Arabic + Latin letters, numbers, spaces, hyphens. Min 2, max 100 chars.
  const companyRegex = /^[\u0600-\u06FFa-zA-ZÀ-ÿ0-9\s\-&.]{2,100}$/;
  return companyRegex.test(company.trim());
}

// ===== 3. CSRF Protection =====
function generateToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
}

// Store CSRF tokens (in production, use Redis or database)
const csrfTokens = new Map<string, { expiresAt: number; used: boolean }>();
const CSRF_TOKEN_EXPIRY = 60 * 60 * 1000; // 1 hour

// Generate CSRF token endpoint
export async function GET() {
  const token = generateToken();
  csrfTokens.set(token, { expiresAt: Date.now() + CSRF_TOKEN_EXPIRY, used: false });

  return NextResponse.json(
    { csrfToken: token },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    }
  );
}

function validateCsrfToken(token: string | null): boolean {
  if (!token) return false;

  const entry = csrfTokens.get(token);
  if (!entry) return false;

  if (Date.now() > entry.expiresAt) {
    csrfTokens.delete(token);
    return false;
  }

  if (entry.used) {
    csrfTokens.delete(token);
    return false;
  }

  entry.used = true;
  return true;
}

// ===== 4. Main POST Handler =====
export async function POST(req: NextRequest) {
  try {
    // Rate limiting check
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
          },
        }
      );
    }

    // Parse body
    let body: { name?: string; email?: string; phone?: string; company?: string; message?: string; csrfToken?: string };

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid request body.' },
        { status: 400 }
      );
    }

    const { name, email, phone, company, message, csrfToken } = body;

    // CSRF validation
    if (!validateCsrfToken(csrfToken || null)) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired security token. Please refresh and try again.' },
        { status: 403 }
      );
    }

    // Input validation
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Name is required.' },
        { status: 400 }
      );
    }

    if (!isValidName(name)) {
      return NextResponse.json(
        { success: false, message: 'Name contains invalid characters.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Email is required.' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Message is required.' },
        { status: 400 }
      );
    }

    if (!isValidMessage(message)) {
      return NextResponse.json(
        { success: false, message: 'Message must be between 10 and 5000 characters.' },
        { status: 400 }
      );
    }

    if (phone && typeof phone === 'string' && !isValidPhone(phone)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid phone number.' },
        { status: 400 }
      );
    }

    if (company && typeof company === 'string' && !isValidCompany(company)) {
      return NextResponse.json(
        { success: false, message: 'Company name contains invalid characters.' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPhone = phone ? sanitizeInput(phone) : '';
    const sanitizedCompany = company ? sanitizeInput(company) : '';
    const sanitizedMessage = sanitizeInput(message);

    // Forward to Formspree
    const formData = new URLSearchParams();
    formData.append('name', sanitizedName);
    formData.append('email', sanitizedEmail);
    formData.append('_replyto', sanitizedEmail);
    if (sanitizedPhone) formData.append('phone', sanitizedPhone);
    if (sanitizedCompany) formData.append('company', sanitizedCompany);
    formData.append('message', sanitizedMessage);
    formData.append('_subject', `[Codex Contact] Nouveau message de ${sanitizedName}`);

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: formData.toString(),
    });

    const data = await response.json();

    if (response.ok && data.ok) {
      return NextResponse.json({ success: true, message: 'Email sent successfully' });
    } else {
      console.error('Formspree error:', data);
      return NextResponse.json(
        { success: false, message: 'Failed to send message. Please try again.' },
        { status: response.status }
      );
    }
  } catch (error: unknown) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected server error occurred.' },
      { status: 500 }
    );
  }
}
