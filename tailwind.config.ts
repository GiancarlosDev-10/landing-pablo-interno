import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#F5C518',
        'gold-dark': '#D4A800',
        cream: '#F5EDD6',
        bg: '#0c0c0c',
        'bg2': '#161616',
        text: '#F0E8D0',
        muted: '#8a7f6a',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
      animation: {
        'float-in': 'floatIn 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'pulse-dot': 'pulseDot 2s infinite',
        bobble: 'bobble 3s ease-in-out infinite',
      },
      keyframes: {
        floatIn: {
          '0%': { opacity: '0', transform: 'translateY(-24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.2)' },
        },
        bobble: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
} satisfies Config;
