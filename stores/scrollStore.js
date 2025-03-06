import { defineStore } from "pinia";

export const useScrollStore = defineStore("scrollStore", {
  state: () => ({
    isClicked: false,
    isGetStartedClicked: false,
  }),
  actions: {
    scrollToContact() {
      const contactUsSection = document.getElementById("contact-us");
      if (contactUsSection) {
        contactUsSection.scrollIntoView({ behavior: "smooth" });
      }
      this.isClicked = true;
      setTimeout(() => {
        this.isClicked = false;
      }, 1000);
    },
    getStartedClicked() {
      this.isGetStartedClicked = true;
      setTimeout(() => {
        this.isGetStartedClicked = false;
      }, 1000);
    },
  },
});
