<script setup>
const config = useRuntimeConfig()
const { data, status, error } = useFetch(`${config.public.apiBaseUrl}/items/services_hero_section/`, { method: "get" })
</script>
<template>
    <section class="bg-white dark:bg-gray-900">
        <div
            class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-lg xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
            <img class="w-full" :src="`${config.public.apiBaseUrl}/assets/${data?.data?.image}/`" alt="dashboard image">
            <div class="mt-4 md:mt-0">
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{{
                    data?.data?.title }}
                </h2>
                <p class="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">{{ data?.data?.description }}</p>
            </div>
        </div>
    </section>
</template>