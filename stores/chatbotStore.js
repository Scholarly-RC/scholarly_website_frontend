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
				this.resetChatHistory();
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
			this.chatHistory = JSON.stringify({
				conversation: [
					{
						role: "AI",
						message:
							"Hello! I’m an AI-powered chatbot. How can I assist you today?",
					},
				],
			});
			chatHistory.value = this.chatHistory;
		},
	},
});
