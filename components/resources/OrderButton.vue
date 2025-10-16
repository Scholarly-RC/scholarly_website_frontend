<script setup>
const scrollStore = useScrollStore();
const config = useRuntimeConfig();
// biome-ignore lint/correctness/noUnusedVariables: data and status are used in template
const { data, status, error: _error } = useFetch(
	`${config.public.apiBaseUrl}/items/resource_order_button/`,
	{ method: "get" },
);
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div
      class="pb-1 px-4 mx-auto max-w-screen-lg pt-10 lg:px-6 flex justify-center"
    >
      <div v-if="status === 'pending'">
        <button
          class="px-6 py-3.5 text-base font-medium text-gray-400 inline-flex items-center bg-gray-300 rounded-lg animate-pulse"
        >
          <div class="w-20 h-4 bg-gray-400 rounded"></div>
        </button>
      </div>
       <div v-else>
         <Button
           v-show="data?.data?.status === 'published'"
           @click="scrollStore.scrollToContact"
           type="button"
           class="px-6 py-3.5 text-base font-medium"
           variant="default"
         >
           <span class="material-symbols-outlined text-white me-2">
             {{ data.data.icon }}
           </span>
           {{ data.data.name }}
         </Button>
       </div>
    </div>
  </section>
</template>
