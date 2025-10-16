<script setup>
const config = useRuntimeConfig();
const props = defineProps({
	book: Object,
});

const showInfo = ref(false);
const showButtonText = computed(() => {
	return showInfo.value ? "Show Cover" : "Show Info";
});
</script>

<template>
  <div
    v-show="book.status === 'published'"
    class="w-full sm:w-[20rem] flex flex-col items-center"
  >
    <label class="inline-flex items-center mb-1 cursor-pointer">
      <input v-model="showInfo" type="checkbox" value="" class="hidden peer" />
      <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{{
        showButtonText
      }}</span>
    </label>
    <transition
      enter-active-class="transition-transform duration-500 ease-in-out"
      leave-active-class="transition-transform duration-500 ease-in-out"
      enter-from-class="rotate-y-90"
      leave-to-class="rotate-y-90"
      mode="out-in"
    >
      <div
        v-if="!showInfo"
        class="relative cursor-pointer flex flex-col p-1 mx-auto w-[20rem] h-[25rem] max-w-md text-gray-900 bg-white border border-gray-100 shadow dark:border-gray-600 dark:bg-gray-800 dark:text-white preserve-3d"
      >
        <img
          class="w-full h-full object-cover transition-transform duration-300 ease-in-out transform"
          :class="{ 'scale-90 opacity-50': showInfo }"
          :src="`${config.public.apiBaseUrl}/assets/${book.image}/?quality=85&format=webp`"
          loading="lazy"
          :alt="`Book ${book.id} Alt Image`"
        />
      </div>
      <div
        v-else
        class="relative cursor-pointer flex flex-col p-1 mx-auto w-[20rem] h-[25rem] max-w-md text-gray-900 bg-white border border-gray-100 shadow dark:border-gray-600 dark:bg-gray-800 dark:text-white preserve-3d"
      >
        <div class="overflow-y-auto px-2">
          <ClientOnly>
            <div
              v-html="book.info"
              class="no-tailwindcss-base text-gray-900 dark:text-white"
            ></div>
          </ClientOnly>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.preserve-3d {
  transform-style: preserve-3d;
  backface-visibility: hidden;
}

.rotate-y-90 {
  transform: rotateY(90deg);
}
</style>
