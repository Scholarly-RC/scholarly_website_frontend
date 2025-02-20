<script setup>
import FeatureItems from './FeatureItems.vue';

const config = useRuntimeConfig()
const { data, status, error } = useFetch(`${config.public.apiBaseUrl}/items/feature_header/`, { method: "get" })
</script>

<template>
    <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-lg sm:py-16 lg:px-6">
            <div v-if="status === 'success' && data?.data" class="max-w-screen-md mb-8 lg:mb-16">
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{{
                    data?.data?.title }}</h2>
                <p class="text-gray-500 sm:text-xl dark:text-gray-400">{{ data?.data?.description }}</p>
            </div>
            <div v-else class="max-w-screen-md mb-8 lg:mb-16 animate-pulse">
                <div class="h-10 w-3/4 bg-gray-400 rounded mb-4"></div>
                <div class="h-6 w-full bg-gray-300 rounded"></div>
            </div>
            <FeatureItems />
        </div>
    </section>
</template>