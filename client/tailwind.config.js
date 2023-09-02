/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'display': ['Source Sans 3', 'Arial'],
      'inter': ['Inter', 'sans-serif'],
    },
    backgroundImage: {
      'nature-bg': "url('../public/naturebg.jpg')",
      'vine-bg': "url('../public/vinebg.png')",
      'fruit-bg': "url('../public/fruitbg.png')",
    },
    extend: {},
  },
  plugins: [],
}

