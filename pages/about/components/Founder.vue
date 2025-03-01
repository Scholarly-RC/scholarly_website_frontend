<script setup>
const config = useRuntimeConfig()
const { data, status, error } = useFetch(`${config.public.apiBaseUrl}/items/founder/`, { method: "get" })
</script>

<template>
    <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto sm:py-10 lg:px-6">
            <div class="max-w-screen-md mx-auto">
                <!-- Floating Image -->
                <div class="md:float-left md:mr-6 mb-4 md:mb-2 flex flex-col items-center text-center">
                    <img class="mx-auto mb-4 w-48 h-48 rounded-full"
                        :src="`${config.public.apiBaseUrl}/assets/${data.data.image}/?quality=85&format=webp`"
                        loading="lazy" alt="Founder Image">
                    <h3 class="mt-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {{ data.data.name }}
                    </h3>
                    <p class="underline text-gray-500 dark:text-gray-400">{{ data.data.position }}</p>
                </div>
                <!-- Dynamic Content -->
                <div class="text-gray-900 dark:text-white text-start">
                    <ClientOnly>
                        <div v-html="data.data.info"></div>
                    </ClientOnly>
                </div>
            </div>
        </div>
    </section>
</template>