<script setup>
const config = useRuntimeConfig();
const {
	data,
	status,
	error: _error,
} = useFetch(`${config.public.apiBaseUrl}/items/services_hero_section/`, {
	method: "get",
});
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div
      v-if="status === 'pending'"
      class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-lg xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6"
    >
      <div class="w-full h-64 bg-gray-300 rounded-lg animate-pulse"></div>
      <div class="mt-4 md:mt-0">
        <div class="w-3/4 h-10 bg-gray-300 rounded animate-pulse mb-4"></div>
        <div class="w-full h-6 bg-gray-300 rounded animate-pulse mb-2"></div>
        <div class="w-5/6 h-6 bg-gray-300 rounded animate-pulse mb-2"></div>
        <div class="w-2/3 h-6 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </div>
    <div v-else>
      <div
        v-show="data?.data?.status === 'published'"
        class="gap-8 items-center py-8 px-4 mx-auto max-w-screen-lg xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6"
      >
        <img
          class="w-full rounded-lg"
          :src="`${config.public.apiBaseUrl}/assets/${data.data.image}/?quality=85&format=webp`"
          loading="lazy"
          alt="Services Hero Image"
        />
        <div class="mt-4 md:mt-0">
          <h2
            class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
          >
            {{ data.data.title }}
          </h2>
          <p
            class="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400"
          >
            {{ data.data.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
