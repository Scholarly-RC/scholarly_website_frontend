<script setup>
import ContactUsConfirmationModal from './ContactUsConfirmationModal.vue';

const config = useRuntimeConfig()
const contactUsStore = useContactUsStore()
const { data, status, error } = useFetch(`${config.public.apiBaseUrl}/items/contact_us_section/`, { method: "get" })
const scrollStore = useScrollStore()
const { isClicked } = storeToRefs(scrollStore)
</script>

<template>
    <section id="contact-us" class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div class="mx-auto max-w-screen-sm text-center">
                <h2 class="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">{{
                    data.data.title }}</h2>
                <p class="font-light text-gray-500 dark:text-gray-400 md:text-lg mb-7">{{ data.data.description }}</p>
                <button @click="contactUsStore.open" :class="{ 'animate-custom-bounce': isClicked }"
                    class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-bold rounded-lg text-lg px-10 py-5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                    {{ data.data.cta_button_text }}
                </button>
            </div>
        </div>
        <ContactUsModal />
        <ContactUsConfirmationModal />
    </section>
</template>