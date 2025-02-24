<script setup>
const config = useRuntimeConfig()
const { data, status, error } = useFetch(`${config.public.apiBaseUrl}/items/careers_hero_section/`, { method: "get" })
</script>

<template>
    <section class="bg-white dark:bg-gray-900">
        <div v-if="status === 'pending'"
            class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-lg md:grid md:grid-cols-2 sm:py-16 lg:px-6">
            <div class="mt-4 md:mt-0">
                <div class="mb-4 h-10 w-3/4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                <div class="mb-6 h-6 w-full bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                <div class="h-6 w-5/6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
            </div>
            <div class="w-full h-64 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        </div>
        <div v-else>
            <div v-show="data?.data?.status === 'published'"
                class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-lg xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                <div class="mt-4 md:mt-0">
                    <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        {{ data.data.title }}
                    </h2>
                    <p class="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">{{ data.data.description }}
                    </p>
                </div>
                <img class="w-full rounded-lg" :src="`${config.public.apiBaseUrl}/assets/${data.data.image}/`"
                    loading="lazy" alt="Careers Hero Image">
            </div>
        </div>
    </section>
</template>