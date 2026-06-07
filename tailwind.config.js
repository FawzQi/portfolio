/** @type {import('tailwindcss').Config} */
export default {
  // Enable class-based dark mode toggling
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Custom color palette — Yellow, Blue, White
      colors: {
        yellow: {
          50:  '#FFFDE7',
          100: '#FFF9C4',
          200: '#FFF176',
          300: '#FFE338',
          400: '#FACC15', // Primary yellow
          500: '#F59E0B',
          600: '#D97706',
        },
        blue: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB', // Primary blue
          700: '#1D4ED8',
          900: '#1E3A8A',
        },
      },
      // Custom fonts loaded via Google Fonts in index.html
      fontFamily: {
        display: ['Syne', 'sans-serif'],  // Headings — distinctive, geometric
        body:    ['DM Sans', 'sans-serif'], // Body — clean, readable
      },
      // Smooth animation durations
      transitionDuration: {
        400: '400ms',
      },
      // Custom keyframes for loading and fade animations
      keyframes: {
        fadeInUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        fadeIn:   'fadeIn 0.5s ease-out forwards',
        shimmer:  'shimmer 2s linear infinite',
        blink:    'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
}
