<script setup>
const config = useRuntimeConfig();
const {
	data: footer_address_data,
	status: footer_address_data_status,
	error: _footer_address_error,
} = useFetch(`${config.public.apiBaseUrl}/items/footer_address/`, {
	method: "get",
});
const {
	data: footer_contact_info_data,
	status: footer_contact_info_data_status,
	error: _footer_contact_info_error,
} = useFetch(`${config.public.apiBaseUrl}/items/footer_contact_info/`, {
	method: "get",
});
</script>

<template>
    <div class="grid grid-cols-2 gap-8 sm:gap-6 px-0 md:px-10">
        <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Links</h2>
            <ul class="text-gray-600 dark:text-gray-400">
                <li>
                </li>
            </ul>
        </div>
        <div class="flex flex-col gap-2">
            <div v-if="footer_address_data_status === 'pending'" class="animate-pulse min-w-60">
                <div class="h-4 w-1/3 bg-gray-400 rounded mb-1"></div>
                <ul>
                    <li class="h-4 w-2/3 bg-gray-300 rounded mb-4"></li>
                </ul>
            </div>
            <div v-else>
                <div v-show="footer_address_data?.data?.status === 'published'">
                    <h2 class="mb-1 text-sm font-semibold text-gray-900 uppercase dark:text-white">{{
                        footer_address_data.data.title }}</h2>
                    <ul class="text-gray-600 dark:text-gray-400">
                        <li class="mb-4">
                            <p class="hover:underline">{{ footer_address_data.data.address }}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-if="footer_contact_info_data_status === 'pending'" class="animate-pulse min-w-60">
                <div class="h-4 w-1/3 bg-gray-400 rounded mb-1"></div>
                <ul>
                    <li class="h-4 w-2/3 bg-gray-300 rounded mb-1"></li>
                    <li class="h-4 w-1/2 bg-gray-300 rounded"></li>
                </ul>
            </div>
            <div v-else>
                <div v-show="footer_contact_info_data?.data?.status === 'published'">
                    <h2 class="mb-1 text-sm font-semibold text-gray-900 uppercase dark:text-white">{{
                        footer_contact_info_data.data.title }}</h2>
                    <ul class="text-gray-600 dark:text-gray-400">
                        <li class="mb-1">
                            <a :href="`mailto:${footer_contact_info_data.data.email}`"
                                class="hover:underline break-words w-full block">
                                {{ footer_contact_info_data.data.email }}
                            </a>
                        </li>
                        <li>
                            <p class="hover:underline">{{
                                footer_contact_info_data.data.phone }}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>