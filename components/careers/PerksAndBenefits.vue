<script setup>
const config = useRuntimeConfig();
const { data, status, error } = useFetch(
  `${config.public.apiBaseUrl}/items/careers_perks_and_benefits/`,
  { method: "get" }
);
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div
      v-if="status === 'pending'"
      class="py-8 px-4 mx-auto max-w-screen-lg lg:py-16 lg:px-6"
    >
      <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
        <div
          class="mb-4 h-10 w-3/4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mx-auto"
        ></div>
      </div>
      <div class="grid gap-8 grid-cols-4">
        <div
          v-for="index in 4"
          :key="index"
          class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
        >
          <div
            class="mb-2 h-8 w-3/4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
          ></div>
          <div
            class="mb-5 h-6 w-full bg-gray-200 dark:bg-gray-600 rounded animate-pulse"
          ></div>
          <div
            class="mb-2 h-6 w-5/6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"
          ></div>
          <div class="mt-4 flex justify-between items-center">
            <div
              class="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="py-8 px-4 mx-auto max-w-screen-lg lg:py-16 lg:px-6">
      <div v-show="data?.data?.status === 'published'">
        <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2
            class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
          >
            {{ data.data.title }}
          </h2>
        </div>
        <div
          class="grid gap-4 sm:gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
        >
          <div
            v-for="(item, index) in data.data.items"
            :key="index"
            class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
          >
            <span
              class="material-symbols-outlined text-gray-700 dark:text-gray-300 text-4xl mb-4"
              >{{ item.icons }}</span
            >
            <h2
              class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {{ item.title }}
            </h2>
            <p class="mb-5 font-light text-gray-500 dark:text-gray-400">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
