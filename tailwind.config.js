/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2ECC71',
        'primary-dark': '#27AE60',
        accent: '#F39C12',
        'neutral-bg': '#F0F0F0',
        'dark-text': '#2C3E50',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
}
