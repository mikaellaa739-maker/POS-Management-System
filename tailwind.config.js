/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#355872",
        secondary: "#7AAACE",
        accent: "#9CD5FF",
        background: "#F7F8F0",
        surface: "#FFFFFF",

        navy: {
          900: "#243B53",
          800: "#355872",
          700: "#4A6D8A",
          600: "#7AAACE",
          500: "#9CD5FF",
          400: "#CFE7F7",
          300: "#E6F3FF",
          200: "#F0F7FC",
          100: "#F7F8F0",
        }
      }
    },
  },

  plugins: [],
};