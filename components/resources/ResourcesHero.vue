<script setup>
const config = useRuntimeConfig();
const { data, status, error: _error } = useFetch(
	`${config.public.apiBaseUrl}/items/resources_hero_section/`,
	{ method: "get" },
);
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div
      v-if="status === 'pending'"
      class="animate-pulse gap-16 items-center py-8 px-4 mx-auto max-w-screen-lg lg:grid lg:grid-cols-2 lg:py-16 lg:px-6"
    >
      <div class="grid grid-cols-2 gap-4 mt-8">
        <div class="w-full h-40 bg-gray-300 rounded-lg"></div>
        <div class="mt-4 w-full h-40 lg:mt-10 bg-gray-300 rounded-lg"></div>
      </div>
      <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400 mt-4">
        <div class="h-10 w-3/4 bg-gray-400 rounded mb-4"></div>
        <div class="h-6 w-full bg-gray-300 rounded mb-4"></div>
      </div>
    </div>
    <div v-else>
      <div
        v-show="data?.data?.status === 'published'"
        class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-lg lg:grid lg:grid-cols-2 lg:py-16 lg:px-6"
      >
        <div class="grid grid-cols-2 gap-4 mt-8">
          <img
            class="w-full rounded-lg"
            :src="`${config.public.apiBaseUrl}/assets/${data.data.image_1}/?quality=85&format=webp`"
            loading="lazy"
            alt="Resource Page Image 1"
          />
          <img
            class="mt-4 w-full lg:mt-10 rounded-lg"
            :src="`${config.public.apiBaseUrl}/assets/${data.data.image_2}/?quality=85&format=webp`"
            loading="lazy"
            alt="Resource Page Image 2"
          />
        </div>
        <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h2
            class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
          >
            {{ data.data.title }}
          </h2>
          <p class="mb-4">{{ data.data.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
