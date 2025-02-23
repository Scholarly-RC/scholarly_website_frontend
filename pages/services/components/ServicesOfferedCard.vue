<script setup>
const props = defineProps({
    services: Object
})
</script>
<template>
    <div class="flex flex-col gap-2">
        <div :style="{ backgroundColor: props.services.color }"
            class="rounded w-14 h-14 flex items-center justify-center">
            <svg class="w-5 h-5 text-white lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                    d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"></path>
            </svg>
        </div>
        <h2 class="text-20 tracking-tight font-bold text-gray-900 dark:text-white">{{ props.services.category }}
        </h2>
        <ul role="list" class="space-y-4 text-gray-500 dark:text-gray-400">
            <li v-for="service in props.services.services" :key="service.name"
                class="flex space-x-2 rtl:space-x-reverse items-center">
                <svg :style="{ color: props.services.color }" class="shrink-0 w-3.5 h-3.5"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span class="leading-tight">{{ service.name }}</span>
            </li>
        </ul>
    </div>
</template>