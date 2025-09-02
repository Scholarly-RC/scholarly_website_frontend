<script setup>
const config = useRuntimeConfig();
const props = defineProps({
  client: Object,
});

const imageIds = ref([]);
const isFullscreenOpen = ref(false);
const currentImageIndex = ref(0);
const isImgsLoading = ref(false);
const showImgNav = ref(true);

const getImagesId = async () => {
  let ids = [];
  for (let index = 0; index < props.client.images.length; index++) {
    const data = await $fetch(
      `${config.public.apiBaseUrl}/items/client_engagements_items_files/${props.client.images[index]}`
    );
    ids.push(data?.data.directus_files_id);
  }
  imageIds.value = ids;
};

const toggleImgNav = () => {
  showImgNav.value = !showImgNav.value;
};

const openFullscreen = (index) => {
  currentImageIndex.value = index;
  isFullscreenOpen.value = true;
  document.body.style.overflow = "hidden";
};

const closeFullscreen = () => {
  isFullscreenOpen.value = false;
  document.body.style.overflow = "";
};

const prevImage = () => {
  isImgsLoading.value = true;
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
  } else {
    currentImageIndex.value = imageIds.value.length - 1;
  }
};

const nextImage = () => {
  isImgsLoading.value = true;
  if (currentImageIndex.value < imageIds.value.length - 1) {
    currentImageIndex.value++;
  } else {
    currentImageIndex.value = 0;
  }
};

onMounted(() => {
  getImagesId();
});
</script>
<template>
  <div v-show="props.client.status === 'published'">
    <div
      v-if="imageIds.length > 0"
      class="flex flex-col items-center justify-center"
    >
      <div
        class="w-60 h-60 p-2 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 relative overflow-hidden group"
      >
         <NuxtImg
           class="w-full h-full object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-110"
           :src="`${config.public.apiBaseUrl}/assets/${imageIds[0]}`"
           :quality="85"
           format="webp"
           loading="lazy"
           :alt="`About Page Image 1`"
           preset="thumbnail"
         />
        <div
          class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        >
          <button
            @click="openFullscreen(0)"
            class="px-6 py-2 bg-white text-gray-800 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors duration-300"
          >
            View More
          </button>
        </div>
      </div>
      <h2
        class="my-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white text-center"
      >
        {{ props.client.title }}
      </h2>
      <p class="mb-5 font-light text-gray-500 dark:text-gray-400 text-center">
        {{ props.client.description }}
      </p>
    </div>
    <div v-else class="w-60 h-60">
      <div
        class="w-full p-4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 relative overflow-hidden group"
      >
        <div class="w-full h-48 bg-gray-300 rounded-lg animate-pulse"></div>
      </div>
      <div class="my-2 h-6 bg-gray-300 rounded animate-pulse"></div>
      <div class="mb-5 h-4 bg-gray-300 rounded animate-pulse"></div>
    </div>
    <div>
      <div
        v-if="isFullscreenOpen"
        class="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4"
      >
        <button
          @click="closeFullscreen"
          class="z-50 cursor-pointer absolute top-6 right-6 p-3 bg-white/90 text-gray-800 rounded-full shadow-lg dark:bg-gray-700/90 dark:text-white"
        >
          <Icon name="heroicons:x-mark" class="h-6 w-6" />
        </button>

        <div class="relative w-full h-full flex items-center justify-center">
          <button
            @click="prevImage"
            v-show="showImgNav"
            class="absolute left-4 md:left-8 p-3 bg-white/90 text-gray-800 rounded-full shadow-lg dark:bg-gray-700/90 dark:text-white"
          >
            <Icon name="heroicons:chevron-left" class="h-6 w-6" />
          </button>

          <div
            v-if="isImgsLoading"
            class="absolute inset-0 flex items-center justify-center"
          >
            <div
              class="animate-spin rounded-full h-16 w-16 border-4 border-t-transparent border-b-transparent border-l-gray-100 border-r-gray-100"
              aria-label="Loading"
            ></div>
          </div>

           <NuxtImg
             @click="toggleImgNav"
             class="max-w-[100%] max-h-[100%] object-contain rounded-lg"
             :src="`${config.public.apiBaseUrl}/assets/${imageIds[currentImageIndex]}`"
             :quality="85"
             format="webp"
             :alt="`Fullscreen Image ${currentImageIndex + 1}`"
             loading="lazy"
             @load="isImgsLoading = false"
             preset="hero"
           />

          <button
            @click="nextImage"
            v-show="showImgNav"
            class="absolute right-4 md:right-8 p-3 bg-white/90 text-gray-800 rounded-full shadow-lg dark:bg-gray-700/90 dark:text-white"
          >
            <Icon name="heroicons:chevron-right" class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
