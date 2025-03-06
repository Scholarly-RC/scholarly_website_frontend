<script setup>
import ClientCard from './ClientCard.vue'

const config = useRuntimeConfig()
const { data, status, error } = useFetch(`${config.public.apiBaseUrl}/items/client_engagements_items/`, { method: "get" })
</script>

<template>
    <div>
        <div v-if="status === 'pending'" class="grid gap-4 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="index in 3" :key="index">
                <div
                    class="w-full p-4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 relative overflow-hidden group">
                    <div class="w-full h-48 bg-gray-300 rounded-lg animate-pulse"></div>
                </div>
                <div class="my-2 h-6 bg-gray-300 rounded animate-pulse"></div>
                <div class="mb-5 h-4 bg-gray-300 rounded animate-pulse"></div>
            </div>
        </div>
        <div v-else class="grid gap-4 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <ClientCard v-for="client in data.data" :key="client.id" :client="client" />
        </div>
    </div>
</template>