<script setup>
import Card from "~/components/ui/card/Card.vue";
import Button from "~/components/ui/button/Button.vue";
import Dialog from "~/components/ui/dialog/Dialog.vue";
import DialogContent from "~/components/ui/dialog/DialogContent.vue";
import DialogHeader from "~/components/ui/dialog/DialogHeader.vue";
import DialogTitle from "~/components/ui/dialog/DialogTitle.vue";
import DialogTrigger from "~/components/ui/dialog/DialogTrigger.vue";
import DialogClose from "~/components/ui/dialog/DialogClose.vue";

const config = useRuntimeConfig();
const props = defineProps({
	book: Object,
});

const dialogOpen = ref(false);
</script>

<template>
  <div v-show="book.status === 'published'" class="w-full flex flex-col items-center mb-10">
    <Card class="w-full h-[25rem] max-w-[20rem] hover:shadow-lg transition-shadow duration-300">
      <img
        class="w-full h-full object-cover rounded-lg"
        :src="`${config.public.apiBaseUrl}/assets/${book.image}/?quality=85&format=webp`"
        loading="lazy"
        :alt="`Book ${book.id} Alt Image`"
      />
      <div class="p-4">
        <Dialog v-model:open="dialogOpen">
          <DialogTrigger as-child>
            <Button variant="outline" class="w-full">
              Show Info
            </Button>
          </DialogTrigger>
          <DialogContent class="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <DialogHeader>
              <DialogTitle>Book Information</DialogTitle>
            </DialogHeader>
            <div class="overflow-y-auto max-h-96">
              <ClientOnly>
                <div
                  v-html="book.info"
                  class="no-tailwindcss-base text-gray-900 dark:text-white"
                ></div>
              </ClientOnly>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  </div>
</template>


