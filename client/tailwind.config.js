/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'display': ['Source Sans 3', 'Arial']
    },
    backgroundImage: {
      'nature-bg': "url('../public/naturebg.jpg')",
    },
    extend: {},
  },
  plugins: [],
}

