import { handleGetResponse } from './api/getResponse.js';
import { handleSaveChatbotMessages } from './api/saveChatbotMessages.js';

export interface Env {
  NUXT_PUBLIC_API_BASE_URL: string;
  EMBEDDING_MODEL: string;
  OPENAI_API_KEY: string;
  QDRANT_URL: string;
  QDRANT_API_KEY: string;
  CHAT_OPENAI_MODEL: string;
  NOMIC_API_KEY: string;
  QDRANT_COLLECTION_NAME: string;
}

interface ExecutionContext {
  waitUntil(promise: Promise<any>): void;
  passThroughOnException(): void;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Handle API routes
    if (url.pathname.startsWith('/api/')) {
      if (url.pathname === '/api/getResponse') {
        return handleGetResponse(request, env);
      }
      if (url.pathname === '/api/saveChatbotMessages') {
        return handleSaveChatbotMessages(request, env);
      }
      return new Response('API endpoint not found', { status: 404 });
    }

    // For non-API routes, return a simple response
    // In production, you'd typically serve static files or proxy to your frontend
    return new Response('Hello from Cloudflare Workers!', {
      headers: { 'Content-Type': 'text/plain' },
    });
  },
};