<script setup>
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
const config = useRuntimeConfig();
const contactUsStore = useContactUsStore();
const { isOpen } = storeToRefs(contactUsStore);

const {
	values,
	errors,
	defineField,
	meta: formMeta,
	handleSubmit,
	isSubmitting,
	resetForm,
} = useForm({
	validationSchema: toTypedSchema(
		z.object({
			fullName: z.string().nonempty("Full Name is required."),
			email: z
				.string()
				.nonempty("Email field is required.")
				.email("Invalid email format."),
			subject: z.string().nonempty("Subject is required."),
			message: z.string().nonempty("Message is required."),
		}),
	),
});

const [fullName] = defineField("fullName");
const [email] = defineField("email");
const [subject] = defineField("subject");
const [message] = defineField("message");

const disableSubmit = computed(() => {
	return !formMeta.value.dirty || !formMeta.value.valid;
});

const handleClose = (open) => {
	if (!open) contactUsStore.close();
};

const onSubmit = handleSubmit(async (values) => {
	const transformedValues = {
		full_name: values.fullName,
		email: values.email,
		subject: values.subject,
		message: values.message,
	};
	try {
		const data = await $fetch(`${config.public.apiBaseUrl}/items/messages/`, {
			method: "POST",
			body: transformedValues,
			headers: {
				"Content-Type": "application/json",
			},
		});
		contactUsStore.showConfirmationModal(
			true,
			"Thank you for reaching out! Your message has been successfully sent. We will get back to you as soon as possible.",
		);
	} catch (error) {
		contactUsStore.showConfirmationModal(false, error);
		console.error(error);
	} finally {
		resetForm();
	}
});
</script>

<template>
    <Dialog :open="isOpen" @update:open="handleClose">
        <DialogContent class="max-w-2xl">
            <DialogHeader>
                <DialogTitle>Contact Us</DialogTitle>
            </DialogHeader>
            <div class="py-4 px-4 max-h-[70vh] md:max-h-[75vh] h-auto overflow-y-auto">
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
                                <Input v-model="fullName" id="full-name" placeholder="Enter your full name"
                                    class="shadow-sm" />
                                <p v-if="errors.fullName" class="mt-2 text-sm text-red-600 dark:text-red-500">{{
                                    errors.fullName }}</p>
                    </div>
                    <div>
                        <label for="email"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Email:</label>
                                <Input v-model="email" id="email" placeholder="Enter your email address"
                                    class="shadow-sm" />
                                <p v-if="errors.email" class="mt-2 text-sm text-red-600 dark:text-red-500">{{
                                    errors.email }}</p>
                    </div>
                    <div>
                        <label for="subject"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject:</label>
                                <Input v-model="subject" id="subject"
                                    placeholder="Enter the subject of your message"
                                    class="block p-3 shadow-sm" />
                                <p v-if="errors.subject" class="mt-2 text-sm text-red-600 dark:text-red-500">{{
                                    errors.subject }}</p>
                    </div>
                    <div class="sm:col-span-2">
                        <label for="message"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your
                            Message:</label>
                                <Textarea v-model="message" id="message" rows="6"
                                    placeholder="Write your message here..."
                                    class="block p-2.5 shadow-sm" />
                                <p v-if="errors.message" class="mt-2 text-sm text-red-600 dark:text-red-500">{{
                                    errors.message }}</p>
                    </div>
                    <div class="w-full flex justify-center">
                        <Button type="submit" :disabled="disableSubmit" class="py-3 px-5 sm:w-fit">Submit</Button>
                    </div>
                </form>
            </div>
        </DialogContent>
    </Dialog>
</template>