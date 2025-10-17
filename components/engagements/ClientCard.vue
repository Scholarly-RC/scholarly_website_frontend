<script setup>
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";

const config = useRuntimeConfig();
const props = defineProps({
	client: Object,
});

const imageIds = ref([]);
const isFullscreenOpen = ref(false);

const getImagesId = async () => {
	const ids = [];
	for (let index = 0; index < props.client.images.length; index++) {
		const data = await $fetch(
			`${config.public.apiBaseUrl}/items/client_engagements_items_files/${props.client.images[index]}`,
		);
		ids.push(data?.data.directus_files_id);
	}
	imageIds.value = ids;
};

const openFullscreen = () => {
	isFullscreenOpen.value = true;
	document.body.style.overflow = "hidden";
};

const closeFullscreen = () => {
	isFullscreenOpen.value = false;
	document.body.style.overflow = "";
};

onMounted(() => {
	getImagesId();
});
</script>
<template>
  <div v-show="props.client.status === 'published'">
    <div v-if="imageIds.length > 0" class="flex flex-col items-center justify-center">
      <div
        class="w-60 h-60 p-2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 relative overflow-hidden group">
        <img
          class="w-full h-full object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-110"
          :src="`${config.public.apiBaseUrl}/assets/${imageIds[0]}/?quality=85&format=webp`" loading="lazy"
          :alt="`About Page Image 1`" />
        <div
          class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button @click="openFullscreen"
            class="px-6 py-2 bg-white text-gray-800 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors duration-300">
            View More
          </button>
        </div>
      </div>
      <h2 class="my-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white text-center">
        {{ props.client.title }}
      </h2>
      <p class="mb-5 font-light text-gray-500 dark:text-gray-400 text-center">
        {{ props.client.description }}
      </p>
    </div>
    <div v-else class="w-60 h-60">
      <div
        class="w-full p-4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 relative overflow-hidden group">
        <div class="w-full h-48 bg-gray-300 rounded-lg animate-pulse"></div>
      </div>
      <div class="my-2 h-6 bg-gray-300 rounded animate-pulse"></div>
      <div class="mb-5 h-4 bg-gray-300 rounded animate-pulse"></div>
    </div>
    <div>
      <div v-if="isFullscreenOpen"
        class="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4">
        <button @click="closeFullscreen"
          class="z-50 cursor-pointer absolute top-6 right-6 p-3 bg-white/90 text-gray-800 rounded-full shadow-lg dark:bg-gray-700/90 dark:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="relative w-full h-full flex items-center justify-center">
          <Carousel class="w-full h-full">
            <CarouselContent class="h-full">
              <CarouselItem v-for="(imageId, index) in imageIds" :key="imageId"
                class="flex items-center justify-center h-full">
                <div class="w-80 h-[40rem] md:w-[30rem] md:h-[45rem]">
                  <img class="w-full h-full object-cover rounded-lg"
                    :src="`${config.public.apiBaseUrl}/assets/${imageId}/?quality=85&format=webp`"
                    :alt="`Fullscreen Image ${index + 1}`" loading="lazy" />
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious class="left-4 md:left-8" />
            <CarouselNext class="right-4 md:right-8" />
          </Carousel>
        </div>
      </div>
    </div>
  </div>
</template>
