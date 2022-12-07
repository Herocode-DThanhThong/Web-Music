/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      keyframes: {
        showUp: {
          "0%": {
            transform: "translateY(100%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        fadeDown: {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(100%)",
          },
        },
      },
      animation: {
        showUp: "showUp 1s ease-in-out",
        fadeDown: "fadeDown 1s ease-in-out",
      },
      colors: {
        main: "#121212",
        purpleCT: "rgb(48, 40, 104)",
      },
    },
  },
  plugins: [],
};
