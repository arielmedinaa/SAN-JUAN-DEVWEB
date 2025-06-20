/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        trivia: ['var(--font-trivia)'],
      },
    },
  },
  plugins: [],
};