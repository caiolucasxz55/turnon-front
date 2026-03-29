/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF6B00',
          'orange-light': '#FF8C33',
          'orange-dim': '#FF6B0020',
          purple: '#7C3AED',
          'purple-light': '#9D5FF5',
          'purple-dim': '#7C3AED20',
          black: '#0C0C0E',
          surface: '#141416',
          'surface-2': '#1C1C21',
          border: '#FFFFFF12',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },
      animation: {
        'fade-up': 'fadeUp 0.3s ease forwards',
        shimmer: 'shimmer 1.4s infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          from: { backgroundPosition: '200% 0' },
          to:   { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
};
