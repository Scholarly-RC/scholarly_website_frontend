<script setup>
import ServicesImageInfo from "./ServicesImageInfo.vue";
import { Dialog, DialogContent } from "~/components/ui/dialog";

const servicesStore = useServicesStore();
const { isOpen, images } = storeToRefs(servicesStore);
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="max-w-3xl p-9">
      <div class="max-h-[70vh] md:max-h-[75vh] overflow-y-auto">
        <ServicesImageInfo v-for="(image, index) in images" :key="image" :image-id="image" :index="index" />
      </div>
    </DialogContent>
  </Dialog>
</template>
