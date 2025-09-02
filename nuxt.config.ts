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
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "@nuxt/icon",
    "@nuxt/image",
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
  fonts: {
    families: [
      {
        name: "Montserrat",
        provider: "google",
        weights: [400, 500, 600, 700],
        subsets: ["latin"],
      },
    ],
    defaults: {
      preload: true,
    },
  },
  nitro: {
    preset: 'static',
    compressPublicAssets: true,
    minify: true,
    experimental: {
      wasm: true,
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
  vite: {
    optimizeDeps: {
      include: ['@nuxt/image'],
    },
  },
  // @ts-ignore
  image: {
    domains: [
      '127.0.0.1:8055',
      'localhost:8055',
      process.env.NUXT_PUBLIC_API_BASE_URL?.replace('http://', '').replace('https://', '') || 'scholarlyconsulting.co'
    ],
    format: ['webp', 'avif', 'png', 'jpg'],
    quality: 85,
    sizes: '320,640,768,1024,1280,1536',
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    presets: {
      avatar: {
        modifiers: {
          format: 'webp',
          width: 100,
          height: 100,
          fit: 'cover',
          quality: 80,
        },
      },
      hero: {
        modifiers: {
          format: 'webp',
          width: 1920,
          height: 1080,
          fit: 'cover',
          quality: 90,
        },
      },
      thumbnail: {
        modifiers: {
          format: 'webp',
          width: 400,
          height: 300,
          fit: 'cover',
          quality: 85,
        },
      },
    },
  },
  site: {
    url: "https://scholarlyconsulting.co",
    name: "Scholarly Impact Consulting Co.",
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
