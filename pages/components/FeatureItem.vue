<script setup>
const props = defineProps({
    feature_item: Object
})

watchEffect(() => {
    console.log(props.feature_item)
})
</script>

<template>
    <div>
        <div
            class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
            <span class="material-symbols-outlined text-primary-600 dark:text-primary-300 w-5 h-5 lg:w-6 lg:h-6">
                {{ props.feature_item.icon }}
            </span>
        </div>
        <h3 class="mb-2 text-xl font-bold dark:text-white">{{ props.feature_item.title }}</h3>
        <p class="text-gray-500 dark:text-gray-400">{{ props.feature_item.description }}</p>
    </div>
</template>