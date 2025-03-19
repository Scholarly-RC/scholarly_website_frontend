<script setup>
const servicesStore = useServicesStore();
const props = defineProps({
  services: Object,
});

const handleViewServiceDetail = (content) => {
  servicesStore.open(content);
};
</script>

<template>
  <div
    v-show="props.services.status === 'published'"
    class="flex flex-col gap-2"
  >
    <div
      :style="{ backgroundColor: props.services.color }"
      class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center p-2 shadow-md bg-opacity-80"
    >
      <span
        class="material-symbols-outlined text-white dark:text-gray-900 w-6 h-6"
      >
        {{ props.services.icon }}
      </span>
    </div>
    <h2 class="text-20 tracking-tight font-bold text-gray-900 dark:text-white">
      {{ props.services.category }}
    </h2>
    <ul role="list" class="space-y-4 text-gray-500 dark:text-gray-400">
      <li
        v-for="service in props.services.services"
        :key="service.name"
        class="flex items-center space-x-2"
      >
        <svg
          :style="{ color: props.services.color }"
          class="shrink-0 w-3.5 h-3.5"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
          />
        </svg>
        <span class="leading-tight">{{ service.name }}</span>
        <button
          @click="handleViewServiceDetail(service.info)"
          v-show="service.info"
          class="px-3 py-1 text-sm font-medium rounded-lg transition bg-gray-200 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          View
        </button>
      </li>
    </ul>
  </div>
</template>
