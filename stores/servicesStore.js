import { defineStore } from "pinia";

export const useServicesStore = defineStore("servicesStore", {
  state: () => ({
    isOpen: false,
    images: null,
  }),
  actions: {
    open(images) {
      this.images = images;
      this.isOpen = true;
    },
    close() {
      this.images = null;
      this.isOpen = false;
    },
  },
});
