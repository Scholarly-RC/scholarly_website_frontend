# Chatbox Cleanup and Migration Plan

## Overview
Migrate the existing chatbox feature from a complex LangChain-based implementation to a simpler webhook-based system. The new endpoint accepts `{"message": "<user-message>", "session_id": "<session-id>"}` and returns `{"response": "<ai-response>"}`.

## Current Implementation Analysis
- **Chatbox.vue**: Main component handling UI, state, and API calls
- **chatbotStore.js**: Manages chat history using cookies with Pinia
- **getResponse.js**: Server-side API using LangChain for embeddings and OpenAI
- **saveChatbotMessages.js**: Saves conversations to external API
- Uses complex RAG system with Qdrant, OpenAI, and Nomic embeddings

## Migration Tasks

### 1. Environment Setup
- Add `NUXT_PUBLIC_CHAT_WEBHOOK_URL` to `nuxt.config.ts`
- Value: `http://localhost:5678/webhook/6993ab66-7c2a-4114-bdc6-8ec634419a8f`
- This allows easy configuration for different environments

### 2. Core Implementation Changes
- Replace complex LangChain API calls with direct webhook POST requests
- Update request payload format to match new endpoint requirements
- Handle new response format `{"response": "<ai-response>"}`
- Implement session_id generation and management (UUID-based)

### 3. User Experience Improvements
- Enhanced error handling with user-friendly error messages
- Improved loading states and typing indicators
- Better accessibility (ARIA labels, keyboard navigation)
- Responsive design refinements for mobile devices
- Smooth animations for message appearance and transitions

### 4. Code Cleanup
- Remove unused server APIs (`server/api/getResponse.js`, `server/api/saveChatbotMessages.js`)
- Simplify chatbot store if webhook handles persistence
- Remove unnecessary dependencies (LangChain, Qdrant, OpenAI client)
- Update package.json to remove unused packages

### 5. Testing and Validation
- Verify webhook integration works correctly
- Test error scenarios and edge cases
- Ensure chat history persistence functions properly
- Validate UX improvements across different devices
- Performance testing for response times

## Benefits of Migration
- **Simplified Architecture**: Remove heavy AI dependencies and complex RAG system
- **Better Maintainability**: Direct webhook calls are easier to debug and maintain
- **Improved Performance**: Faster response times without vector searches
- **Enhanced UX**: Better error handling and loading states
- **Scalability**: Webhook approach allows for easier backend scaling

## Implementation Order
1. Environment variable setup
2. Update Chatbox.vue component
3. Implement session handling
4. Add UX improvements
5. Cleanup unused code
6. Testing and validation

## Risk Mitigation
- Keep backup of current implementation
- Test thoroughly in development environment
- Ensure graceful fallback for API failures
- Maintain backward compatibility where possible