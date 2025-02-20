<script setup>
import Footer from '~/pages/components/footer/Footer.vue';
import Header from '~/pages/components/Header.vue';
</script>

<template>
    <div>
        <Header />
        <slot />
        <Footer />
    </div>
</template>

<style scoped>
div {
    font-family: 'Montserrat', sans-serif;
}
</style>