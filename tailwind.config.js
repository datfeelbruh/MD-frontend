export default {
  content: ["./src/**/*.{html,tsx,ts}"],
  theme: {
    extend: {
      colors: {
        "bsod-blue": "#001b58"
      }
    },
  },
  plugins: [require("tailwind-nord")],
}
