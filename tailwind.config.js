/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#a78bfa", // morado claro
          DEFAULT: "#7c3aed", // morado principal
          dark: "#4c1d95", // morado profundo
        },
      },
    },
  },
  plugins: [],
};
