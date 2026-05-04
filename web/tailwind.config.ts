import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette per /docs/05-brand-voice.md
        bg: '#F7F4EE',           // off-white background
        ink: '#1F1F1B',          // charcoal text
        accent: '#C46A4D',       // clay terracotta (primary accent)
        olive: '#5B6B3A',        // deep olive (alt accent — pick one)
        muted: '#8A8A85',        // secondary text
        line: '#E5E1D8',         // hairline borders
      },
      fontFamily: {
        // Pair: serif display + sans body (per /docs/05)
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        prose: '65ch',
      },
    },
  },
  plugins: [],
};

export default config;
