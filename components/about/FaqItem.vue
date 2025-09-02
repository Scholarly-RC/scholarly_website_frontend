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
        <Icon
          :class="{ 'rotate-180': !isOpen }"
          name="heroicons:chevron-down"
          class="w-3 h-3 shrink-0"
        />
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
