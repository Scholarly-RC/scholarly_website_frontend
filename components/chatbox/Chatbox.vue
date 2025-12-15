<script setup>
const chatbotStore = useChatbotStore();
const { chatHistory } = storeToRefs(chatbotStore);
const isChatBoxOpen = ref(false);
const currentMessage = ref("");
const isTyping = ref(false);
const chatContainer = ref(null);
const errorMessage = ref(null);

const config = useRuntimeConfig();
const {
	data,
	status: _status,
	error: _error,
} = useFetch(`${config.public.apiBaseUrl}/items/chatbox/`, { method: "get" });

const toggleChatBox = () => {
	isChatBoxOpen.value = !isChatBoxOpen.value;
	if (isChatBoxOpen.value) {
		chatbotStore.initialize();
	}
};

const conversation = computed(() => {
	if (chatHistory.value) {
		try {
			const parsed = JSON.parse(chatHistory.value);
			return parsed.conversation || [];
		} catch {
			return [];
		}
	}
	return [];
});

const resetChat = () => {
	chatbotStore.resetChatHistory();
	errorMessage.value = null;
};

const handleChatSend = async (message) => {
	if (!message.trim() || isTyping.value) return;
	
	try {
		const messageToSend = message.trim();
		currentMessage.value = "";
		errorMessage.value = null;
		
		// Add user message to chat history first
		chatbotStore.updateChatHistory("USER", messageToSend);
		isTyping.value = true;
		
		// Get the updated chat history after adding the user message
		// Wait for next tick to ensure store is updated
		await nextTick();
		
		// Parse chat history for the API request
		let historyData = [];
		if (chatHistory.value) {
			try {
				const parsed = typeof chatHistory.value === 'string' 
					? JSON.parse(chatHistory.value) 
					: chatHistory.value;
				historyData = parsed.conversation || [];
			} catch (e) {
				console.error("Error parsing chat history:", e);
				historyData = [];
			}
		}
		
		console.log("Chat history being sent:", historyData);
		
		const response = await $fetch(config.public.chatbotApiUrl, {
			method: "POST",
			body: JSON.stringify({ 
				question: messageToSend,
				chatHistory: historyData
			}),
		});
		
		// Only use the answer from the response
		const answer = response.answer || response;
		chatbotStore.updateChatHistory("AI", answer);
	} catch (error) {
		errorMessage.value = "Sorry, I encountered an error. Please try again.";
		console.error("Chat error:", error);
		// Revert the user message from chat history on error
		const chatHistoryCookie = useCookie("chatHistory");
		if (chatHistoryCookie.value) {
			try {
				const parsed = typeof chatHistoryCookie.value === 'string' 
					? JSON.parse(chatHistoryCookie.value) 
					: chatHistoryCookie.value;
				if (parsed.conversation && parsed.conversation.length > 0) {
					const lastMessage = parsed.conversation[parsed.conversation.length - 1];
					if (lastMessage && lastMessage.role === "USER") {
						parsed.conversation.pop();
						chatHistoryCookie.value = parsed;
						chatbotStore.chatHistory = JSON.stringify(parsed);
					}
				}
			} catch (e) {
				console.error("Error reverting chat history:", e);
			}
		}
	} finally {
		isTyping.value = false;
	}
};

const allowMessageSend = computed(() => {
	return (
		(currentMessage.value.trim() !== "") &&
		(currentMessage.value.trim().length < 300) &&
		!isTyping.value
	);
});

const remainingChars = computed(() => {
	return 300 - currentMessage.value.length;
});

const chatBoxTitle = computed(() => {
	return data?.value?.data ? data.value.data.title : "Scholarly Bot";
});

const aiImage = computed(() => {
	return data?.value?.data?.ai_image || null;
});

const userImage = computed(() => {
	return data?.value?.data?.user_image || null;
});

const handleKeyDown = (event) => {
	if (event.key === "Enter" && !event.shiftKey) {
		event.preventDefault();
		if (allowMessageSend.value) {
			handleChatSend(currentMessage.value);
		}
	}
};

onMounted(() => {
	watchEffect(() => {
		isTyping.value;
		isChatBoxOpen.value;
		nextTick(() => {
			if (chatContainer.value) {
				chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
			}
		});
	});
});
</script>

