/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bowlby: ['"Bowlby One SC"', 'cursive'],
        googlecode: ['"Google Sans Code"', 'monospace'],
        Athiti: ["Athiti", 'sans-serif']
      },
      
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [ "dark", ],
  },
}

