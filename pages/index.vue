<script setup>
import FeatureSection from './components/feature/FeatureSection.vue';
import HeroSection from './components/HeroSection.vue';
import TestimonialsSection from './components/TestimonialsSection.vue';

useHead({
    title: "Scholarly Impact Consulting Co. | Home",
    meta: [
        {
            name: 'description',
            content: 'Scholarly Consulting delivers innovative, data-driven strategies to solve complex business challenges. Partner with us to achieve measurable growth.'
        },
        {
            name: 'keywords',
            content: 'business consulting, data-driven solutions, strategic planning, operational efficiency, growth strategies'
        }
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