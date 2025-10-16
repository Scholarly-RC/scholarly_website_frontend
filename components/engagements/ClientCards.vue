<script setup>
import ClientCard from "./ClientCard.vue";

const config = useRuntimeConfig();
const {
	data,
	status,
	error: _error,
} = useFetch(`${config.public.apiBaseUrl}/items/client_engagements_items/`, {
	method: "get",
});
</script>

<template>
  <div>
    <div
      v-show="status === 'success' && data?.data"
      class="grid gap-4 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center align-items-center"
    >
      <ClientCard
        v-for="client in data?.data"
        :key="client.id"
        :client="client"
      />
    </div>
  </div>
</template>
