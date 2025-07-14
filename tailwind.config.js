import typography from '@tailwindcss/typography';
import colors from 'tailwindcss/colors';

const config = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: colors.orange,
        secondary: colors.amber,
        accent: colors.blue,
        dark: colors.gray,
        ember: 'var(--c-ember)',
        moss: 'var(--c-moss)',
        lava: 'var(--c-lava)',
        'glass-elev1': 'var(--c-glass-top)',
        'glass-elev2': 'var(--c-glass-bot)',
      },
      fontFamily: {
        sans: ['"SF Pro Display"', '"SF Pro"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Lexend', 'sans-serif'],
        mono: ['"SF Mono"', 'Menlo', 'Fira Code', 'monospace'],
        head: ['var(--font-head)'],
        body: ['var(--font-body)'],
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
        elev1: 'var(--shadow-elev-1)',
        elev2: 'var(--shadow-elev-2)',
        ember: 'var(--shadow-ember)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [
    typography,
  ],
};

export default config;
