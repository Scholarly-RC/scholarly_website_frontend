import { defineStore } from "pinia";

export const useChatbotStore = defineStore("chatbotStore", {
  state: () => ({
    chatHistory: null,
  }),
  actions: {
    initialize() {
      const chatHistory = useCookie("chatHistory");
      if (chatHistory.value) {
        this.chatHistory = JSON.stringify(chatHistory.value);
      } else {
        // Initialize with empty conversation - initial message will be added after typing animation
        this.chatHistory = JSON.stringify({
          conversation: [],
        });
        chatHistory.value = this.chatHistory;
      }
    },
    updateChatHistory(sender, message) {
      const chatHistory = useCookie("chatHistory", {
        maxAge: 60 * 60 * 24,
        secure: true,
        sameSite: "strict",
      });

      chatHistory.value.conversation.push({
        role: sender === "AI" ? "AI" : "USER",
        message: message,
      });

      this.chatHistory = JSON.stringify(chatHistory.value);
      chatHistory.value = this.chatHistory;
    },
    resetChatHistory() {
      const chatHistory = useCookie("chatHistory");
      // Reset to empty conversation - initial message will be added after typing animation
      this.chatHistory = JSON.stringify({
        conversation: [],
      });
      chatHistory.value = this.chatHistory;
    },
    addInitialMessage() {
      const chatHistory = useCookie("chatHistory", {
        maxAge: 60 * 60 * 24,
        secure: true,
        sameSite: "strict",
      });

      // Only add if conversation is empty
      const currentHistory = JSON.parse(this.chatHistory);
      if (currentHistory.conversation.length === 0) {
        currentHistory.conversation.push({
          role: "AI",
          message: "Hello! I'm an AI-powered chatbot. How can I assist you today?",
        });
        this.chatHistory = JSON.stringify(currentHistory);
        chatHistory.value = this.chatHistory;
      }
    },
  },
});
