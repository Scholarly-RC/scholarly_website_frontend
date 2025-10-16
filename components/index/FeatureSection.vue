<script setup>
// biome-ignore lint/correctness/noUnusedImports: FeatureItems is used in template
import FeatureItems from "./FeatureItems.vue";

const config = useRuntimeConfig();
// biome-ignore lint/correctness/noUnusedVariables: data and status are used in template
const { data, status, error: _error } = useFetch(
	`${config.public.apiBaseUrl}/items/feature_section/`,
	{ method: "get" },
);
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-lg sm:py-16 lg:px-6">
      <div
        v-if="status === 'pending'"
        class="max-w-screen-lg mb-8 lg:mb-16 animate-pulse"
      >
        <div class="h-10 w-3/4 bg-gray-400 rounded mb-4"></div>
        <div class="h-6 w-full bg-gray-300 rounded"></div>
        <div
          class="mt-5 space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0"
        >
          <div v-for="item in Array(3)" :key="item" class="animate-pulse">
            <div
              class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-gray-300 lg:h-12 lg:w-12"
            ></div>
            <div class="h-6 w-3/4 bg-gray-400 rounded mb-2"></div>
            <div class="h-4 w-full bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
      <div v-else>
        <div v-show="data?.data?.status === 'published'">
          <h2
            class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
          >
            {{ data.data.title }}
          </h2>
          <p class="mb-5 text-gray-500 sm:text-xl dark:text-gray-400">
            {{ data.data.description }}
          </p>
          <FeatureItems :feature_items="data.data.items" />
        </div>
      </div>
    </div>
  </section>
</template>
