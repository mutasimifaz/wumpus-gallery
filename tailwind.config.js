/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#0b1120",
      },
      backgroundImage: {
        main: "url('/src/assets/images/bg.png')",
      },
    },
  },
  plugins: [require("daisyui")],
};
