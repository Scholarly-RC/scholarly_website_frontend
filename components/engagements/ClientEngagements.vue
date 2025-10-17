<script setup>
import ClientCards from "./ClientCards.vue";

const config = useRuntimeConfig();
const {
	data,
	status,
	error: _error,
} = useFetch(`${config.public.apiBaseUrl}/items/client_engagements_header/`, {
	method: "get",
	server: true,
});
</script>

<template>
  <div class="mx-auto max-w-screen-lg px-4">
    <div v-if="status === 'pending'" class="text-start mb-8">
      <div
        class="mb-4 h-6 lg:h-8 w-2/4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
      ></div>
    </div>
    <div v-else class="text-start mb-8">
      <h2
        v-show="data?.data.status === 'published'"
        class="mb-4 text-xl lg:text-2xl tracking-tight font-extrabold text-gray-900 dark:text-white"
      >
        {{ data.data.title }}
      </h2>
    </div>
    <ClientCards />
  </div>
</template>
