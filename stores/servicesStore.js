import { defineStore } from "pinia";

export const useServicesStore = defineStore("servicesStore", {
  state: () => ({
    isOpen: false,
    content: null,
  }),
  actions: {
    open(content) {
      this.content = content;
      this.isOpen = true;
    },
    close() {
      this.content = null;
      this.isOpen = false;
    },
  },
});
