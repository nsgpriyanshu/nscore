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
        red: '#ff3b30',
        orange: '#ff9500',
        yellow: '#ffcc00',
        green: '#34c759',
        mint: '#00c7be',
        teal: '#30b0c7',
        cyan: '#32ade6',
        blue: '#007aff',
        indigo: '#5856d6',
        purple: '#af52de',
        pink: '#ff2d55',
        brown: '#a2845e',
        lightGray: '#aeaeb2',
        lightGrayMid: '#3a3a3c',
        grayMid: '#2c2c2e',
        darkGray: '#1c1c1e',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
