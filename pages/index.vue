<script setup>
import FeatureSection from './components/feature/FeatureSection.vue';
import Hero from './components/Hero.vue';
import TestimonialsSection from './components/TestimonialsSection.vue';

useHead({
    title: "Scholarly Impact Consulting Co."
})
</script>

<template>
    <div>
        <Hero />
        <FeatureSection />
        <TestimonialsSection />
    </div>
</template>