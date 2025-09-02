<script setup>
const swaiperContainerRef = ref(null);
const config = useRuntimeConfig();
const { data, status, error } = useFetch(
  `${config.public.apiBaseUrl}/items/testimonials/`,
  { method: "get", server: true }
);

useSwiper(swaiperContainerRef, {
  loop: true,
  pagination: {
    clickable: true,
  },
});
</script>

<template>
  <ClientOnly>
    <section class="bg-white dark:bg-gray-900 px-4 py-8">
      <div v-if="status === 'pending'" class="overflow-hidden">
        <div class="mb-10 px-4">
          <div class="w-full max-w-lg mx-auto text-center">
            <div
              class="h-10 md:h-12 mx-auto mb-3 bg-gray-400 dark:bg-gray-600 rounded animate-pulse"
            ></div>
            <div
              class="h-6 md:h-8 w-3/4 mx-auto bg-gray-400 dark:bg-gray-600 rounded animate-pulse"
            ></div>
            <div
              class="flex flex-col sm:flex-row items-center justify-center mt-6 space-y-3 sm:space-y-0 sm:space-x-3"
            >
              <div
                class="w-10 h-10 bg-gray-400 dark:bg-gray-600 rounded-full animate-pulse"
              ></div>
              <div
                class="flex flex-col sm:flex-row sm:items-center sm:divide-x-2"
              >
                <div
                  class="pr-0 sm:pr-3 w-24 h-4 bg-gray-400 dark:bg-gray-600 rounded animate-pulse"
                ></div>
                <div
                  class="pl-0 sm:pl-3 w-24 h-4 bg-gray-400 dark:bg-gray-600 rounded animate-pulse"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <swiper-container ref="swaiperContainerRef">
          <swiper-slide
            v-for="testimonial in data?.data"
            :key="testimonial.id"
            class="mb-10 px-4"
          >
            <figure
              v-show="testimonial.status === 'published'"
              class="w-full max-w-lg mx-auto text-center"
            >
              <Icon name="heroicons:chat-bubble-left-right" class="h-10 md:h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" />
              <blockquote>
                <p
                  class="text-lg md:text-2xl font-medium text-gray-900 dark:text-white"
                >
                  "{{ testimonial.message }}"
                </p>
              </blockquote>
              <figcaption
                class="flex flex-col sm:flex-row items-center justify-center mt-6 space-y-3 sm:space-y-0 sm:space-x-3"
              >
                 <NuxtImg
                   class="w-10 h-10 rounded-full"
                   :src="`${config.public.apiBaseUrl}/assets/${testimonial.image}`"
                   :quality="85"
                   format="webp"
                   loading="lazy"
                   alt="Profile Picture"
                   preset="avatar"
                   placeholder="[blurhash:data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJibHVyIj48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSI1Ii8+PC9maWx0ZXI+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNGM0Y0RjYiIGZpbHRlcj0idXJsKCNibHVyKSIvPjwvc3ZnPg==]"
                 />
                <div
                  class="flex flex-col sm:flex-row sm:items-center sm:divide-x-2 divide-gray-500 dark:divide-gray-700"
                >
                  <div
                    class="pr-0 sm:pr-3 font-medium text-gray-900 dark:text-white text-center sm:text-left"
                  >
                    {{ testimonial.name }}
                  </div>
                  <div
                    class="pl-0 sm:pl-3 text-sm font-light text-gray-500 dark:text-gray-400 text-center sm:text-left"
                  >
                    {{ testimonial.position }}
                  </div>
                </div>
              </figcaption>
            </figure>
          </swiper-slide>
        </swiper-container>
      </div>
    </section>
  </ClientOnly>
</template>
