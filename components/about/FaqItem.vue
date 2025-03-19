<script setup>
const props = defineProps({
  faq_item: Object,
});

const isOpen = ref(false);

const toggleStatus = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div
    :class="{
      'text-gray-500 dark:text-gray-400': !isOpen,
      'bg-white dark:bg-gray-900 text-gray-900 dark:text-white': isOpen,
    }"
  >
    <h2>
      <button
        @click="toggleStatus"
        type="button"
        class="flex items-center justify-between w-full py-5 font-medium border-gray-200 dark:border-gray-700 gap-3"
      >
        <span>{{ props.faq_item.question }}</span>
        <svg
          :class="{ 'rotate-180': !isOpen }"
          data-accordion-icon
          class="w-3 h-3 shrink-0"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5 5 1 1 5"
          />
        </svg>
      </button>
    </h2>
    <div v-if="isOpen">
      <div
        class="text-start py-5 border-b border-gray-200 dark:border-gray-700"
      >
        <p class="mb-2">{{ props.faq_item.answer }}</p>
      </div>
    </div>
  </div>
</template>
