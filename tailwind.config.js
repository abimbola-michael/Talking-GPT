/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tint: {
          light: "rgb(0, 0, 0)",
          DEFAULT: "rgb(0, 0, 0)",
          dark: "rgb(255, 255, 255)",
        },
        "light-tint": {
          light: "rgb(0, 0, 0, 0.8)",
          DEFAULT: "rgb(0, 0, 0, 0.8)",
          dark: "rgb(255, 255, 255, 0.8)",
        },
        "lighter-tint": {
          light: "rgb(0, 0, 0, 0.5)",
          DEFAULT: "rgb(0, 0, 0, 0.5)",
          dark: "rgb(255, 255, 255, 0.5)",
        },
        "lightest-tint": {
          light: "rgb(0, 0, 0, 0.2)",
          DEFAULT: "rgb(0, 0, 0, 0.2)",
          dark: "rgb(255, 255, 255, 0.2)",
        },
      },
    },
  },
  plugins: [],
};
