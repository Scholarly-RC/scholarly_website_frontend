<script setup>
import FeatureItem from './FeatureItem.vue';

const config = useRuntimeConfig()
const { data, status, error } = useFetch(`${config.public.apiBaseUrl}/items/feature_items/`, { method: "get" })
</script>

<template>
    <div>
        <div v-if="status === 'success' && data?.data"
            class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <FeatureItem v-for="item in data.data" :key="item.id" :feature_item="item" />
        </div>
        <div v-else class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            <div v-for="item in Array(3)" :key="item" class="animate-pulse">
                <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-gray-300 lg:h-12 lg:w-12">
                </div>
                <div class="h-6 w-3/4 bg-gray-400 rounded mb-2"></div>
                <div class="h-4 w-full bg-gray-300 rounded"></div>
            </div>
        </div>
    </div>

</template>