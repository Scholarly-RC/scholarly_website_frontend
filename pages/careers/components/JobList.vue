<script setup>
const config = useRuntimeConfig()
const { data, status, error } = useFetch(`${config.public.apiBaseUrl}/items/careers_opening_items/`, { method: "get" })
</script>

<template>
    <div>
        <div v-if="status === 'pending'">
            <div class="grid gap-8 lg:grid-cols-2">
                <div v-for="index in 3" :key="index"
                    class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div class="flex justify-end items-center mb-5">
                        <div class="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                    <div class="mb-2 h-8 w-3/4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div class="mb-5 h-6 w-full bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                    <div class="mb-2 h-6 w-5/6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
                    <div class="mt-4 flex justify-between items-center">
                        <div class="flex items-center space-x-4">
                            <div class="w-7 h-7 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
                            <div class="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                        </div>
                        <div class="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="grid gap-4 lg:gap-8 lg:grid-cols-2">
                <div v-for="(opening, index) in data?.data" :key="index">
                    <div v-show="opening.status === 'published'">
                        <div
                            class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <div class="flex justify-end items-center mb-2 text-gray-500">
                                <span class="text-sm"> {{ $dayjs(opening.date_created).fromNow() }}</span>
                            </div>
                            <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{
                                opening.job_title }}</h2>
                            <ul class="space-y-2 text-left text-gray-500 dark:text-gray-400">
                                <li v-for="(qualification, index) in opening.qualifications" :key="index"
                                    class="flex items-center space-x-3">
                                    <svg class="shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 16 12">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
                                    </svg>
                                    <span>{{ qualification.info }}</span>
                                </li>
                            </ul>
                            <h2 class="mt-2 text-md font-medium text-gray-900 dark:text-white">{{
                                opening.instruction }}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>