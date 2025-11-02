import { Inter, Noto_Sans_Arabic } from 'next/font/google';
import { dir } from 'i18next';
import TopNavBar from '@/components/layout/TopNavBar';
import MobileNav from '@/components/layout/MobileNav';
import ChatWidget from '@/components/social/ChatWidget';
import { ThemeProvider } from '@/components/ThemeProvider';
import '../globals.css';
import React from 'react';
import dynamic from 'next/dynamic';
// Fix: Imported the Locale type for strong typing of the lang parameter.
import { Locale } from '@/lib/i18n-config';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoArabic = Noto_Sans_Arabic({ subsets: ['arabic'], variable: '--font-arabic' });

// Dynamically import ChatWidget to ensure it's client-side only
const DynamicChatWidget = dynamic(() => import('@/components/social/ChatWidget'), {
  ssr: false,
});

export default function RootLayout({
  children,
  params: { lang }
}: {
  children: React.ReactNode;
  // Fix: Changed type of lang from 'string' to 'Locale' to match component props.
  params: { lang: Locale };
}) {
  const isRTL = lang === 'ar' || lang === 'ku';
  
  return (
    <html lang={lang} dir={isRTL ? 'rtl' : 'ltr'} className={`${inter.variable} ${notoArabic.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={['light', 'dark', 'ramadan']}
        >
          <Toaster position="bottom-center" />
          <TopNavBar lang={lang} />
          <main className="pt-16 md:pt-0 pb-16 md:pb-0">{children}</main>
          <MobileNav lang={lang} />
          <DynamicChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}