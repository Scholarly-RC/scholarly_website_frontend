<script setup>
import { Spinner } from "@/components/ui/spinner";

const config = useRuntimeConfig();

const props = defineProps({
	imageId: String,
	index: Number,
});

const isLoading = ref(true);
</script>
<template>
    <div>
        <div v-if="isLoading" class="flex items-center justify-center w-full min-h-20 ">
            <Spinner class="size-8" />
        </div>
        <img class="transition-opacity duration-300 w-full h-full object-cover"
            :src="`${config.public.apiBaseUrl}/assets/${imageId}/?quality=85&format=webp`" loading="lazy"
            :alt="`Service Info ${index}`" @load="isLoading = false" @error="isLoading = false" />
    </div>
</template>