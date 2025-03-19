<script setup>
import AboutHero from "~/components/about/AboutHero.vue";
import Faq from "~/components/about/Faq.vue";
import OurTeam from "~/components/about/OurTeam.vue";
import ContactUs from "~/components/contact-us/ContactUs.vue";

useHead({
  title:
    "Scholarly Impact Consulting Co. | About Us - Empower, Innovate, Excel",
  meta: [
    {
      name: "description",
      content:
        "At Scholarly Impact Consulting Co., we empower organizations to innovate and excel. As a trusted partner, we deliver data-driven solutions and expert guidance to drive organizational growth.",
    },
    {
      name: "keywords",
      content:
        "about us, data-driven solutions, organizational growth, expert guidance, consulting firm, Scholarly Impact Consulting Co.",
    },
    {
      property: "og:title",
      content:
        "Scholarly Impact Consulting Co. | About Us - Empower, Innovate, Excel",
    },
    {
      property: "og:description",
      content:
        "At Scholarly Impact Consulting Co., we empower organizations to innovate and excel. As a trusted partner, we deliver data-driven solutions and expert guidance to drive organizational growth.",
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
    <AboutHero />
    <OurTeam />
    <Faq />
    <ContactUs />
  </div>
</template>
