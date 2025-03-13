<script setup>
import Chatbox from '~/components/chatbox/Chatbox.vue';
import Footer from '~/components/footer/Footer.vue';
import Navbar from '~/components/navbar/Navbar.vue';
</script>

<template>
    <div>
        <Navbar />
        <div class="mt-10">
            <slot />
        </div>
        <Chatbox />
        <Footer />
    </div>
</template>