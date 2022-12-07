const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    colors: {
      white: colors.white,
      black: colors.black,
      bad: colors.red,
      good: colors.emerald,
      gray: colors.gray,
      primary: colors.slate,
      accent: colors.blue
    }
  },
}
