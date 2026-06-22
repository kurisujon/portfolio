import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#0a0a0a',
        surface: '#171717',
        elevated: '#262626',
      },
      textColor: {
        primary: '#f5f5f5',
        secondary: '#a3a3a3',
      },
      borderColor: {
        default: '#404040',
        'accent-muted': '#737373',
      },
      ringColor: {
        'accent-muted': '#737373',
      },
      spacing: {
        '24': '96px',
        '32': '128px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'counter-orbit': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'blob-float': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
        'blob-float-alt': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(-30px, 50px) scale(1.2)' },
          '66%': { transform: 'translate(20px, -20px) scale(0.8)' },
        }
      },
      animation: {
        'orbit': 'orbit 20s linear infinite',
        'orbit-slow': 'orbit 35s linear infinite',
        'counter-orbit': 'counter-orbit 20s linear infinite',
        'counter-orbit-slow': 'counter-orbit 35s linear infinite',
        'blob-float': 'blob-float 15s ease-in-out infinite',
        'blob-float-alt': 'blob-float-alt 20s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
export default config
