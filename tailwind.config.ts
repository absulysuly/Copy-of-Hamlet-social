import type { Config } from 'tailwindcss';
import tailwindcssRtl from 'tailwindcss-rtl';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'iraq-red': '#CE1126',
        'iraq-white': '#FFFFFF',
        'iraq-black': '#000000',
        'iraq-green': '#007A3D',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        arabic: ['var(--font-arabic)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    tailwindcssRtl,
  ],
};

export default config;
