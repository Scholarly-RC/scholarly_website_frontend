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
                    <span class="material-symbols-outlined text-white me-2">
                        {{ data.data.icon }}
                    </span>
                    {{ data.data.name }}
                </button>
            </div>
        </div>
    </section>
</template>