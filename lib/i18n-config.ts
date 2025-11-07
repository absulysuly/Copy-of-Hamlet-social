export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'ar', 'ku'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

const RTL_LOCALES: Locale[] = ['ar'];

export function getLocaleDirection(locale: Locale): 'ltr' | 'rtl' {
  return RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';
}
