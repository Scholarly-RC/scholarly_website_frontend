<script setup>
const chatbotStore = useChatbotStore()
const { chatHistory } = storeToRefs(chatbotStore)
const isChatBoxOpen = ref(false)
const currentMessage = ref("")
const isTyping = ref(false)
const chatContainer = ref(null)

const config = useRuntimeConfig()
const { data, status, error } = useFetch(`${config.public.apiBaseUrl}/items/chatbox/`, { method: "get", server: true })


const toggleChatBox = () => {
    isChatBoxOpen.value = !isChatBoxOpen.value
    if (isChatBoxOpen.value) {
        chatbotStore.initialize()
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
}

const handleChatSend = async (message) => {
    try {
        currentMessage.value = ""
        chatbotStore.updateChatHistory("USER", message)
        isTyping.value = true
        const data = await $fetch("/api/getResponse", {
            method: "POST",
            body: JSON.stringify({ query: message, chatHistory: chatHistory.value }),
        });
        isTyping.value = false
        chatbotStore.updateChatHistory("AI", data)

        await $fetch("/api/saveChatbotMessages", {
            method: "POST",
            body: JSON.stringify({ query: message, response: data }),
        });
    } catch (error) {
        console.error(error)
    }
}

const allowMessageSend = computed(() => {
    return currentMessage.value.trim() !== '' & currentMessage.value.trim().length < 300
})

const chatBoxTitle = computed(() => {
    return data?.value?.data ? data.value.data.title : "Scholarly Bot"
})

onMounted(() => {
    watchEffect(() => {
        isTyping.value
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
        <button v-if="!isChatBoxOpen" @click="toggleChatBox"
            class="z-40 fixed right-3 bottom-3 w-auto flex items-end justify-end">
            <div
                class="w-16 sm:w-20 h-16 sm:h-20 bg-gray-200 dark:bg-gray-800 rounded-full ring-1 ring-gray-400 dark:ring-gray-600 hover:ring-gray-400 dark:hover:ring-gray-500 flex items-center justify-center shadow-xl transition-transform duration-200 ease-in-out hover:scale-110 hover:bg-gray-300 dark:hover:bg-gray-700">
                <Icon name="heroicons:chat-bubble-left-right" class="w-8 sm:w-10 h-8 sm:h-10 text-gray-800 dark:text-white" />
            </div>
        </button>
        <div v-else
            class="z-40 fixed right-2 bottom-2 w-full max-w-xs sm:max-w-sm px-4 pt-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col">
            <div class="flex items-center justify-between my-2">
                <div class="flex flex-row gap-2 items-center">
                    <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">{{ chatBoxTitle }}</h5>
                    <button @click="resetChat"
                        class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                        <Icon name="heroicons:arrow-path" class="w-6 h-6 text-gray-800 dark:text-white" />
                    </button>
                </div>
                <button @click="toggleChatBox"
                    class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                    <Icon name="heroicons:x-mark" class="w-6 h-6 text-gray-800 dark:text-white" />
                </button>
            </div>

            <div class="flex-1 border-t-2">
                <div ref="chatContainer" class="flex flex-col gap-3 overflow-y-auto h-[45vh] my-2">
                    <div v-for="(chat, index) in conversation" :key="index">
                        <div v-if="chat.role === 'AI'" class="flex items-start gap-2.5">
                             <NuxtImg class="w-8 h-8 rounded-full"
                                 :src="`${config.public.apiBaseUrl}/assets/${data.data.ai_image}`"
                                 :quality="85"
                                 format="webp"
                                 loading="lazy" alt="AI Image"
                                 preset="avatar" />
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
                             <NuxtImg class="w-8 h-8 rounded-full"
                                 :src="`${config.public.apiBaseUrl}/assets/${data.data.user_image}`"
                                 :quality="85"
                                 format="webp"
                                 loading="lazy" alt="User image"
                                 preset="avatar" />
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
            </div>

            <div class="mt-auto mb-1">
                <div class="w-full flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                    <textarea v-model="currentMessage" id="chat" rows="1"
                        class="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Your message..."
                        style="resize: none; overflow-y: auto; min-height: 4rem;"></textarea>
                    <button @click="handleChatSend(currentMessage)" :disabled="!allowMessageSend" class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer 
        hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600 
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent">
                        <Icon name="heroicons:paper-airplane" class="w-5 h-5 rotate-90 rtl:-rotate-90" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>