<script setup>
import ServicesOfferedCard from './ServicesOfferedCard.vue';
const config = useRuntimeConfig()
const { data: services_offered_header_data, status: services_offered_header_status, error: services_offered_header_error } = useFetch(`${config.public.apiBaseUrl}/items/services_offered_header/`, { method: "get" })
const { data: services_offered_categories_data, status: services_offered_categories_status, error: services_offered_categories_error } = useFetch(`${config.public.apiBaseUrl}/items/services_offered_categories/?fields=id,name,color,icon,status,items.id,items.name,items.images.directus_files_id`, { method: "get" })
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-lg sm:py-16 lg:px-6">
      <div v-if="services_offered_header_status === 'pending'" class="max-w-screen-md mb-8 lg:mb-16 animate-pulse">
        <div class="h-10 bg-gray-300 dark:bg-gray-700 w-3/4 mb-4 rounded"></div>
        <div class="h-6 bg-gray-300 dark:bg-gray-700 w-1/2 rounded"></div>
      </div>
      <div v-else class="max-w-screen-md mb-8 lg:mb-16">
        <div v-show="services_offered_header_data?.data?.status === 'published'">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{{
            services_offered_header_data?.data?.title }}
          </h2>
          <p class="text-gray-500 sm:text-xl dark:text-gray-400">{{
            services_offered_header_data?.data?.description }}</p>
        </div>
      </div>
      <div v-if="services_offered_categories_status === 'pending'"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 animate-pulse">
        <div v-for="n in 3" :key="n" class="flex flex-col gap-2 bg-gray-200 dark:bg-gray-700 p-4 rounded-lg">
          <div class="rounded w-14 h-14 flex items-center justify-center bg-gray-300 dark:bg-gray-600">
            <div class="w-5 h-5 lg:w-6 lg:h-6 bg-gray-400 dark:bg-gray-500 rounded"></div>
          </div>
          <div class="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
          <ul class="space-y-4">
            <li v-for="i in 3" :key="i" class="flex space-x-2 items-center">
              <div class="w-3.5 h-3.5 bg-gray-400 dark:bg-gray-500 rounded"></div>
              <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        <ServicesOfferedCard v-for="services in services_offered_categories_data.data" :key="services?.id"
          :services="services" />
      </div>
    </div>
  </section>
</template>