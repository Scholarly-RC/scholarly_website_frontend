<script setup>
const config = useRuntimeConfig();

const props = defineProps({
    imageId: String,
    index: Number
})

const isLoading = ref(true)
</script>
<template>
    <div>
        <div v-if="isLoading"
            class="flex justify-center items-center p-10 mx-auto mb-2 w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg shadow-md">
            <Icon name="heroicons:photo" class="w-20 h-20 text-gray-600 dark:text-gray-300" />
        </div>
        <NuxtImg class="mx-auto mb-2 w-full h-full" :class="{ 'opacity-0': isLoading }"
            :src="`${config.public.apiBaseUrl}/assets/${imageId}`" :quality="85"
            format="webp" loading="lazy"
            :alt="`Service Info ${index}`" @load="isLoading = false"
            preset="thumbnail" />
    </div>
</template>