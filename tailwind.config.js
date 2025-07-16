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
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [ "dark", ],
  },
}

