<script setup>
import ContactUs from '~/components/contact-us/ContactUs.vue';
import AboutHero from './components/AboutHero.vue';
import Faq from './components/Faq.vue';
import OurTeam from './components/OurTeam.vue';

useHead({
    title: "Scholarly Impact Consulting Co. | About",
    meta: [
        {
            name: 'description',
            content: 'Learn about Scholarly Consulting: A team of experts committed to solving complex challenges with data-driven innovation since [year].'
        },
        {
            name: 'keywords',
            content: 'about Scholarly, consulting experts, company mission, our team, data-driven approach'
        }
    ]
})
</script>

<template>
    <div>
        <AboutHero />
        <OurTeam />
        <Faq />
        <ContactUs />
    </div>
</template>