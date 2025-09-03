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
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-2px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(2px)" },
        },
        shakeInterval: {
          "0%, 9%, 100%": { transform: "translateX(0)" },
          "1%, 3%, 5%, 7%": { transform: "translateX(-2px)" },
          "2%, 4%, 6%, 8%": { transform: "translateX(2px)" },
        },
      },
      animation: {
        "custom-bounce": "customBounce 0.6s ease-in-out",
        "shake": "shake 0.5s ease-in-out",
        "shake-interval": "shakeInterval 5.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