<template>
    <div>
        <button 
            v-if="!isChatBoxOpen" 
            @click="toggleChatBox"
            class="z-40 fixed right-3 bottom-3 w-auto flex items-end justify-end"
            aria-label="Open chat">
            <div
                class="w-16 sm:w-20 h-16 sm:h-20 bg-gray-200 dark:bg-gray-800 rounded-full ring-1 ring-gray-400 dark:ring-gray-600 hover:ring-gray-400 dark:hover:ring-gray-500 flex items-center justify-center shadow-xl transition-transform duration-200 ease-in-out hover:scale-110 hover:bg-gray-300 dark:hover:bg-gray-700">
                <svg class="w-8 sm:w-10 h-8 sm:h-10 text-gray-800 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M4 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1v2a1 1 0 0 0 1.707.707L9.414 13H15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Z"
                        clip-rule="evenodd" />
                    <path fill-rule="evenodd"
                        d="M8.023 17.215c.033-.03.066-.062.098-.094L10.243 15H15a3 3 0 0 0 3-3V8h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1v2a1 1 0 0 1-1.707.707L14.586 18H9a1 1 0 0 1-.977-.785Z"
                        clip-rule="evenodd" />
                </svg>
            </div>
        </button>
        <div 
            v-else
            class="z-40 fixed right-2 bottom-2 w-full max-w-xs sm:max-w-sm px-4 pt-4 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 flex flex-col transition-all duration-300 ease-in-out"
            role="dialog"
            aria-label="Chat window">
            <div class="flex items-center justify-between my-2">
                <div class="flex flex-row gap-2 items-center">
                    <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">{{ chatBoxTitle }}</h5>
                    <button 
                        @click="resetChat"
                        class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                        aria-label="Reset conversation">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4" />
                        </svg>
                    </button>
                </div>
                <button 
                    @click="toggleChatBox"
                    class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                    aria-label="Close chat">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </div>

            <div class="flex-1 border-t-2">
                <div ref="chatContainer" class="flex flex-col gap-3 overflow-y-auto h-[45vh] my-2 scroll-smooth">
                    <div v-if="conversation.length === 0" class="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-sm px-4">
                        <p class="text-center">Start a conversation by sending a message below.</p>
                    </div>
                    <div v-for="(chat, index) in conversation" :key="index">
                        <div v-if="chat.role === 'AI'" class="flex items-start gap-2.5">
                            <img 
                                v-if="aiImage"
                                class="w-8 h-8 rounded-full flex-shrink-0"
                                :src="`${config.public.apiBaseUrl}/assets/${aiImage}/?quality=85&format=webp`"
                                loading="lazy" 
                                alt="AI Image"
                                @error="$event.target.style.display='none'">
                            <div
                                class="w-auto max-w-[12rem] sm:max-w-[16rem] flex flex-col leading-1.5 px-3 py-1 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                <div class="flex items-center space-x-2 rtl:space-x-reverse">
                                    <span class="text-sm font-semibold text-gray-900 dark:text-white">AI</span>
                                </div>
                                <div v-html="chat.message" style="font-size: 0.75rem;"
                                    class="no-tailwindcss-base text-gray-900 dark:text-white break-words">
                                </div>
                            </div>
                        </div>
                        <div v-else class="flex items-start gap-2.5 justify-end mr-1">
                            <div
                                class="w-auto max-w-[12rem] sm:max-w-[16rem] flex flex-col leading-1.5 px-3 py-1 border-gray-200 bg-blue-500 text-white rounded-s-xl rounded-ee-xl">
                                <div class="flex items-center space-x-2 rtl:space-x-reverse justify-end">
                                    <span class="text-sm font-semibold">You</span>
                                </div>
                                <p style="font-size: 0.75rem;" class="no-tailwindcss-base break-words">
                                    {{ chat.message }}
                                </p>
                            </div>
                            <img 
                                v-if="userImage"
                                class="w-8 h-8 rounded-full flex-shrink-0"
                                :src="`${config.public.apiBaseUrl}/assets/${userImage}/?quality=85&format=webp`"
                                loading="lazy" 
                                alt="User image"
                                @error="$event.target.style.display='none'">
                        </div>
                    </div>
                </div>
                <div v-if="isTyping" class="w-full flex items-center justify-center gap-2.5 mb-1">
                    <div class="flex space-x-1 p-3 bg-gray-100 dark:bg-gray-700 rounded-xl rounded-es-xl">
                        <span
                            class="w-2 h-2 bg-gray-500 dark:bg-white rounded-full animate-bounce [animation-delay:0s]"></span>
                        <span
                            class="w-2 h-2 bg-gray-500 dark:bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span
                            class="w-2 h-2 bg-gray-500 dark:bg-white rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                </div>
                <div v-if="errorMessage" class="w-full flex items-center justify-center gap-2.5 mb-1">
                    <div class="p-3 bg-red-100 dark:bg-red-900 rounded-xl text-red-700 dark:text-red-300 text-sm max-w-[85%]">
                        {{ errorMessage }}
                    </div>
                </div>
            </div>

            <div class="mt-auto mb-1">
                <div class="w-full flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <textarea 
                        v-model="currentMessage" 
                        id="chat" 
                        rows="1"
                        @keydown="handleKeyDown"
                        class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Your message..."
                        :disabled="isTyping"
                        style="resize: none; overflow-y: auto; min-height: 4rem; max-height: 8rem;"></textarea>
                    <button 
                        @click="handleChatSend(currentMessage)" 
                        :disabled="!allowMessageSend" 
                        class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer 
        hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600 
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                        aria-label="Send message">
                        <svg class="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path
                                d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                        </svg>
                    </button>
                </div>
                <div class="flex justify-between items-center px-3 mt-1">
                    <span 
                        class="text-xs text-gray-500 dark:text-gray-400"
                        :class="{ 'text-red-500 dark:text-red-400': remainingChars < 20 }"
                    >
                        {{ remainingChars }}/300
                    </span>
                    <span class="text-xs text-gray-400 dark:text-gray-500">
                        Press Enter to send
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>