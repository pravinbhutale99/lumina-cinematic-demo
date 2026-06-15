import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink:    '#0e0c0a',
        ink2:   '#1e1a16',
        'off':  '#f4f1ec',
        stone:  '#e8e2d9',
        muted:  '#8a8070',
        gold:   '#b89a6a',
        'gold-lt': '#d4b98a',
        'gold-dk': '#8a7248',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.22em',
      },
      animation: {
        'grain':      'grain 0.5s steps(1) infinite',
        'live-pulse': 'livePulse 2s ease-in-out infinite',
        'marquee':    'marquee 24s linear infinite',
        'float-a':    'floatA 6s ease-in-out infinite',
        'float-b':    'floatB 8s ease-in-out infinite',
        'float-c':    'floatC 5.5s ease-in-out infinite',
        'light-drift':'lightDrift 12s ease-in-out infinite',
        'scroll-line':'scrollLine 2.5s ease-in-out infinite',
      },
      keyframes: {
        grain: {
          '0%':   { transform: 'translate(0,0)' },
          '20%':  { transform: 'translate(-3px,2px)' },
          '40%':  { transform: 'translate(2px,-3px)' },
          '60%':  { transform: 'translate(-1px,3px)' },
          '80%':  { transform: 'translate(3px,1px)' },
          '100%': { transform: 'translate(-2px,-1px)' },
        },
        livePulse: {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0.3' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floatA: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        floatB: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(9px)' },
        },
        floatC: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-7px)' },
        },
        lightDrift: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(-30px,20px) scale(1.08)' },
          '66%':     { transform: 'translate(20px,-15px) scale(0.95)' },
        },
        scrollLine: {
          '0%,100%': { opacity: '0.2', transform: 'scaleY(0.4)' },
          '50%':     { opacity: '0.8', transform: 'scaleY(1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
export default config
