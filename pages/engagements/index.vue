<script setup>
import ContactUs from '~/components/contact-us/ContactUs.vue';
import ClientEngagements from './components/ClientEngagements.vue';
import EngagementHero from './components/EngagementHero.vue';

</script>
<template>
    <section class="bg-white dark:bg-gray-900">
        <EngagementHero />
        <ClientEngagements />
        <ContactUs />
    </section>
</template>