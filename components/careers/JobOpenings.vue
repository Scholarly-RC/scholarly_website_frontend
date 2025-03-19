<script setup>
import JobList from "./JobList.vue";

const config = useRuntimeConfig();
const { data, status, error } = useFetch(
  `${config.public.apiBaseUrl}/items/careers_opening_header/`,
  { method: "get" }
);
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-lg lg:py-16 lg:px-6">
      <div
        v-if="status === 'pending'"
        class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8"
      >
        <div
          class="mb-4 h-10 w-3/4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mx-auto"
        ></div>
      </div>
      <div v-else class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
        <div v-show="data?.data?.status === 'published'">
          <h2
            class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
          >
            {{ data.data.title }}
          </h2>
          <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            {{ data.data.description }}
          </p>
        </div>
      </div>
      <JobList />
    </div>
  </section>
</template>
