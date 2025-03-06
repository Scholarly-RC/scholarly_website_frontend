<script setup>
const config = useRuntimeConfig()
const props = defineProps({
    client: Object
})

const imageIds = ref([])
const isFullscreenOpen = ref(false);
const currentImageIndex = ref(0);

const getImagesId = async () => {
    let ids = []
    for (let index = 0; index < props.client.images.length; index++) {
        const data = await $fetch(`${config.public.apiBaseUrl}/items/client_engagements_items_files/${props.client.images[index]}`)
        ids.push(data?.data.directus_files_id)
    }
    imageIds.value = ids
}

const openFullscreen = (index) => {
    currentImageIndex.value = index;
    isFullscreenOpen.value = true;
    document.body.style.overflow = 'hidden';
};

const closeFullscreen = () => {
    isFullscreenOpen.value = false;
    document.body.style.overflow = '';
};

const prevImage = () => {
    if (currentImageIndex.value > 0) {
        currentImageIndex.value--;
    } else {
        currentImageIndex.value = imageIds.value.length - 1;
    }
};

const nextImage = () => {
    if (currentImageIndex.value < imageIds.value.length - 1) {
        currentImageIndex.value++;
    } else {
        currentImageIndex.value = 0;
    }
};

onMounted(() => {
    getImagesId()
})
</script>
<template>
    <div v-show="props.client.status === 'published'">
        <div v-show="imageIds.length > 0">
            <div
                class="w-full p-4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 relative overflow-hidden group">
                <img class="w-full h-auto rounded-lg transform transition-transform duration-300 group-hover:scale-125"
                    :src="`${config.public.apiBaseUrl}/assets/${imageIds[0]}/?quality=85&format=webp`" loading="lazy"
                    :alt="`About Page Image 1`">
                <div
                    class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button @click="openFullscreen(0)"
                        class="px-6 py-2 bg-white text-gray-800 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors duration-300">
                        View More
                    </button>
                </div>
            </div>
            <h2 class="my-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ props.client.title }}
            </h2>
            <p class="mb-5 font-light text-gray-500 dark:text-gray-400">{{ props.client.description }}</p>
        </div>
        <div>
            <div v-if="isFullscreenOpen"
                class="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4">
                <button @click="closeFullscreen"
                    class="z-50 cursor-pointer absolute top-6 right-6 p-3 bg-white/90 text-gray-800 rounded-full shadow-lg dark:bg-gray-700/90 dark:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div class="relative w-full h-full flex items-center justify-center">
                    <button @click="prevImage"
                        class="absolute left-4 md:left-8 p-3 bg-white/90 text-gray-800 rounded-full shadow-lg dark:bg-gray-700/90 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <img class="w-full max-w-screen-sm max-h-full rounded-lg shadow-2xl"
                        :src="`${config.public.apiBaseUrl}/assets/${imageIds[currentImageIndex]}/?quality=85&format=webp`"
                        :alt="`Fullscreen Image ${currentImageIndex + 1}`">

                    <button @click="nextImage"
                        class="absolute right-4 md:right-8 p-3 bg-white/90 text-gray-800 rounded-full shadow-lg dark:bg-gray-700/90 dark:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>