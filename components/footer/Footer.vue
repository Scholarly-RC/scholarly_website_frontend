<script setup>
import FooterBranding from './FooterBranding.vue';
import FooterNavigation from './FooterNavigation.vue';
</script>

<template>
    <footer class="p-4 bg-white sm:p-6 dark:bg-gray-800">
        <div class="mx-auto max-w-screen-lg">
            <div class="md:flex md:justify-between">
                <FooterBranding />
                <FooterNavigation />
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div class="sm:flex sm:items-center sm:justify-between">
                <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {{ new Date().getFullYear() }}
                    Scholarly. All Rights
                    Reserved.
                </span>
                <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                    <a href="https://www.facebook.com/profile.php?id=61557278528125"
                        class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                        <Icon name="heroicons:facebook" class="w-5 h-5" />
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>