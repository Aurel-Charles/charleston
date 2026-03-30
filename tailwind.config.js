/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.{html,md}",
    "./assets/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        creme: "#EEEAE0",
        encre: "#1C1A17",
        sauge: "#7B9E8E",
      },
      fontFamily: {
        display: ['"Barlow Condensed"', "sans-serif"],
        mono: ['"Space Mono"', "monospace"],
        sans: ['"Barlow"', "system-ui", "sans-serif"],
      },
    },
  },
  safelist: [
    'bg-sauge',
    'bg-creme/30',
  ],
  plugins: [],
};
