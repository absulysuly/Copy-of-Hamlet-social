import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import React from 'react';
import './globals.css';

const cairo = Cairo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: 'Iraqi Election Platform',
  description: 'Empowering voters with localized election insights across Iraq.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={cairo.variable}>
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased dark:bg-gray-900 dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
