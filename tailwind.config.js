/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        safeia: {
          bg: '#F5F7FA',
          black: '#1A1A1A',
          gray: '#6B7280',
          yellow: '#FFB800',
          'yellow-dark': '#E6A600',
        },
      },
    },
  },
  plugins: [],
};