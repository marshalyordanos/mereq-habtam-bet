/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        serif: ["ui-serif", "Georgia"],
        mono: ["ui-monospace", "SFMono-Regular"],
        markazi: ["Markazi", "sans-serif"],
        robotom: ["Roboto M", "sans-serif"],
        robotor: ["Roboto R", "sans-serif"],
        robotorb: ["Roboto B", "sans-serif"],
        robotorbla: ["Roboto Bla", "sans-serif"],
        karla: ["Karla", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        adelia: ["ADELIA", "cursive"],
        display: ["Oswald"],
        blackhan: ["Black Han Sans", "sans-serif"],
        cabin: ["Cabin", "sans-serif"],
      },
    },
  },
  plugins: [],
};
