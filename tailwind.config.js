/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        hover: 'hover 10s ease-in-out 0ms infinite',
        'hover-delay-400': 'hover 10s ease-in-out 400ms infinite',
        'hover-delay-800': 'hover 14s ease-in-out 800ms infinite',
        'hover-delay-1600': 'hover 18s ease-in-out 1600ms infinite',
      },
      keyframes: {
        hover: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
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
  variants: {
    extend: {
      animation: ['hover'],
    },
  },
  plugins: [],
};
