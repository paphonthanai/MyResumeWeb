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
        plex: ['"IBM Plex Sans Thai"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      // Company-site palette (design handoff): warm black, hairline borders, one gold.
      colors: {
        pnj: {
          bg: '#0F0E0C', surface: '#151310', s2: '#1A1814', s3: '#1E1B16',
          line: '#2A2722', line2: '#3A362F',
          text: '#F3EFE7', text2: '#C9C2B5', muted: '#A39C8F', faint: '#7D766A',
          gold: '#D9AE5B', goldhi: '#F0CE86', ongold: '#1A1408', ok: '#8FC79A',
          paper: '#F4F1EA', ink: '#1C1A16', goldink: '#8A6A2A',
        },
      },
      
    },
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
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

