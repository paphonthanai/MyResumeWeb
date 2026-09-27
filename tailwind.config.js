/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        displayThai: ['"Noto Serif Thai"', 'serif'],
        sans: ['"Outfit"', 'sans-serif'],
        thai: ['"Noto Sans Thai"', 'sans-serif'],
      },
      
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        luxe: {
          "color-scheme": "dark",
          primary: "#d4af37",
          "primary-content": "#0a0906",
          secondary: "#c9a961",
          "secondary-content": "#0a0906",
          accent: "#8a6d3b",
          "accent-content": "#f5efe0",
          neutral: "#161513",
          "neutral-content": "#e9e2d0",
          "base-100": "#0a0906",
          "base-200": "#141210",
          "base-300": "#211e19",
          "base-content": "#eee7d6",
          info: "#8fb8c9",
          success: "#8fae6f",
          warning: "#d4af37",
          error: "#b9694a",
          "--rounded-box": "0.5rem",
          "--rounded-btn": "0.25rem",
          "--tab-radius": "0.25rem",
        },
      },
    ],
  },
}

