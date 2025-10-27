/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Urbanist', 'sans-serif'],
      },
      colors: {
        'app-blue': 'var(--app-blue)',
        'app-bg': 'var(--app-bg)',
        'light-gray': 'var(--light-gray)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
      }
    },
  },
  plugins: [],
}
