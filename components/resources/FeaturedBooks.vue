<script setup>
import BookCard from "./BookCard.vue";
import Skeleton from "~/components/ui/skeleton/Skeleton.vue";

const config = useRuntimeConfig();
const {
	data,
	status,
	error: _error,
} = useFetch(`${config.public.apiBaseUrl}/items/resources_items/`, {
	method: "get",
});
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div
      v-if="status === 'pending'"
      class="py-8 px-4 mx-auto max-w-screen-lg lg:pb-10 lg:pt-5 lg:px-6"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-10">
        <div
          v-for="index in 3"
          :key="index"
          class="w-full sm:w-[20rem] flex flex-col items-center"
        >
          <Skeleton class="w-[20rem] h-[25rem] max-w-md rounded-lg" />
        </div>
      </div>
    </div>
    <div
      v-else
      class="py-8 px-4 mx-auto max-w-screen-lg lg:pb-10 lg:pt-5 lg:px-6"
    >
      <div v-show="data?.data" class="flex justify-center gap-4">
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-10"
        >
          <BookCard v-for="item in data.data" :key="item.id" :book="item" />
        </div>
      </div>
    </div>
  </section>
</template>
