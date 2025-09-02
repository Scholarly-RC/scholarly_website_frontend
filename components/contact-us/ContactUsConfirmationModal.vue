<script setup>
const contactUsStore = useContactUsStore()
const { showConfirmation, confirmationMessage, isConfirmationSuccess } = storeToRefs(contactUsStore)

onMounted(() => {
    watchEffect(() => {
        if (showConfirmation.value) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
});
</script>

<template>
    <div tabindex="-1" :class="{ 'hidden': !showConfirmation }"
        class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <div class="relative p-4 w-full max-w-md h-auto">
            <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <Icon v-if="isConfirmationSuccess" name="heroicons:check-circle" class="text-green-500 dark:text-green-400 w-20 h-20 mb-3.5 mx-auto" />
                <Icon v-else name="heroicons:x-circle" class="text-red-500 dark:text-red-400 w-20 h-20 mb-3.5 mx-auto" />
                <p class="mb-4 text-gray-500 dark:text-gray-300">{{ confirmationMessage }}</p>
                <div class="flex justify-center items-center space-x-4">
                    <button @click="contactUsStore.closeConfirmationModal()" type="button"
                        class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>