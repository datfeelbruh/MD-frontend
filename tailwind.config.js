module.exports = {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    extend: {
      colors: {
        "bsod-blue": "#001b58"
      }
    },
  },
  plugins: [require("tailwind-nord")],
}