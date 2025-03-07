<script setup>
import FeatureSection from './components/feature/FeatureSection.vue';
import HeroSection from './components/HeroSection.vue';
import TestimonialsSection from './components/TestimonialsSection.vue';

useHead({
    title: 'Scholarly Impact Consulting Co. | Innovative, Data-Driven Solutions',
    meta: [
        {
            name: 'description',
            content: 'Scholarly Impact Consulting Co. is a team of consultants dedicated to providing innovative, data-driven solutions to complex problems. We help businesses of all sizes achieve their goals.'
        },
        {
            name: 'keywords',
            content: 'data-driven consulting, business solutions, innovative strategies, tailored services, Scholarly Impact Consulting Co.'
        },
        {
            property: 'og:title',
            content: 'Scholarly Impact Consulting Co. | Innovative, Data-Driven Solutions'
        },
        {
            property: 'og:description',
            content: 'Scholarly Impact Consulting Co. is a team of consultants dedicated to providing innovative, data-driven solutions to complex problems. We help businesses of all sizes achieve their goals.'
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
        },
    ]
})
</script>

<template>
    <div>
        <HeroSection />
        <FeatureSection />
        <TestimonialsSection />
        <ContactUs />
    </div>
</template>