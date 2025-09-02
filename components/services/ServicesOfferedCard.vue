<script setup>
const servicesStore = useServicesStore()
const props = defineProps({
  services: Object
})

const handleViewServiceDetail = (image_data) => {
  const image_ids = image_data.map(data => data.directus_files_id);
  servicesStore.open(image_ids)
}
</script>

<template>
  <div v-show="props.services.status === 'published'" class="flex flex-col gap-2">
    <div :style="{ backgroundColor: props.services.color }"
      class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center p-2 shadow-md bg-opacity-80">
      <span class="material-symbols-outlined text-white dark:text-gray-900 w-6 h-6">
        {{ props.services.icon }}
      </span>
    </div>
    <h2 class="text-20 tracking-tight font-bold text-gray-900 dark:text-white">{{ props.services.name }}
    </h2>
    <ul role="list" class="space-y-4 text-gray-500 dark:text-gray-400">
      <li v-for="service in props.services.items" :key="service.id" class="flex items-center space-x-2">
        <div class="flex items-start gap-1">
          <Icon :style="{ color: props.services.color }" name="heroicons:check-circle" class="shrink-0 w-3.5 h-3.5 mt-1 ms-1" />
          <span class="leading-tight">{{ service.name }}</span>
        </div>
        <button @click="handleViewServiceDetail(service.images)" v-show="service.images.length" class="px-3 py-1 text-sm font-medium rounded-lg transition 
            bg-gray-200 text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700">
          View
        </button>
      </li>
    </ul>
  </div>
</template>