<script setup>
import ContactUs from '~/components/contact-us/ContactUs.vue';
import ServicesHero from './components/ServicesHero.vue';
import ServicesOfferedSection from './components/ServicesOfferedSection.vue';
import ServicesInfoModal from './components/ServicesInfoModal.vue';

useHead({
    title: "Scholarly Impact Consulting Co. | Services",
    meta: [
        {
            name: 'description',
            content: 'Tailored consulting services including data analytics, process optimization, and strategic planning for businesses of all sizes.'
        },
        {
            name: 'keywords',
            content: 'consulting services, data analytics, business strategy, process optimization, market research'
        }
    ]
})
</script>
<template>
    <div>
        <ServicesHero />
        <ServicesOfferedSection />
        <ContactUs />
        <ServicesInfoModal />
    </div>
</template>