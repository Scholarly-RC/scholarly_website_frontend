<script setup>
const config = useRuntimeConfig()
const { data, status, error } = useFetch(`${config.public.apiBaseUrl}/items/engagements_hero_section/`, { method: "get" })
</script>

<template>
    <div class="mx-auto max-w-screen-lg py-16 px-4">
        <div v-if="status === 'pending'" class="mx-auto max-w-screen-lg text-center mb-8 lg:mb-12 animate-pulse">
            <div
                class="relative h-64 w-full bg-gray-300 dark:bg-gray-700 rounded-3xl flex flex-col items-center justify-center">
                <div class="mb-4 h-10 w-3/4 bg-gray-400 dark:bg-gray-600 rounded"></div>
                <div class="h-6 w-5/6 bg-gray-400 dark:bg-gray-600 rounded"></div>
            </div>
        </div>
        <div v-else
            class="relative mx-auto shadow-lg max-w-screen-lg text-center lg:p-16 lg:mb-5 bg-cover bg-center rounded-3xl"
            :style="`background-image: url('${config.public.apiBaseUrl}/assets/${data.data?.image}/?quality=85&format=webp');`">
            <div class="inline-block px-6 py-4 bg-black bg-opacity-50 rounded-3xl">
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-white">{{ data.data.title }}</h2>
                <p class="mb-5 font-semibold text-white sm:text-xl">{{ data.data.description }}</p>
            </div>
        </div>
    </div>
</template>