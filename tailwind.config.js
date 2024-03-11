/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#121212",
        tint: {
          dark: "rgb(0, 0, 0)",
          DEFAULT: "rgb(0, 0, 0)",
          light: "rgb(255, 255, 255)",
        },
        "light-tint": {
          dark: "rgb(0, 0, 0, 0.8)",
          DEFAULT: "rgb(0, 0, 0, 0.8)",
          light: "rgb(255, 255, 255, 0.8)",
        },
        "lighter-tint": {
          dark: "rgb(0, 0, 0, 0.5)",
          DEFAULT: "rgb(0, 0, 0, 0.5)",
          light: "rgb(255, 255, 255, 0.5)",
        },
        "lightest-tint": {
          dark: "rgb(0, 0, 0, 0.2)",
          DEFAULT: "rgb(0, 0, 0, 0.2)",
          light: "rgb(255, 255, 255, 0.2)",
        },
      },
    },
  },
  plugins: [],
};
