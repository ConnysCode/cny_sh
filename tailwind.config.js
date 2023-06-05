/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { roboto: 'var(--font-roboto);' },
      colors: {
        background: { DEFAULT: '#F0F0F2' },
        text: { dark: '#26282A', light: '#fff' },
        header: { input: { DEFAULT: '#F56654', placeholder: '' } },
      },
      fontSize: {
        '4xl': '42px',
      },
      gradientColorStops: {
        'header-input': ['0% #FFDAD3', '100% #FFB1B1'],
      },
      borderRadius: {
        xl: 10,
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
