const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: colors.white,
      black: colors.black,
      bad: colors.red,
      good: colors.emerald,
      gray: colors.gray,
      primary: colors.gray,
      accent: colors.emerald
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
