<script setup>
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
const config = useRuntimeConfig()
const contactUsStore = useContactUsStore()
const { isOpen } = storeToRefs(contactUsStore)

const { values, errors, defineField, meta: formMeta, handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(z.object({
        fullName: z.string().nonempty('Full Name is required.'),
        email: z.string().nonempty('Email field is required.').email("Invalid email format."),
        subject: z.string().nonempty('Subject is required.'),
        message: z.string().nonempty('Message is required.'),
    })),
});

const [fullName] = defineField('fullName');
const [email] = defineField('email');
const [subject] = defineField('subject');
const [message] = defineField('message');

const disableSubmit = computed(() => {
    return !formMeta.value.dirty || !formMeta.value.valid
})

const onSubmit = handleSubmit(async (values) => {
    const transformedValues = {
        full_name: values.fullName,
        email: values.email,
        subject: values.subject,
        message: values.message,
    };
    try {
        const data = await $fetch(`${config.public.apiBaseUrl}/items/messages/`, {
            method: "POST", body: transformedValues, headers: {
                'Content-Type': 'application/json'
            }
        })
        contactUsStore.showConfirmationModal(true, "Thank you for reaching out! Your message has been successfully sent. We will get back to you as soon as possible.")
    } catch (error) {
        contactUsStore.showConfirmationModal(false, error)
        console.error(error)
    } finally {
        resetForm()
    }
});

onMounted(() => {
    watchEffect(() => {
        if (isOpen.value) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
});
</script>

<template>
    <div id="contact-us-modal" tabindex="-1" :class="{ 'hidden': !isOpen }"
        class="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
        <div class="relative p-4 w-full max-w-2xl">
            <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <div
                    class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Contact Us
                    </h3>
                    <button @click="contactUsStore.close()" type="button"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="default-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
                <div class="p-4 md:p-5 bg-white dark:bg-gray-900 relative-b-lg">
                    <div class="py-4 px-4 mx-auto max-w-screen-md max-h-[70vh] md:max-h-[75vh] h-auto overflow-y-auto">
                        <div v-if="isSubmitting"
                            class="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-30 backdrop-blur-sm z-50 dark:bg-gray-800 dark:bg-opacity-50">
                            <div
                                class="animate-spin rounded-full h-12 w-12 border-t-4 border-black border-opacity-75 dark:border-white dark:border-opacity-75">
                            </div>
                        </div>
                        <form @submit.prevent="onSubmit" class="space-y-8" novalidate>
                            <div>
                                <label for="full-name"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Full
                                    Name:</label>
                                <input type="text" v-model="fullName" id="full-name" placeholder="Enter your full name"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <p v-if="errors.fullName" class="mt-2 text-sm text-red-600 dark:text-red-500">{{
                                    errors.fullName }}</p>
                            </div>
                            <div>
                                <label for="email"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Email:</label>
                                <input type="email" id="email" v-model="email" placeholder="Enter your email address"
                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <p v-if="errors.email" class="mt-2 text-sm text-red-600 dark:text-red-500">{{
                                    errors.email }}</p>
                            </div>
                            <div>
                                <label for="subject"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject:</label>
                                <input type="text" id="subject" v-model="subject"
                                    placeholder="Enter the subject of your message"
                                    class="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <p v-if="errors.subject" class="mt-2 text-sm text-red-600 dark:text-red-500">{{
                                    errors.subject }}</p>
                            </div>
                            <div class="sm:col-span-2">
                                <label for="message"
                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your
                                    Message:</label>
                                <textarea name="message" id="message" v-model="message" rows="6"
                                    placeholder="Write your message here..."
                                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"></textarea>
                                <p v-if="errors.message" class="mt-2 text-sm text-red-600 dark:text-red-500">{{
                                    errors.message }}</p>
                            </div>
                            <div class="w-full flex justify-center">
                                <button type="submit" :disabled="disableSubmit"
                                    class="disabled:opacity-50 disabled:cursor-not-allowed py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>