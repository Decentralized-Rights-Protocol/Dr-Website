/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f9ff',
          100: '#e6f2ff',
          200: '#bfddff',
          300: '#99c8ff',
          400: '#66a9ff',
          500: '#3288ff',
          600: '#1f6fe5',
          700: '#1e5ac1',
          800: '#1f4796',
          900: '#1c3975'
        }
      }
    }
  },
  plugins: []
}

