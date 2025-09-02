<script setup>
import FaqItem from "./FaqItem.vue";

const config = useRuntimeConfig();
const { data, status, error } = useFetch(
  `${config.public.apiBaseUrl}/items/faq_section/`,
  { method: "get", server: true }
);
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div
      v-show="data?.data?.status === 'published'"
      class="py-8 px-4 mx-auto max-w-screen-lg text-center lg:py-16 lg:px-6"
    >
      <div v-if="status === 'pending'">
        <div class="h-8 w-3/4 bg-gray-400 rounded mb-4 mx-auto"></div>
        <div
          v-for="_ in Array(3)"
          :key="_"
          class="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 py-5"
        >
          <div class="h-6 w-2/3 bg-gray-300 rounded mx-auto mb-3"></div>
          <div class="h-4 w-5/6 bg-gray-200 rounded mx-auto"></div>
        </div>
      </div>
      <div v-else>
        <div v-show="data.data.status === 'published'">
          <h2
            class="mb-4 text-2xl tracking-tight font-extrabold text-gray-900 dark:text-white"
          >
            {{ data.data.title }}
          </h2>
          <FaqItem
            v-for="(faq_item, index) in data.data.faqs"
            :key="index"
            :faq_item="faq_item"
          />
        </div>
      </div>
    </div>
  </section>
</template>
