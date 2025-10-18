import type { Metadata } from 'next';
import { Locale, i18n } from '@/lib/i18n-config';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getDictionary } from '@/lib/dictionaries';
import '../globals.css';
import React from 'react';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  return {
    title: {
      default: dictionary.metadata.title,
      template: `%s | ${dictionary.metadata.title}`,
    },
    description: dictionary.metadata.description,
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  const rtlLocales = new Set<Locale>(['ar', 'ku']);
  const documentDirection = rtlLocales.has(lang) ? 'rtl' : 'ltr';
  return (
    <html lang={lang} dir={documentDirection} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-gray-50 font-sans text-gray-800 dark:bg-gray-900 dark:text-gray-200">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar dictionary={dictionary.nav} lang={lang} />
          <main className="flex-grow">{children}</main>
          <Footer dictionary={dictionary.footer} />
        </ThemeProvider>
      </body>
    </html>
  );
}
