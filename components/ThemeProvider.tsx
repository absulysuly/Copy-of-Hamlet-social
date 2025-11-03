
'use client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { useEffect, useState } from 'react';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Ramadan detection temporarily disabled for build
    // if (isRamadan()) {
    //   document.documentElement.classList.add('ramadan');
    // }
  }, []);

  if (!mounted) {
    // Render children without the provider on the server to avoid mismatch
    return <>{children}</>;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
