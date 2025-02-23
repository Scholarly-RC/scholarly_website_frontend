<script setup>
import FaqItem from './FaqItem.vue';
const config = useRuntimeConfig()
const { data: faq_header_data, status: faq_header_status, error: faq_header_error } = useFetch(`${config.public.apiBaseUrl}/items/faq_header/`, { method: "get" })
const { data: faq_items_data, status: faq_items_status, error: faq_items_error } = useFetch(`${config.public.apiBaseUrl}/items/faq_items/`, { method: "get" })

</script>
<template>
    <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-lg text-center lg:py-16 lg:px-6">
            <h2 v-if="faq_header_status === 'success' && faq_header_data?.data"
                class="mb-4 text-2xl tracking-tight font-extrabold text-gray-900 dark:text-white">{{
                    faq_header_data?.data?.title }}</h2>
            <div v-else class="h-8 w-3/4 bg-gray-400 rounded mb-4 mx-auto"></div>
            <div v-if="faq_items_status === 'success' && faq_items_data?.data">
                <FaqItem v-for="faq_item in faq_items_data?.data" :key="faq_item.id" :faq_item="faq_item" />
            </div>
            <div v-else>
                <div v-for="_ in Array(3)" :key="_"
                    class="text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 py-5">
                    <div class="h-6 w-2/3 bg-gray-300 rounded mx-auto mb-3"></div>
                    <div class="h-4 w-5/6 bg-gray-200 rounded mx-auto"></div>
                </div>
            </div>
        </div>
    </section>
</template>