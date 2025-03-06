<script setup>
import BookCard from './BookCard.vue';
const config = useRuntimeConfig()
const { data, status, error } = useFetch(`${config.public.apiBaseUrl}/items/resources_items/`, { method: "get" })
</script>

<template>
    <section class="bg-white dark:bg-gray-900">
        <div v-if="status === 'success'" class="py-8 px-4 mx-auto max-w-screen-lg lg:pb-10 lg:pt-5 lg:px-6">
            <div class="space-y-8 grid grid-cols-1 lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                <div class="w-full sm:w-[20rem] flex flex-col items-center animate-pulse">
                    <div class="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full mb-1"></div>
                    <div
                        class="relative flex flex-col p-1 mx-auto w-[20rem] h-[25rem] max-w-md bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow">
                        <div class="w-full h-full bg-gray-300 dark:bg-gray-600"></div>
                    </div>
                </div>
                <div class="w-full sm:w-[20rem] flex flex-col items-center animate-pulse">
                    <div class="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full mb-1"></div>
                    <div
                        class="relative flex flex-col p-1 mx-auto w-[20rem] h-[25rem] max-w-md bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow">
                        <div class="w-full h-full bg-gray-300 dark:bg-gray-600"></div>
                    </div>
                </div>
                <div class="w-full sm:w-[20rem] flex flex-col items-center animate-pulse">
                    <div class="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full mb-1"></div>
                    <div
                        class="relative flex flex-col p-1 mx-auto w-[20rem] h-[25rem] max-w-md bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 shadow">
                        <div class="w-full h-full bg-gray-300 dark:bg-gray-600"></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="py-8 px-4 mx-auto max-w-screen-lg lg:pb-10 lg:pt-5 lg:px-6">
            <div class="space-y-8 grid grid-cols-1 lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                <BookCard v-for="item in data.data" :key="item.id" :book="item" />
            </div>
        </div>
    </section>
</template>