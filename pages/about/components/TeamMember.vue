<script setup>
const config = useRuntimeConfig()
const props = defineProps({
    team_member: Object
})
</script>

<template>
    <div v-show="props.team_member.status === 'published'" class="text-center text-gray-500 dark:text-gray-400">
        <img class="mx-auto mb-4 w-36 h-36 rounded-full"
            :src="`${config.public.apiBaseUrl}/assets/${team_member.image}/?quality=85&format=webp`" loading="lazy" alt="Team Member Image">
        <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            <a href="#">{{ props.team_member.name }}</a>
        </h3>
        <p>{{ props.team_member.position }}</p>
    </div>
</template>