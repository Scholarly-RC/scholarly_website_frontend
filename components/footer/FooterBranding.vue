<script setup>
const config = useRuntimeConfig();
const {
	data,
	status,
	error: _error,
} = useFetch(`${config.public.apiBaseUrl}/items/footer_description/`, {
	method: "get",
});
</script>

<template>
    <div class="mb-6 md:mb-0">
        <NuxtLink to="/" class="flex items-center">
            <img src="/assets/images/scholarly-logo-light.png" class="mr-3 h-6 sm:h-9 block dark:hidden"
                alt="Flowbite Logo" />
            <img src="/assets/images/scholarly-logo-dark.png" class="mr-3 h-6 sm:h-9 hidden dark:block"
                alt="Flowbite Logo" />
        </NuxtLink>
        <div v-if="status === 'pending'" class="flex flex-col gap-2 max-w-sm mt-3 animate-pulse">
            <div v-for="n in 4" :key="n" class="h-4 w-full bg-gray-300 rounded"></div>
        </div>
        <div v-else class="flex flex-col gap-2 max-w-sm mt-3">
            <div v-show="data?.data?.status === 'published'">
                <p v-for="(description_data, index) in data.data.descriptions" :key="index"
                    class="text-gray-500 sm:text-md dark:text-gray-400">
                    {{ description_data.info }}
                </p>
            </div>
        </div>
    </div>
</template>