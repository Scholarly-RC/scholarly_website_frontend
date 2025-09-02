<script setup>
const props = defineProps({
  job_opening: Object,
});
</script>
<template>
  <div v-show="props.job_opening.status === 'published'">
    <div
      class="w-full p-4 sm:p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
    >
      <div
        class="flex justify-end items-center mb-1 sm:mb-2 text-gray-500 text-xs sm:text-sm"
      >
        <span>{{ $dayjs(props.job_opening.date_created).fromNow() }}</span>
      </div>
      <h2
        class="mb-1 sm:mb-2 text-lg sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ props.job_opening.job_title }}
      </h2>
      <ul
        class="space-y-1 sm:space-y-2 text-left text-gray-500 dark:text-gray-400 text-sm sm:text-md"
      >
        <li
          v-for="(qualification, index) in props.job_opening.qualifications"
          :key="index"
          class="flex items-center space-x-2 sm:space-x-3"
        >
          <Icon name="heroicons:check" class="shrink-0 w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500 dark:text-green-400" />
          <span>{{ qualification.info }}</span>
        </li>
      </ul>
      <h2
        class="break-words mt-2 sm:mt-3 text-sm sm:text-md font-medium text-gray-900 dark:text-white"
      >
        {{ props.job_opening.instruction }}
      </h2>
    </div>
  </div>
</template>
