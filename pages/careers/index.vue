<script setup>
import ContactUs from '~/components/contact-us/ContactUs.vue';
import CareersHero from './components/CareersHero.vue';
import JobOpenings from './components/JobOpenings.vue';
import PerksAndBenefits from './components/PerksAndBenefits.vue';

useHead({
    title: "Scholarly Impact Consulting Co. | Careers - Join Our Team",
    meta: [
        // Standard Meta Tags
        {
            name: 'description',
            content: 'Join Scholarly Impact Consulting Co. and be part of a team dedicated to providing innovative, data-driven solutions. Explore career opportunities and grow with us.'
        },
        {
            name: 'keywords',
            content: 'careers, job opportunities, consulting careers, join our team, data-driven consulting, Scholarly Impact Consulting Co.'
        },

        // Open Graph (og) Tags
        {
            property: 'og:title',
            content: 'Scholarly Impact Consulting Co. | Careers - Join Our Team'
        },
        {
            property: 'og:description',
            content: 'Join Scholarly Impact Consulting Co. and be part of a team dedicated to providing innovative, data-driven solutions. Explore career opportunities and grow with us.'
        },
        {
            property: 'og:type',
            content: 'website'
        },
        {
            property: 'og:url',
            content: 'https://www.scholarlyconsulting.co'
        },
        {
            property: 'og:image',
            content: 'https://directus-production-a710.up.railway.app/assets/7bdd98d1-0320-45c1-8f29-92c05efee905'
        },
        {
            property: 'og:site_name',
            content: 'Scholarly Impact Consulting Co.'
        }
    ]
})
</script>

<template>
    <div>
        <CareersHero />
        <PerksAndBenefits />
        <JobOpenings />
        <ContactUs />
    </div>
</template>