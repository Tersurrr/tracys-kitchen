import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#F4B400',
          light: '#FFD34E',
          dark: '#C89000',
        },
        charcoal: {
          DEFAULT: '#111111',
          light: '#1B1B1B',
          soft: '#242424',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F4B400 0%, #C89000 100%)',
        'dark-gradient': 'linear-gradient(180deg, #111111 0%, #1B1B1B 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(244,180,0,0.08) 0%, rgba(255,255,255,0.02) 100%)',
      },
      boxShadow: {
        gold: '0 8px 30px -8px rgba(244,180,0,0.45)',
        soft: '0 10px 40px -12px rgba(0,0,0,0.6)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
      },
    },
  },
  plugins: [],
};

export default config;
