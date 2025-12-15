# Scholarly Impact Consulting Co. - Frontend

A modern, data-driven website for Scholarly Impact Consulting Co., built with Nuxt 3 and Vue 3. Features an AI-powered chatbot, comprehensive service pages, and a responsive design optimized for performance and SEO.

## 🚀 Features

- **AI-Powered Chatbot**: Interactive chatbot powered by LangChain, OpenAI, and Qdrant for intelligent conversations
- **Multi-Page Website**: Home, About, Services, Resources, Careers, and Engagements pages
- **Modern UI/UX**: Built with Tailwind CSS and shadcn-nuxt components
- **SEO Optimized**: Sitemap generation, robots.txt, and comprehensive meta tags
- **Dark/Light Mode**: Color mode support with user preference detection
- **Form Validation**: Robust form handling with VeeValidate and Zod
- **State Management**: Pinia stores for global state management
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance**: Optimized assets, compression, and lazy loading

## 🛠️ Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/) - Vue.js framework
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn-nuxt](https://shadcn-nuxt.com/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Form Validation**: [VeeValidate](https://vee-validate.logaretm.com/) + [Zod](https://zod.dev/)
- **AI/ML**: 
  - [LangChain](https://js.langchain.com/)
  - [OpenAI](https://openai.com/)
  - [Qdrant](https://qdrant.tech/)
- **Animations**: [Motion V](https://motion-v.com/)
- **Date Handling**: [Day.js](https://day.js.org/)
- **Icons**: [Lucide Vue Next](https://lucide.dev/)
- **Code Quality**: [Biome](https://biomejs.dev/)

## 📋 Prerequisites

- Node.js 18+ 
- npm, pnpm, yarn, or bun
- Access to the backend API (Directus CMS)
- OpenAI API key (for chatbot)
- Qdrant instance (for vector search)

## 🚦 Getting Started

### Installation

```bash
# Install dependencies
npm install
```

The `postinstall` script will automatically run `nuxt prepare` to set up the project.

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# API Configuration
NUXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8055
NUXT_PUBLIC_CHATBOT_API_URL=http://localhost:8000/api/chatbot/

# AI/ML Configuration
EMBEDDING_MODEL=your-embedding-model
OPENAI_API_KEY=your-openai-api-key
CHAT_OPENAI_MODEL=your-chat-model
NOMIC_API_KEY=your-nomic-api-key

# Qdrant Configuration
QDRANT_URL=your-qdrant-url
QDRANT_API_KEY=your-qdrant-api-key
QDRANT_COLLECTION_NAME=your-collection-name
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
# Build the application
npm run build

# Preview the production build locally
npm run preview

# Generate static site
npm run generate
```

### Production Deployment

For production, use:

```bash
npm run build
npm start
```

## 📁 Project Structure

```
scholarly_website_frontend/
├── assets/          # Static assets (CSS, images)
├── components/      # Vue components
│   ├── about/      # About page components
│   ├── careers/    # Careers page components
│   ├── chatbox/    # Chatbot components
│   ├── contact-us/ # Contact form components
│   ├── engagements/# Engagements page components
│   ├── footer/     # Footer components
│   ├── index/      # Home page components
│   ├── navbar/     # Navigation components
│   ├── resources/  # Resources page components
│   ├── services/   # Services page components
│   └── ui/         # Reusable UI components (shadcn)
├── layouts/        # Layout components
├── lib/            # Utility functions and helpers
├── pages/          # Route pages (file-based routing)
├── public/         # Public static files
├── server/         # Server-side API routes
├── stores/         # Pinia stores
├── nuxt.config.ts  # Nuxt configuration
└── tailwind.config.js # Tailwind configuration
```

## 🎨 Code Style

This project follows specific coding conventions:

- **Vue**: Composition API with `<script setup>`, auto-imports enabled
- **TypeScript**: Strict mode, use `.ts` for components, `.js` for stores
- **Imports**: Single quotes, auto-imports (no manual import for Nuxt composables)
- **Naming**: PascalCase for components, camelCase for variables/functions
- **Styling**: Tailwind CSS, kebab-case classes, responsive-first
- **Async**: Use async/await, optional chaining (`?.`)
- **Error handling**: Check `status`/`error` from `useFetch`, graceful fallbacks
- **State**: Pinia stores with `defineStore`, `storeToRefs` for reactivity
- **Formatting**: No semicolons, consistent spacing, template literals for strings

### Linting and Formatting

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## 🤖 Chatbot Integration

The chatbot uses LangChain for orchestration, OpenAI for language models, and Qdrant for vector search. The chatbot API endpoint is configured via `NUXT_PUBLIC_CHATBOT_API_URL`.

Key features:
- Conversation history management
- Vector-based semantic search
- Streaming responses
- Error handling and retry logic

## 🔧 Configuration

### Nuxt Modules

- `@nuxtjs/tailwindcss` - Tailwind CSS integration
- `@nuxtjs/color-mode` - Dark/light mode support
- `@pinia/nuxt` - State management
- `nuxt-swiper` - Carousel/slider functionality
- `@nuxt/fonts` - Font optimization
- `dayjs-nuxt` - Date handling
- `@vee-validate/nuxt` - Form validation
- `@nuxtjs/sitemap` - Sitemap generation
- `@nuxtjs/robots` - Robots.txt generation
- `shadcn-nuxt` - UI component library
- `motion-v/nuxt` - Animation library

### Runtime Config

The application uses Nuxt's runtime config for environment-specific settings. Public config is available on both client and server, while private config is server-only.

## 📱 Pages

- **Home** (`/`) - Landing page with hero, features, and testimonials
- **About** (`/about`) - Company information, team, and FAQ
- **Services** (`/services`) - Service offerings and details
- **Resources** (`/resources`) - Curated books and resources
- **Careers** (`/careers`) - Job openings and company benefits
- **Engagements** (`/engagements`) - Client engagement showcase

## 🧪 Development Tips

1. **Auto-imports**: Nuxt automatically imports composables, so you don't need to manually import `useFetch`, `useState`, etc.

2. **Type Safety**: The project uses TypeScript strictly. Ensure types are properly defined.

3. **Component Organization**: Components are organized by feature/page. Reusable UI components go in `components/ui/`.

4. **State Management**: Use Pinia stores for global state. Access stores with `useStoreName()` composable.

5. **API Calls**: Use `useFetch` or `$fetch` for API calls. The base URL is configured in `nuxt.config.ts`.

## 🐛 Troubleshooting

### Common Issues

1. **Module not found**: Run `npm install` and ensure `nuxt prepare` has run
2. **API errors**: Check environment variables and API endpoint availability
3. **Build errors**: Ensure all dependencies are installed and TypeScript types are correct
4. **Chatbot not working**: Verify OpenAI and Qdrant credentials are set correctly

## 📄 License

This project is private and proprietary to Scholarly Impact Consulting Co.

## 👥 Contributing

This is a private project. For internal contributions, please follow the code style guidelines and ensure all tests pass before submitting changes.

## 🔗 Links

- **Website**: https://scholarlyconsulting.co
- **Nuxt Documentation**: https://nuxt.com/docs
- **Vue Documentation**: https://vuejs.org/
- **Tailwind CSS**: https://tailwindcss.com/docs

---

Built with ❤️ by Scholarly Impact Consulting Co.
