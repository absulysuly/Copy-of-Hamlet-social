// middleware.ts - SAFE MODE (Zero Node Dependencies)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  try {
    const response = NextResponse.next();

    // ✅ Optional security headers
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');

    return response;
  } catch (err) {
    // ✅ Edge-safe fallback
    console.error('Middleware error:', err);
    return NextResponse.next();
  }
}

// ✅ Minimal matcher (ignore static + API routes)
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
