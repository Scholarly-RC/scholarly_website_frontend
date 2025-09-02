<script setup>
const config = useRuntimeConfig();
const { data, status, error } = useFetch(
  `${config.public.apiBaseUrl}/items/hero/`,
  {
    method: "get",
    server: true,
    onResponseError: ({ response }) => {
      console.error('Failed to fetch hero data:', response?.status, response?.statusText)
    }
  }
);
const scrollStore = useScrollStore();
const { isGetStartedClicked } = storeToRefs(scrollStore);
</script>

<template>
  <section class="bg-white dark:bg-gray-900">
    <div
      v-if="status === 'pending'"
      class="relative w-full bg-gray-300 animate-pulse"
    >
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
      <div class="relative max-w-screen-lg px-4 py-16 mx-auto">
        <div
          class="max-w-lg mx-auto p-6 bg-black bg-opacity-30 rounded-lg lg:mx-0"
        >
          <div class="h-10 w-3/4 bg-gray-400 rounded animate-pulse"></div>
          <div class="mt-4 h-6 w-5/6 bg-gray-400 rounded animate-pulse"></div>
          <div class="mt-6 flex space-x-4">
            <div class="h-12 w-32 bg-gray-500 rounded-lg animate-pulse"></div>
            <div class="h-12 w-32 bg-gray-500 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
     <div v-else-if="status === 'error'">
       <!-- Fallback content when API fails -->
       <div class="relative w-full bg-gradient-to-r from-primary-600 to-primary-800">
         <div class="absolute inset-0 bg-black bg-opacity-30"></div>
         <div class="relative max-w-screen-lg px-4 py-16 mx-auto">
           <div class="max-w-lg mx-auto p-6 bg-black bg-opacity-30 rounded-lg lg:mx-0">
             <h1 class="text-4xl font-extrabold tracking-tight text-white md:text-5xl xl:text-6xl">
               Scholarly Impact Consulting
             </h1>
             <p class="mt-4 text-lg text-gray-200 md:text-xl">
               Empowering educational excellence through innovative consulting solutions.
             </p>
             <div class="flex flex-col sm:flex-row justify-start mt-6 w-full gap-2">
               <div>
                 <button
                   @click="scrollStore.getStartedClicked"
                   class="inline-flex items-center px-5 py-3 text-base font-medium text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                 >
                   Get Started
                   <Icon name="heroicons:arrow-right" class="w-5 h-5 ml-2 -mr-1" />
                 </button>
               </div>
               <div>
                 <button
                   @click="scrollStore.scrollToContact"
                   :class="{ 'animate-custom-bounce': isGetStartedClicked }"
                   class="inline-flex items-center px-5 py-3 text-base font-medium text-white border border-white rounded-lg hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-100"
                 >
                   Contact Us
                 </button>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
     <div v-else>
        <div
          v-show="data?.data?.status === 'published'"
          class="relative w-full bg-cover bg-center"
          :style="`background-image: url('${config.public.apiBaseUrl}/assets/${data.data?.image}/?quality=85&format=webp');`"
        >
          <!-- Hidden NuxtImg for optimization -->
          <NuxtImg
            :src="`${config.public.apiBaseUrl}/assets/${data.data?.image}`"
            :quality="85"
            format="webp"
            loading="eager"
            alt="Hero Background"
            preset="hero"
            class="opacity-0 absolute inset-0 w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black bg-opacity-50"></div>
         <div class="relative max-w-screen-lg px-4 py-16 mx-auto">
           <div
             class="max-w-lg mx-auto p-6 bg-black bg-opacity-30 rounded-lg lg:mx-0"
           >
             <h1
               class="text-4xl font-extrabold tracking-tight text-white md:text-5xl xl:text-6xl"
             >
               {{ data.data.title }}
             </h1>
             <p class="mt-4 text-lg text-gray-200 md:text-xl">
               {{ data.data.description }}
             </p>
             <div
               class="flex flex-col sm:flex-row justify-start mt-6 w-full gap-2"
             >
               <div>
                 <button
                   @click="scrollStore.getStartedClicked"
                   class="inline-flex items-center px-5 py-3 text-base font-medium text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                 >
                   {{ data.data.cta_button_1_text }}
                   <Icon name="heroicons:arrow-right" class="w-5 h-5 ml-2 -mr-1" />
                 </button>
               </div>
               <div>
                 <button
                   @click="scrollStore.scrollToContact"
                   :class="{ 'animate-custom-bounce': isGetStartedClicked }"
                   class="inline-flex items-center px-5 py-3 text-base font-medium text-white border border-white rounded-lg hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-100"
                 >
                   {{ data.data.cta_button_2_text }}
                 </button>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
  </section>
</template>
