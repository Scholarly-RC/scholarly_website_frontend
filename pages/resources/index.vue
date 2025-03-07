<script setup>
import ContactUs from '~/components/contact-us/ContactUs.vue';
import FeaturedBooks from './components/FeaturedBooks.vue';
import ResourcesHero from './components/ResourcesHero.vue';
import OrderButton from './components/OrderButton.vue';

useHead({
    title: "Scholarly Impact Consulting Co. | Resources - Curated Insights for Professionals",
    meta: [
        {
            name: 'description',
            content: 'Explore Scholarly Impact Consulting Co.\'s curated selection of books and resources designed to empower professionals, entrepreneurs, and researchers with data-driven strategies and industry expertise.'
        },
        {
            name: 'keywords',
            content: 'professional resources, business books, data-driven strategies, industry insights, research tools, Scholarly Impact Consulting Co.'
        },
        {
            property: 'og:title',
            content: 'Scholarly Impact Consulting Co. | Resources - Curated Insights for Professionals'
        },
        {
            property: 'og:description',
            content: 'Explore Scholarly Impact Consulting Co.\'s curated selection of books and resources designed to empower professionals, entrepreneurs, and researchers with data-driven strategies and industry expertise.'
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
        <ResourcesHero />
        <FeaturedBooks />
        <OrderButton />
        <ContactUs />
    </div>
</template>