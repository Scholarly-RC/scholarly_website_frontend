<script setup>
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const props = defineProps({
	job_opening: Object,
});
</script>
<template>
  <div v-show="props.job_opening.status === 'published'">
    <Card class="w-full hover:shadow-lg hover:scale-105 transition-all duration-200">
      <CardHeader>
        <div
          class="flex justify-end items-center text-gray-500 text-xs sm:text-sm"
        >
          <span>{{ $dayjs(props.job_opening.date_created).fromNow() }}</span>
        </div>
        <CardTitle class="text-lg sm:text-2xl">
          {{ props.job_opening.job_title }}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul
          class="space-y-1 sm:space-y-2 text-left text-gray-500 dark:text-gray-400 text-sm sm:text-md"
        >
          <li
            v-for="(qualification, index) in props.job_opening.qualifications"
            :key="index"
            class="flex items-center space-x-2 sm:space-x-3"
          >
            <svg
              class="shrink-0 w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500 dark:text-green-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>
            <span>{{ qualification.info }}</span>
          </li>
        </ul>
        <h2
          class="break-words mt-2 sm:mt-3 text-sm sm:text-md font-medium text-gray-900 dark:text-white"
        >
          {{ props.job_opening.instruction }}
        </h2>
      </CardContent>
    </Card>
  </div>
</template>
