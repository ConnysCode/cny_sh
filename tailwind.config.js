/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { roboto: 'var(--font-roboto);' },
      colors: {
        background: { DEFAULT: '#F2F2F2' },
        text: { dark: { DEFAULT: '#26282A' } },
      },
    },
  },
  plugins: [],
};
