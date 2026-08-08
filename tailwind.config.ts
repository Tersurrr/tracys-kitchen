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
          DEFAULT: '#D09A20',
          light: '#DFB451',
          dark: '#A87412',
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
        'gold-gradient': 'linear-gradient(135deg, #D09A20 0%, #A87412 100%)',
        'dark-gradient': 'linear-gradient(180deg, #111111 0%, #1B1B1B 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(208,154,32,0.06) 0%, rgba(255,255,255,0.02) 100%)',
      },
      boxShadow: {
        'gold-soft': '0 6px 18px -10px rgba(208,154,32,0.18)',
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
