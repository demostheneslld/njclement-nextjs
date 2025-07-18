import typography from '@tailwindcss/typography';
import colors from 'tailwindcss/colors';

const config = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: 'rgb(from var(--c-primary) r g b / <alpha-value>)',
        'primary-contrast': 'rgb(from var(--c-primary-contrast) r g b / <alpha-value>)',
        secondary: colors.amber,
        dark: colors.gray,
        accent: 'rgb(from var(--c-accent) r g b / <alpha-value>)',
        'accent-contrast': 'rgb(from var(--c-accent-contrast) r g b / <alpha-value>)',
        danger: 'rgb(from var(--c-danger) r g b / <alpha-value>)',
        'glass-elev1': 'var(--c-glass-top)',
        'glass-elev2': 'var(--c-glass-bottom)',
        // Design system colors
        'text-high': 'rgb(from var(--c-text-high) r g b / <alpha-value>)',
        'text-med': 'rgb(from var(--c-text-med) r g b / <alpha-value>)',
        'text-low': 'rgb(from var(--c-text-low) r g b / <alpha-value>)',
        'neutral': 'rgb(from var(--c-neutral) r g b / <alpha-value>)',
        'neutral-sub': 'rgb(from var(--c-neutral-sub) r g b / <alpha-value>)',
      },
      fontFamily: {
        sans: ['"SF Pro Display"', '"SF Pro"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Lexend', 'sans-serif'],
        mono: ['"SF Mono"', 'Menlo', 'Fira Code', 'monospace'],
        head: 'var(--font-head)',
        body: 'var(--font-body)',
      },
      fontSize: {
        'hero': 'var(--fs-hero)',
        'h1': 'var(--fs-h1)',
        'h2': 'var(--fs-h2)',
        'body-lg': 'var(--fs-body-lg)',
        'body': 'var(--fs-body)',
        'mono': 'var(--fs-mono)',
      },
      lineHeight: {
        'tight': 'var(--lh-tight)',
        'body': 'var(--lh-body)',
      },
      spacing: {
        '1': 'var(--space-1)',
        '2': 'var(--space-2)',
        '3': 'var(--space-3)',
        '4': 'var(--space-4)',
        '5': 'var(--space-5)',
        '6': 'var(--space-6)',
      },
      borderRadius: {
        'card': 'var(--radius-card)',
        'pill': 'var(--radius-pill)',
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
        'elev-1': 'var(--shadow-elev-1)',
        'elev-2': 'var(--shadow-elev-2)',
        'accent': 'var(--shadow-accent)',
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
