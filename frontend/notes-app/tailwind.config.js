/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      //colours used in project
      colors: {
        primary: "#2B85FF",
        seconary: "EF863E",
      },
    },
  },
  plugins: [],
}

