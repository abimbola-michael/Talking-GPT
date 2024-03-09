/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-black": "rgb(0, 0, 0, 0.8)",
        "lighter-black": "rgb(0, 0, 0, 0.5)",
        "lightest-black": "rgb(0, 0, 0, 0.2)",
        "light-white": "rgb(255, 255, 255, 0.8)",
        "lighter-white": "rgb(255, 255, 255, 0.5)",
        "lightest-white": "rgb(255, 255, 255, 0.2)",
      },
    },
  },
  plugins: [],
};
