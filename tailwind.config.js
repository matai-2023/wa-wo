/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './client/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      fontFamily: {
        lucky: ['"Luckiest Guy"'],
      },
      animation: {
        text: 'text 5s ease infinite',
      },
      keyframes: {
        text: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left-center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
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
