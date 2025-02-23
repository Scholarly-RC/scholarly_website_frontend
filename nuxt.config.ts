// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "nuxt-swiper",
    "@nuxt/fonts",
  ],
  css: ["~/assets/css/input.css"],
  colorMode: {
    classSuffix: "",
    preference: "light",
    fallback: "light",
  },
  runtimeConfig: {
    public: {
      apiBaseUrl:
        process.env.NUXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8055",
    },
  },
});
