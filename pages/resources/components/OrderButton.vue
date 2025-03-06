<script setup>
const scrollStore = useScrollStore()
const config = useRuntimeConfig()
const { data, status, error } = useFetch(`${config.public.apiBaseUrl}/items/resource_order_button/`, { method: "get" })
</script>
<template>
    <section class="bg-white dark:bg-gray-900">
        <div class="pb-1 px-4 mx-auto max-w-screen-lg pt-10 lg:px-6 flex justify-center">
            <div v-if="status === 'pending'">
                <button
                    class="px-6 py-3.5 text-base font-medium text-gray-400 inline-flex items-center bg-gray-300 rounded-lg animate-pulse">
                    <div class="w-20 h-4 bg-gray-400 rounded"></div>
                </button>
            </div>
            <div v-else>
                <button v-show="data?.data?.status === 'published'" @click="scrollStore.scrollToContact" type="button"
                    class="px-6 py-3.5 text-base font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="w-6 h-6 me-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
                    </svg>
                    {{ data.data.name }}
                </button>
            </div>
        </div>
    </section>
</template>