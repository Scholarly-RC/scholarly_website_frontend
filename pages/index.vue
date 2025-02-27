<script setup>
import FeatureSection from './components/feature/FeatureSection.vue';
import HeroSection from './components/HeroSection.vue';
import TestimonialsSection from './components/TestimonialsSection.vue';

useHead({
    title: "Scholarly Impact Consulting Co."
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