<script setup>
import JobCard from "./JobCard.vue";

const config = useRuntimeConfig();
const {
	data,
	status,
	error: _error,
} = useFetch(`${config.public.apiBaseUrl}/items/careers_opening_items/`, {
	method: "get",
});
</script>

<template>
  <div>
    <div v-if="status === 'pending'">
      <div class="grid gap-8 lg:grid-cols-2">
        <div
          v-for="index in 3"
          :key="index"
          class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="flex justify-end items-center mb-5">
            <div
              class="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
            ></div>
          </div>
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
            <div class="flex items-center space-x-4">
              <div
                class="w-7 h-7 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"
              ></div>
              <div
                class="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
              ></div>
            </div>
            <div
              class="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="grid gap-4 sm:gap-8 grid-cols-1 md:grid-cols-2">
        <div v-for="(opening, index) in data?.data" :key="index">
          <JobCard :job_opening="opening" />
        </div>
      </div>
    </div>
  </div>
</template>
