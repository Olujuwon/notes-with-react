/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html',
   './src/**/*.{js,ts,jsx,tsx}',],
  theme: {
    fontFamily: {
      'poppins': ['Poppins', 'system-ui', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}

