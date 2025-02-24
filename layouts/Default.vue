<script setup>
import Footer from '~/components/footer/Footer.vue';
import Navbar from '~/components/navbar/Navbar.vue';
</script>

<template>
    <div>
        <Navbar />
        <div class="mt-10">
            <slot />
        </div>
        <Footer />
    </div>
</template>

<style scoped>
div {
    font-family: 'Montserrat', sans-serif;
}
</style>