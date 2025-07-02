import typography from '@tailwindcss/typography';
import colors from 'tailwindcss/colors';

const config = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Retro-Industrial Color Palette
        'bg-surface': '#E3E5E2',
        'bg-console': '#0F2022',
        'fg-primary': '#C7FFB8',
        'fg-secondary': '#FFFFFF',
        'accent-orange': '#FF7E26',
        'accent-rail': '#688572',
        'border-muted': '#8D968E',
        
        // Legacy colors for backward compatibility
        primary: colors.orange,
        secondary: colors.amber,
        accent: colors.blue,
        dark: colors.gray,
      },
      fontFamily: {
        sans: ['Inter', '"IBM Plex Sans"', '"Segoe UI"', 'system-ui', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"SF Mono"', 'Menlo', 'Fira Code', 'monospace'],
        flip: ['"IBM Plex Mono"', 'monospace'],
      },
      fontSize: {
        'flip-heading': 'clamp(2.4rem, 5vw, 3.8rem)',
      },
      letterSpacing: {
        'label': '0.05em',
      },
      lineHeight: {
        'flip': '1',
        'body': '1.55',
        'label': '1.2',
      },
      spacing: {
        'section-y': '96px',
        'section-y-mobile': '48px',
        'gutter': '24px',
        'gutter-mobile': '16px',
      },
      borderRadius: {
        'retro': '4px',
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flip': 'flip 200ms cubic-bezier(.23,1,.32,1)',
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
        },
        'flip': {
          '0%': {
            transform: 'rotateX(0deg)'
          },
          '50%': {
            transform: 'rotateX(90deg)'
          },
          '100%': {
            transform: 'rotateX(0deg)'
          }
        }
      },
      boxShadow: {
        'stripe': '0 30px 60px -12px rgba(50, 50, 93, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.3)',
        'stripe-md': '0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3)',
        'stripe-sm': '0 6px 12px -2px rgba(50, 50, 93, 0.25), 0 3px 7px -3px rgba(0, 0, 0, 0.3)',
        'retro': '0 6px 8px rgba(0,0,0,0.25)',
        'retro-inner': 'inset 0 1px 2px rgba(0,0,0,0.1)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      transitionTimingFunction: {
        'flip': 'cubic-bezier(.23,1,.32,1)',
        'retro-hover': 'ease-out',
        'retro-focus': 'linear',
      },
      transitionDuration: {
        'flip': '200ms',
        'retro-hover': '150ms',
        'retro-focus': '120ms',
      }
    },
  },
  plugins: [
    typography,
  ],
};

export default config;
