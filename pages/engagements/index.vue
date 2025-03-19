<script setup>
import ContactUs from "~/components/contact-us/ContactUs.vue";
import ClientEngagements from "~/components/engagements/ClientEngagements.vue";
import EngagementHero from "~/components/engagements/EngagementHero.vue";

useHead({
  title:
    "Scholarly Impact Consulting Co. | Partner with Experts to Drive Change",
  meta: [
    {
      name: "description",
      content:
        "Partner with Scholarly Impact Consulting Co. to drive meaningful change. Our team of experts delivers data-driven insights and strategic solutions to help your business navigate challenges and seize opportunities.",
    },
    {
      name: "keywords",
      content:
        "business partnership, data-driven insights, strategic solutions, consulting collaboration, business growth, Scholarly Impact Consulting Co.",
    },
    {
      property: "og:title",
      content:
        "Scholarly Impact Consulting Co. | Partner with Experts to Drive Change",
    },
    {
      property: "og:description",
      content:
        "Partner with Scholarly Impact Consulting Co. to drive meaningful change. Our team of experts delivers data-driven insights and strategic solutions to help your business navigate challenges and seize opportunities.",
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
  <section class="bg-white dark:bg-gray-900">
    <EngagementHero />
    <ClientEngagements />
    <ContactUs />
  </section>
</template>
