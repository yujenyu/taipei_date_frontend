/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        display: ['"Noto Sans TC"', 'Helvetica', 'sans-serif', 'Arial'],
      },
      fontSize: {
        h1: '48px',
        h2: '40px',
        h3: '32px',
        h4: '24px',
        h5: '20px',
        h6: '16px',
      },
      colors: {
        neongreen: '#A0FF1F',
        neonpink: '#ff03ff',
        light: '#fff',
        dark: '#000',
      },
    },
  },
  plugins: [require('daisyui')],
};
