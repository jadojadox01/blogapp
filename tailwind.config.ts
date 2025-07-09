import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

type ThemeGetter = (key: string) => string | number;

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './posts/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        emerald: {
          600: '#059669',
          700: '#047857',
        },
      },
      typography: {
        DEFAULT: {
          css(theme: ThemeGetter) {
            return {
              h1: { fontWeight: '700' },
              h2: { fontWeight: '700' },
              h3: { fontWeight: '600' },
              p: { marginBottom: theme('spacing.5') },
            };
          },
        },
        dark: {
          css(theme: ThemeGetter) {
            return {
              color: theme('colors.gray.300'),
              a: { color: theme('colors.blue.400') },
              strong: { color: theme('colors.gray.100') },
              h1: { color: theme('colors.gray.100') },
              h2: { color: theme('colors.gray.100') },
              h3: { color: theme('colors.gray.100') },
            };
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
