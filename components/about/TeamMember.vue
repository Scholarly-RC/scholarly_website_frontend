<script setup>
const config = useRuntimeConfig();
const props = defineProps({
  team_member: Object,
});

const seeMore = ref(false);

const toggleSeeMore = () => {
  seeMore.value = !seeMore.value;
};
</script>

<template>
  <div v-show="props.team_member.status === 'published'" class="p-4">
    <div
      class="text-center text-gray-500 dark:text-gray-400 shadow-md rounded-lg cursor-pointer"
    >
       <NuxtImg
         class="mx-auto mb-4 w-32 sm:w-36 h-32 sm:h-36 rounded-full"
         :src="`${config.public.apiBaseUrl}/assets/${team_member.image}`"
         :quality="85"
         format="webp"
         loading="lazy"
         alt="Team Member Image"
         preset="avatar"
         placeholder="[blurhash:data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJibHVyIj48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSI1Ii8+PC9maWx0ZXI+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNGM0Y0RjYiIGZpbHRlcj0idXJsKCNibHVyKSIvPjwvc3ZnPg==]"
       />
      <h3
        class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ props.team_member.name }}
      </h3>
      <p class="underline">{{ props.team_member.position }}</p>
      <div class="mt-4 p-4 flex items-center flex-col gap-3">
        <ClientOnly>
          <div
            v-html="props.team_member.bio_note"
            class="no-tailwindcss-base text-gray-900 dark:text-white"
            :class="{ 'line-clamp-3': !seeMore }"
          ></div>
          <button
            v-show="props.team_member.bio_note"
            @click="toggleSeeMore"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <span>{{ seeMore ? "See less" : "See more" }}</span>
            <Icon
              name="heroicons:chevron-down"
              class="w-5 h-5 transition-transform duration-300 transform text-gray-500 dark:text-gray-400"
              :class="{ 'rotate-180': seeMore }"
            />
          </button>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>
