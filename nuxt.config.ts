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
    "dayjs-nuxt",
    "@vee-validate/nuxt",
  ],
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined",
        },
      ],
    },
  },
  dayjs: {
    locales: ["en"],
    plugins: ["relativeTime", "timezone"],
    defaultLocale: [
      "en",
      {
        relativeTime: {
          future: "in %s",
          past: "%s ago",
          s: "a few seconds",
          m: "a minute",
          mm: "%d minutes",
          h: "an hour",
          hh: "%d hours",
          d: "a day",
          dd: "%d days",
          M: "a month",
          MM: "%d months",
          y: "a year",
          yy: "%d years",
        },
      },
    ],
    defaultTimezone: "Asia/Manila",
  },
  css: ["~/assets/css/input.css"],
  colorMode: {
    classSuffix: "",
    preference: "light",
    fallback: "light",
  },
  veeValidate: {
    autoImports: true,
  },
  runtimeConfig: {
    public: {
      apiBaseUrl:
        process.env.NUXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8055",
    },
    EMBEDDING_MODEL: process.env.EMBEDDING_MODEL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    QDRANT_URL: process.env.QDRANT_URL,
    QDRANT_API_KEY: process.env.QDRANT_API_KEY,
    CHAT_OPENAI_MODEL: process.env.CHAT_OPENAI_MODEL,
    NOMIC_API_KEY: process.env.NOMIC_API_KEY,
    QDRANT_COLLECTION_NAME: process.env.QDRANT_COLLECTION_NAME,
  },
});
