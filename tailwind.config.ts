import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{js,ts,jsx,tsx}', './posts/**/*.{md}'],
  theme: {
    extend: {},
  },
  plugins: [typography],
};

export default config;
