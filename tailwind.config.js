import typography from '@tailwindcss/typography';
import colors from 'tailwindcss/colors';

export default {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f8ff',
          100: '#edf2ff',
          200: '#dee8ff',
          300: '#c6d5f7',
          400: '#a4b8ef',
          500: '#7f94e6',
          600: '#6670d9',
          700: '#5653b7',
          800: '#434190',
          900: '#372f6c',
          950: '#232046',
        },
        secondary: {
          50: '#f6f6f9',
          100: '#edecf5',
          200: '#dad9eb',
          300: '#bcb9db',
          400: '#9993c6',
          500: '#7c74b2',
          600: '#64599a',
          700: '#51487d',
          800: '#433d67',
          900: '#393556',
        },
        accent: {
          50: '#f0fbf8',
          100: '#d0f3e9',
          200: '#a3e9d9',
          300: '#6dd6c3',
          400: '#38bba8',
          500: '#25a08e',
          600: '#1c8073',
          700: '#1c645d',
          800: '#1c4f4a',
          900: '#1a433e',
        },
        dark: colors.gray,
      },
      fontFamily: {
        sans: ['"SF Pro Display"', '"SF Pro"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Lexend', 'sans-serif'],
        mono: ['"SF Mono"', 'Menlo', 'Fira Code', 'monospace'],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-10px)'
          }
        }
      },
      boxShadow: {
        'stripe': '0 30px 60px -12px rgba(50, 50, 93, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.3)',
        'stripe-md': '0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3)',
        'stripe-sm': '0 6px 12px -2px rgba(50, 50, 93, 0.25), 0 3px 7px -3px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [
    typography,
  ],
}
