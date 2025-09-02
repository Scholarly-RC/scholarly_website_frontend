<script setup>
const darkModeStore = useDarkModeStore()
const { darkMode } = storeToRefs(darkModeStore)
</script>

<template>
    <button @click="darkModeStore.toggle()">
        <ClientOnly>
            <Icon name="heroicons:moon" class="w-6 h-6 text-gray-800 dark:text-white block dark:hidden" />
            <Icon name="heroicons:sun" class="w-6 h-6 text-gray-800 dark:text-white hidden dark:block" />
        </ClientOnly>
    </button>
</template>