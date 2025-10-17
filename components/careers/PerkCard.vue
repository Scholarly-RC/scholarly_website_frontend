<script setup>
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const props = defineProps({
	icon: String,
	title: String,
	description: String,
});
</script>
<template>
  <Card class="hover:shadow-lg hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 pt-5">
    <CardContent>
      <span class="material-symbols-outlined text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-4xl mb-4 transition-colors duration-200">{{ props.icon }}</span>
      <CardTitle class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
        {{ props.title }}
      </CardTitle>
      <p class="mb-5 font-light text-gray-500 dark:text-gray-400">
        {{ props.description }}
      </p>
    </CardContent>
  </Card>
</template>
