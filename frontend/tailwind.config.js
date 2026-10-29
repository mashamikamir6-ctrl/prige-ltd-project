/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#2E7D32",
          dark: "#1B5E20",
          light: "#81C784",
          cream: "#F1F8E9",
        }
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
      }
    },
  },
  plugins: [],
}