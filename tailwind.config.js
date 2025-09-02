/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./node_modules/flowbite/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9f4",
          100: "#dcf2e6",
          200: "#bae6cc",
          300: "#87d4a3",
          400: "#5cb87a",
          500: "#d4cc59",
          600: "#729f4e",
          700: "#568f4e",
          800: "#37804f",
          900: "#025b48",
          950: "#013d35",
        },
      },
      keyframes: {
        customBounce: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "30%": { transform: "translateY(-10px) scale(1.1)" },
          "60%": { transform: "translateY(5px) scale(0.9)" },
        },
      },
      animation: {
        "custom-bounce": "customBounce 0.6s ease-in-out",
      },
    },
  },
  plugins: [],
};
