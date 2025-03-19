<script setup>
import ContactUs from "~/components/contact-us/ContactUs.vue";
import ServicesHero from "~/components/services/ServicesHero.vue";
import ServicesInfoModal from "~/components/services/ServicesInfoModal.vue";
import ServicesOfferedSection from "~/components/services/ServicesOfferedSection.vue";

useHead({
  title: "Scholarly Impact Consulting Co. | Comprehensive Consulting Services",
  meta: [
    {
      name: "description",
      content:
        "Explore our wide range of consulting services at Scholarly Impact Consulting Co., including Business and Management Consulting, Research Administration, Professional Development, Accounting and Auditing, and IT Services. Tailored solutions for your business needs.",
    },
    {
      name: "keywords",
      content:
        "business consulting, strategic planning, research administration, professional development, accounting services, IT solutions, HR consulting, data analysis, organizational performance, Scholarly Impact Consulting Co.",
    },
    {
      property: "og:title",
      content:
        "Scholarly Impact Consulting Co. | Comprehensive Consulting Services",
    },
    {
      property: "og:description",
      content:
        "Explore our wide range of consulting services at Scholarly Impact Consulting Co., including Business and Management Consulting, Research Administration, Professional Development, Accounting and Auditing, and IT Services. Tailored solutions for your business needs.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://www.scholarlyconsulting.co",
    },
    {
      property: "og:image",
      content:
        "https://directus-production-a710.up.railway.app/assets/7bdd98d1-0320-45c1-8f29-92c05efee905",
    },
    {
      property: "og:site_name",
      content: "Scholarly Impact Consulting Co.",
    },
  ],
});
</script>
<template>
  <div>
    <ServicesHero />
    <ServicesOfferedSection />
    <ContactUs />
    <ServicesInfoModal />
  </div>
</template>
