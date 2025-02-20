<script setup>
const config = useRuntimeConfig()
const darkModeStore = useDarkModeStore()
const { darkMode } = storeToRefs(darkModeStore)
const { data, status, error } = useFetch(`${config.public.apiBaseUrl}/items/footer_description/`, { method: "get" })
</script>

<template>
    <div class="mb-6 md:mb-0">
        <a href="https://flowbite.com" class="flex items-center">
            <img v-if="!darkMode" src="/assets/images/scholarly-logo-light.png" class="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo" />
            <img v-else src="/assets/images/scholarly-logo-dark.png" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
        </a>
        <div v-if="status === 'success' && data?.data" class="flex flex-col gap-2 max-w-sm mt-3">
            <p v-for="description_data in data.data" :key="description_data.id"
                class="text-gray-500 sm:text-md dark:text-gray-400">
                {{ description_data.description }}
            </p>
        </div>
        <div v-else class="flex flex-col gap-2 max-w-sm mt-3 animate-pulse">
            <div v-for="_ in Array(3)" :key="_" class="h-4 w-full bg-gray-300 rounded"></div>
        </div>
    </div>
</template>