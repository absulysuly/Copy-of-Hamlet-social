'use client';

import { useEffect } from 'react';

interface HtmlAttributesProps {
  lang: string;
  dir?: 'ltr' | 'rtl' | 'auto' | string;
  className?: string;
}

export function HtmlAttributes({ lang, dir, className }: HtmlAttributesProps) {
  useEffect(() => {
    const html = document.documentElement;
    const previous = {
      lang: html.lang,
      dir: html.dir,
      className: html.className,
    };

    if (lang) {
      html.lang = lang;
    }

    if (dir) {
      html.dir = dir;
    }

    if (className) {
      const classList = className.split(' ').filter(Boolean);
      html.classList.add(...classList);

      return () => {
        html.lang = previous.lang;
        html.dir = previous.dir;
        html.className = previous.className;
      };
    }

    return () => {
      html.lang = previous.lang;
      html.dir = previous.dir;
      html.className = previous.className;
    };
  }, [lang, dir, className]);

  return null;
}
