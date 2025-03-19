<script setup>
const servicesStore = useServicesStore();
const { isOpen, content } = storeToRefs(servicesStore);

onMounted(() => {
  watchEffect(() => {
    if (isOpen.value) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });
});
</script>

<template>
  <div
    id="services-info-modal"
    tabindex="-1"
    :class="{ hidden: !isOpen }"
    class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
  >
    <div class="relative p-4 w-full max-w-3xl">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <div
          class="flex items-center justify-between p-2 rounded-t dark:border-gray-600 border-gray-200"
        >
          <button
            @click="servicesStore.close()"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="default-modal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
        <div class="px-4 bg-white dark:bg-gray-900 relative rounded-lg">
          <div
            class="py-4 px-4 mx-auto max-w-screen-md max-h-[70vh] md:max-h-[75vh] h-auto overflow-y-auto"
          >
            <ClientOnly>
              <div
                v-if="content"
                v-html="content"
                class="no-tailwindcss-base text-gray-900 dark:text-white"
              ></div>
            </ClientOnly>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
