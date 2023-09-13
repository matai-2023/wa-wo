/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './client/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: '#F4980E',
      },
      height: {
        128: '32rem',
      },
    },
  },
  plugins: [],
}
