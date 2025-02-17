<script setup>
import Footer from '~/pages/components/Footer.vue';
import Header from '~/pages/components/Header.vue';

</script>

<template>
    <div>
        <Header />
        <slot />
        <Footer />
    </div>
</template>