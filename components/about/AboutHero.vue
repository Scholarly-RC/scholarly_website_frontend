<script setup>
const config = useRuntimeConfig();
const { data, status, error } = useFetch(
  `${config.public.apiBaseUrl}/items/about_hero_section/`,
  {
    method: "get",
    server: true,
    onResponseError: ({ response }) => {
      console.error('Failed to fetch about hero data:', response?.status, response?.statusText)
    }
  }
);
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div
      v-if="status === 'pending'"
      class="animate-pulse gap-16 items-center py-8 px-4 mx-auto max-w-screen-lg lg:grid lg:grid-cols-2 lg:py-16 lg:px-6"
    >
      <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
        <div class="h-10 w-3/4 bg-gray-400 rounded mb-4"></div>
        <div class="h-6 w-full bg-gray-300 rounded mb-4"></div>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-8">
        <div class="w-full h-40 bg-gray-300 rounded-lg"></div>
        <div class="mt-4 w-full h-40 lg:mt-10 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
     <div v-else-if="status === 'error'">
       <!-- Fallback content when API fails -->
       <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-lg lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
         <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
           <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
             About Scholarly Impact Consulting
           </h2>
           <p class="mb-4">We are dedicated to transforming educational institutions through innovative consulting solutions and strategic guidance.</p>
         </div>
         <div class="grid grid-cols-2 gap-4 mt-8">
           <div class="w-full h-32 bg-gray-300 rounded-lg flex items-center justify-center">
             <span class="text-gray-500">Image 1</span>
           </div>
           <div class="mt-4 w-full lg:mt-10 h-32 bg-gray-300 rounded-lg flex items-center justify-center">
             <span class="text-gray-500">Image 2</span>
           </div>
         </div>
       </div>
     </div>
     <div v-else>
       <div
         v-show="data?.data?.status === 'published'"
         class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-lg lg:grid lg:grid-cols-2 lg:py-16 lg:px-6"
       >
         <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
           <h2
             class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white"
           >
             {{ data.data.title }}
           </h2>
           <p class="mb-4">{{ data.data.description }}</p>
         </div>
          <div class="grid grid-cols-2 gap-4 mt-8">
            <NuxtImg
              class="w-full rounded-lg"
              :src="`${config.public.apiBaseUrl}/assets/${data.data.image_1}`"
              :quality="85"
              format="webp"
              loading="lazy"
              alt="About Page Image 1"
              preset="thumbnail"
              placeholder="[blurhash:data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJibHVyIj48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyMCIvPjwvZmlsdGVyPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRjNGNEY2IiBmaWx0ZXI9InVybCgjYmx1cikiLz48L3N2Zz4=]"
            />
            <NuxtImg
              class="mt-4 w-full lg:mt-10 rounded-lg"
              :src="`${config.public.apiBaseUrl}/assets/${data.data.image_2}`"
              :quality="85"
              format="webp"
              loading="lazy"
              alt="About Page Image 2"
              preset="thumbnail"
              placeholder="[blurhash:data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJibHVyIj48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyMCIvPjwvZmlsdGVyPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRjNGNEY2IiBmaWx0ZXI9InVybCgjYmx1cikiLz48L3N2Zz4=]"
            />
          </div>
       </div>
     </div>
  </section>
</template>
