<script setup>
const config = useRuntimeConfig();
const {
	data,
	status,
	error: _error,
} = useFetch(`${config.public.apiBaseUrl}/items/founder/`, { method: "get" });
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto sm:py-10 lg:px-6">
      <div v-if="status === 'pending'" class="max-w-screen-md mx-auto animate-pulse">
        <div class="md:mr-6 mb-4 md:mb-2 flex flex-col items-center text-center gap-1">
          <div class="mx-auto mb-4 w-48 h-48 rounded-full bg-gray-300 animate-pulse"></div>
          <div class="mt-3 w-32 h-6 bg-gray-300 rounded animate-pulse"></div>
          <div class="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>
        <div class="flex flex-col mt-5 gap-2">
          <div class="w-full h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
          <div class="w-5/6 h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
          <div class="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>
        <div class="flex flex-col mt-5 gap-2">
          <div class="w-full h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
          <div class="w-5/6 h-4 bg-gray-300 rounded animate-pulse mb-2"></div>
          <div class="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>

      <div v-else class="max-w-screen-md mx-auto">
        <div v-show="data?.data?.status === 'published'">
          <div class="md:float-left md:mr-6 mb-4 md:mb-2 flex flex-col items-center text-center">
            <img
              class="mx-auto mb-4 w-36 sm:w-48 h-36 sm:h-48 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
              :src="`${config.public.apiBaseUrl}/assets/${data.data.image}/?quality=85&format=webp`" loading="lazy"
              alt="Founder Image" />
            <h3 class="mt-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {{ data.data.name }}
            </h3>
            <p class="underline text-gray-500 dark:text-gray-400">
              {{ data.data.position }}
            </p>
          </div>
          <!-- Dynamic Content -->
          <div>
            <ClientOnly>
              <div v-html="data.data.info" class="no-tailwindcss-base text-gray-900 dark:text-white"></div>
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
