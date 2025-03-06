<script setup>
import ContactUs from '~/components/contact-us/ContactUs.vue';
import CareersHero from './components/CareersHero.vue';
import JobOpenings from './components/JobOpenings.vue';
import PerksAndBenefits from './components/PerksAndBenefits.vue';

useHead({
    title: "Scholarly Impact Consulting Co. | Careers",
    meta: [
        {
            name: 'description',
            content: 'Build a career in consulting with Scholarly. Explore opportunities to work on impactful projects with a team of data-driven experts.'
        },
        {
            name: 'keywords',
            content: 'consulting careers, data analyst jobs, business consultant jobs, join our team'
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