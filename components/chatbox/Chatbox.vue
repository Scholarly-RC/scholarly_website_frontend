<script setup>
const chatbotStore = useChatbotStore()
const { chatHistory } = storeToRefs(chatbotStore)
const isChatBoxOpen = ref(false)
const currentMessage = ref("")
const isTyping = ref(false)
const chatContainer = ref(null)

const config = useRuntimeConfig()
const { data, status, error } = useFetch(`${config.public.apiBaseUrl}/items/chatbox/`, { method: "get" })


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
            class="z-50 fixed right-3 bottom-3 w-auto flex items-end justify-end">
            <div
                class="w-16 sm:w-20 h-16 sm:h-20 bg-gray-200 dark:bg-gray-800 rounded-full ring-2 ring-gray-400 dark:ring-gray-600 hover:ring-blue-500 dark:hover:ring-blue-400 flex items-center justify-center shadow-xl transition-transform duration-200 ease-in-out hover:scale-110 hover:bg-gray-300 dark:hover:bg-gray-700">
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
        <div v-else
            class="z-50 fixed right-2 bottom-2 w-full max-w-sm px-4 pt-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col">
            <div class="flex items-center justify-between my-2">
                <div class="flex flex-row gap-2 items-center">
                    <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">{{ chatBoxTitle }}</h5>
                    <button @click="resetChat"
                        class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4" />
                        </svg>
                    </button>
                </div>
                <button @click="toggleChatBox"
                    class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                </button>
            </div>

            <div class="flex-1 border-t-2">
                <div ref="chatContainer" class="flex flex-col gap-3 overflow-y-auto h-[45vh] my-2">
                    <div v-for="(chat, index) in conversation" :key="index">
                        <div v-if="chat.role === 'AI'" class="flex items-start gap-2.5">
                            <img class="w-8 h-8 rounded-full"
                                :src="`${config.public.apiBaseUrl}/assets/${data.data.ai_image}/?quality=85&format=webp`"
                                alt="AI Image">
                            <div
                                class="me-2 flex flex-col w-auto max-w-lg leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                <div class="flex items-center space-x-2 rtl:space-x-reverse">
                                    <span class="text-sm font-semibold text-gray-900 dark:text-white">AI</span>
                                </div>
                                <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                                    {{ chat.message }}
                                </p>
                            </div>
                        </div>
                        <div v-else class="flex items-start gap-2.5 justify-end mr-1">
                            <div
                                class="flex flex-col w-auto max-w-lg leading-1.5 p-4 border-gray-200 bg-blue-500 text-white rounded-s-xl rounded-ee-xl">
                                <div class="flex items-center space-x-2 rtl:space-x-reverse justify-end">
                                    <span class="text-sm font-semibold">You</span>
                                </div>
                                <p class="text-sm font-normal py-2.5">
                                    {{ chat.message }}
                                </p>
                            </div>
                            <img class="w-8 h-8 rounded-full"
                                :src="`${config.public.apiBaseUrl}/assets/${data.data.user_image}/?quality=85&format=webp`"
                                alt="User image">
                        </div>
                    </div>
                </div>
                <div v-if="isTyping" class="w-full flex items-center justify-center gap-2.5">
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
                        <svg class="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                            <path
                                d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>