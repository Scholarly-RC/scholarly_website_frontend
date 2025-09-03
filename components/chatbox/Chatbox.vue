<script setup>
const chatbotStore = useChatbotStore()
const { chatHistory } = storeToRefs(chatbotStore)
const isChatBoxOpen = ref(false)
const currentMessage = ref("")
const isTyping = ref(false)
const chatContainer = ref(null)
const sessionId = ref("")
const errorMessage = ref("")
const isInitialTyping = ref(false)

const config = useRuntimeConfig()
const { data, status, error } = useFetch(`${config.public.apiBaseUrl}/items/chatbox/`, { method: "get", server: true })


const toggleChatBox = () => {
    isChatBoxOpen.value = !isChatBoxOpen.value
    if (isChatBoxOpen.value) {
        chatbotStore.initialize()
        if (!sessionId.value) {
            sessionId.value = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            // Show typing animation for initial message
            isInitialTyping.value = true
            setTimeout(() => {
                isInitialTyping.value = false
            }, 2000) // 2 second typing animation
        }
    }
}

const conversation = computed(() => {
    if (chatHistory.value) {
        return JSON.parse(chatHistory.value).conversation
    }
    return {}
})

const resetChat = () => {
    chatbotStore.resetChatHistory()
    sessionId.value = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` // Generate new session ID
}

const handleChatSend = async (message) => {
    try {
        currentMessage.value = ""
        chatbotStore.updateChatHistory("USER", message)
        isTyping.value = true

        // Simulate typing delay for better UX (based on message length)
        const baseDelay = 1000
        const lengthBonus = Math.min(message.length * 50, 2000) // Max 2 seconds bonus
        const randomDelay = Math.random() * 1000
        await new Promise(resolve => setTimeout(resolve, baseDelay + lengthBonus + randomDelay))

        const response = await $fetch(config.public.chatWebhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: message,
                session_id: sessionId.value
            }),
        });
        isTyping.value = false
        chatbotStore.updateChatHistory("AI", response.response)
    } catch (error) {
        console.error("Chat error:", error)
        isTyping.value = false
        errorMessage.value = "Sorry, I'm having trouble responding right now. Please try again later."
        chatbotStore.updateChatHistory("AI", errorMessage.value)
        // Clear error after 5 seconds
        setTimeout(() => {
            errorMessage.value = ""
        }, 5000)
    }
}

const allowMessageSend = computed(() => {
    return currentMessage.value.trim() !== '' && currentMessage.value.trim().length < 300
})

const chatBoxTitle = computed(() => {
    return data?.value?.data ? data.value.data.title : "Scholarly Bot"
})

onMounted(() => {
    watchEffect(() => {
        isTyping.value
        isInitialTyping.value
        isChatBoxOpen.value
        nextTick(() => {
            if (chatContainer.value) {
                chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
            }
        })
    })
})
</script>

<template>
    <div>
        <button v-if="!isChatBoxOpen" @click="toggleChatBox" aria-label="Open chat"
            class="z-40 fixed right-4 bottom-4 w-auto flex items-end justify-end group">
            <div
                class="w-14 sm:w-16 h-14 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-full ring-2 ring-white dark:ring-gray-800 shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 active:scale-95">
                <Icon name="heroicons:chat-bubble-left-right"
                    class="w-7 sm:w-8 h-7 sm:h-8 text-white transition-transform duration-200 group-hover:rotate-12" />
            </div>
            <!-- Tooltip -->
            <div
                class="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Chat with us
            </div>
        </button>
        <div v-else
            class="z-40 fixed right-4 bottom-4 w-full max-w-xs sm:max-w-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl flex flex-col animate-in slide-in-from-bottom-4 fade-in duration-300"
            style="max-height: 80vh;">
            <div class="flex items-center justify-between p-4 pb-2">
                <div class="flex items-center gap-3">
                    <div
                        class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <Icon name="heroicons:chat-bubble-left-right" class="w-4 h-4 text-white" />
                    </div>
                    <h5 class="text-lg font-semibold text-gray-900 dark:text-white">{{ chatBoxTitle }}</h5>
                </div>
                <div class="flex items-center gap-1">
                    <button @click="resetChat" aria-label="Reset chat"
                        class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-105">
                        <Icon name="heroicons:arrow-path" class="w-5 h-5" />
                    </button>
                    <button @click="toggleChatBox" aria-label="Close chat"
                        class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-105">
                        <Icon name="heroicons:x-mark" class="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div class="flex-1 border-t border-gray-200 dark:border-gray-600">
                <div ref="chatContainer" class="flex flex-col gap-4 overflow-y-auto h-[45vh] p-4 scroll-smooth"
                    style="scrollbar-width: thin; scrollbar-color: rgb(156 163 175) transparent;">
                    <!-- Initial typing animation -->
                    <div v-if="isInitialTyping"
                        class="w-full flex items-center justify-start gap-3 mb-2 animate-in slide-in-from-bottom-2 fade-in duration-300">
                        <div
                            class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                            <Icon name="heroicons:cpu-chip" class="w-4 h-4 text-white" />
                        </div>
                        <div
                            class="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-md shadow-sm">
                            <div class="flex space-x-1">
                                <span
                                    class="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0s]"></span>
                                <span
                                    class="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                <span
                                    class="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                            </div>
                        </div>
                    </div>
                    <!-- Welcome message when no conversation and not typing -->
                    <div v-else-if="!conversation || conversation.length === 0" class="text-center py-8">
                        <div
                            class="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                            <Icon name="heroicons:chat-bubble-left-right" class="w-6 h-6 text-white" />
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Hi! I'm here to help. How can I assist you
                            today?</p>
                    </div>
                    <div v-for="(chat, index) in conversation" :key="index"
                        class="animate-in slide-in-from-bottom-2 fade-in duration-300"
                        :style="{ animationDelay: `${index * 100}ms` }">
                        <div v-if="chat.role === 'AI'" class="flex items-start gap-3">
                            <div
                                class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                                <Icon name="heroicons:cpu-chip" class="w-4 h-4 text-white" />
                            </div>
                            <div
                                class="w-auto max-w-[14rem] sm:max-w-[18rem] flex flex-col leading-1.5 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-md shadow-sm">
                                <div class="flex items-center space-x-2 rtl:space-x-reverse mb-1">
                                    <span class="text-xs font-semibold text-gray-900 dark:text-white">{{ chatBoxTitle
                                        }}</span>
                                </div>
                                <div v-html="chat.message" style="font-size: 0.8rem; line-height: 1.4;"
                                    class="no-tailwindcss-base text-gray-900 dark:text-white break-words">
                                </div>
                            </div>
                        </div>
                        <div v-else class="flex items-start gap-3 justify-end">
                            <div
                                class="w-auto max-w-[14rem] sm:max-w-[18rem] flex flex-col leading-1.5 px-4 py-2 bg-blue-500 text-white rounded-2xl rounded-tr-md shadow-sm">
                                <div class="flex items-center space-x-2 rtl:space-x-reverse justify-end mb-1">
                                    <span class="text-xs font-semibold">You</span>
                                </div>
                                <p style="font-size: 0.8rem; line-height: 1.4;" class="no-tailwindcss-base break-words">
                                    {{ chat.message }}
                                </p>
                            </div>
                            <div
                                class="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center flex-shrink-0">
                                <Icon name="heroicons:user" class="w-4 h-4 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="isTyping"
                    class="p-4 w-full flex items-center justify-start gap-3 mb-2 animate-in slide-in-from-bottom-2 fade-in duration-300">
                    <div
                        class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <Icon name="heroicons:cpu-chip" class="w-4 h-4 text-white" />
                    </div>
                    <div
                        class="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-md shadow-sm">
                        <div class="flex space-x-1">
                            <span class="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0s]"></span>
                            <span class="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                            <span class="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                        </div>
                    </div>
                </div>
                <div v-if="errorMessage"
                    class="w-full flex items-center justify-center mb-2 animate-in slide-in-from-bottom-2 fade-in duration-300">
                    <div
                        class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl text-sm shadow-sm">
                        <Icon name="heroicons:exclamation-triangle" class="w-4 h-4 inline mr-2" />
                        {{ errorMessage }}
                    </div>
                </div>
            </div>

            <div class="mt-auto">
                <div
                    class="w-full flex items-end gap-2 px-3 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                    <textarea v-model="currentMessage" id="chat" rows="1"
                        class="flex-1 p-3 text-sm text-gray-900 bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-600  dark:placeholder-gray-400 dark:text-white resize-none transition-all duration-200"
                        placeholder="Type your message..."
                        style="min-height: 2.5rem; max-height: 6rem; overflow-y: auto;"
                        @keydown.enter.exact.prevent="handleChatSend(currentMessage)"></textarea>
                    <button @click="handleChatSend(currentMessage)" :disabled="!allowMessageSend"
                        aria-label="Send message"
                        class="self-end p-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-sm flex items-center justify-center"
                        style="min-height: 2.5rem;">
                        <Icon name="heroicons:paper-airplane" class="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>