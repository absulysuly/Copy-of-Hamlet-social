import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './lib/i18n-config';

const { locales, defaultLocale } = i18n;

// Map of common language prefixes to our supported locales
const langMap: { [key: string]: string } = {
  'en': 'en',
  'ar': 'ar',
  'ku': 'ku',
};

function getLocale(request: NextRequest): string {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const firstLang = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();
  
  return langMap[firstLang] || defaultLocale;
}


export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathnameHasLocale) return;
  
  const locale = getLocale(request);
  
  // Prepend the locale to the path.
  // Handle the root path ('/') separately to avoid a trailing slash.
  request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
  ],
};