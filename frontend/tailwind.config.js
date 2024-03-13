/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#121212",
        black: "rgb(0, 0, 0)",
        "black-light": "rgb(0, 0, 0, 0.8)",
        "black-lighter": "rgb(0, 0, 0, 0.5)",
        "black-lightest": "rgb(0, 0, 0, 0.2)",
        white: "rgb(255, 255, 255)",
        "white-light": "rgb(255, 255, 255, 0.8)",
        "white-lighter": "rgb(255, 255, 255, 0.5)",
        "white-lightest": "rgb(255, 255, 255, 0.2)",
      },
    },
  },
  plugins: [],
};
