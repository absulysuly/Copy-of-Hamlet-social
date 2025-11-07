import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        arabic: ['"Noto Sans Arabic"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        'iraqi-red': '#CE1126',
        'iraqi-green': '#007A3D',
        'iraqi-black': '#000000',
        'iraqi-white': '#FFFFFF',
      },
    },
  },
  plugins: [],
};
export default config;
