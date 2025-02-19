/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        custom: "0px 1px 13px 0px rgba(0, 0, 0, 0.05)", // Custom shadow
      },
    },
  },
  plugins: [],
};
