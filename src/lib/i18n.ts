import i18next, { InitOptions } from 'i18next';
import ar from '@/dictionaries/ar.json';
import en from '@/dictionaries/en.json';
import ku from '@/dictionaries/ku.json';
import { i18n } from '@/lib/i18n-config';

const defaultOptions: InitOptions = {
  fallbackLng: i18n.defaultLocale,
  supportedLngs: i18n.locales,
  defaultNS: 'translation',
  interpolation: { escapeValue: false },
  resources: {
    en: { translation: en },
    ar: { translation: ar },
    ku: { translation: ku },
  },
};

export async function initI18next(options: InitOptions = {}) {
  if (!i18next.isInitialized) {
    await i18next.init({ ...defaultOptions, ...options });
  }

  return i18next;
}

export type TranslationKeys = keyof typeof en;
