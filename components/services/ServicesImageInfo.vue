<script setup>
const config = useRuntimeConfig();

const props = defineProps({
	imageId: String,
	index: Number,
});

const isLoading = ref(true);
</script>
<template>
    <div>
        <div v-if="isLoading"
            class="flex justify-center items-center p-10 mx-auto mb-2 w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg shadow-md">
            <svg class="w-20 h-20 text-gray-600 dark:text-gray-300" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
            </svg>
        </div>
        <img class="mx-auto mb-2 w-full h-full" :class="{ 'opacity-0': isLoading }"
            :src="`${config.public.apiBaseUrl}/assets/${imageId}/?quality=85&format=webp`" loading="lazy"
            :alt="`Service Info ${index}`" @load="isLoading = false" />
    </div>
</template>