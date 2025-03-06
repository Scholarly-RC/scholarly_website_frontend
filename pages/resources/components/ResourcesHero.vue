<script setup>
const config = useRuntimeConfig()
const { data, status, error } = useFetch(`${config.public.apiBaseUrl}/items/resources_hero_section/`, { method: "get" })
</script>

<template>
    <section class="bg-white dark:bg-gray-900">
        <div class="pb-1 px-4 mx-auto max-w-screen-lg pt-10 lg:px-6">
            <div v-if="status === 'pending'" class="mx-auto max-w-screen-md text-center mb-8 lg:mb-12 animate-pulse">
                <div class="mb-4 h-10 w-3/4 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div class="mb-5 h-6 w-5/6 mx-auto bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
            <div v-else class="mx-auto max-w-screen-md text-center lg:px-6 lg:mb-5">
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{{ data.data.title
                }}</h2>
                <p class="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">{{ data.data.description }}</p>
            </div>
        </div>
    </section>
</template>