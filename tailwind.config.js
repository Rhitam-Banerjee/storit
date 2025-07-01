// tailwind.config.js
import { heroui } from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/(button|card|divider|input|input-otp|ripple|spinner|form).js"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()],
};