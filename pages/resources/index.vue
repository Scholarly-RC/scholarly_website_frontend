<script setup>
import ContactUs from '~/components/contact-us/ContactUs.vue';
import FeaturedBooks from './components/FeaturedBooks.vue';
import ResourcesHero from './components/ResourcesHero.vue';

useHead({
    title: "Scholarly Impact Consulting Co. | Resources",
    meta: [
        {
            name: 'description',
            content: 'Access expert-curated resources: whitepapers, case studies, and data-driven guides to empower your business decisions.'
        },
        {
            name: 'keywords',
            content: 'business resources, industry insights, case studies, whitepapers, data-driven guides'
        }
    ]
})
</script>

<template>
    <div>
        <ResourcesHero />
        <FeaturedBooks />
        <ContactUs />
    </div>
</template>