<script setup>
import DarkModeSwitchButton from './DarkModeSwitchButton.vue';

const route = useRoute()
const showNavDropdown = ref(false)

const toggleNavDropdown = () => {
    showNavDropdown.value = !showNavDropdown.value
}

const handleNavbarToggle = (event) => {
    if (event.target.closest(".filter-button")) {
        toggleNavDropdown()
    } else {
        showNavDropdown.value = false
    }
};

const scrollToContact = () => {
    const contactUsSection = document.getElementById("contact-us");
    if (contactUsSection) {
        contactUsSection.scrollIntoView({ behavior: "smooth" });
    }
};

onMounted(() => {
    document.addEventListener('click', handleNavbarToggle);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleNavbarToggle);
});
</script>

<template>
    <header>
        <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 fixed w-full top-0 z-50">
            <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-lg">
                <NuxtLink to="/" class="flex items-center">
                    <img src="/assets/images/scholarly-logo-light.png" class="mr-3 h-6 sm:h-9 block dark:hidden"
                        alt="Flowbite Logo" />
                    <img src="/assets/images/scholarly-logo-dark.png" class="mr-3 h-6 sm:h-9 hidden dark:block"
                        alt="Flowbite Logo" />
                </NuxtLink>
                <div class="flex items-center lg:order-2 gap-2">
                    <DarkModeSwitchButton />
                    <button @click="scrollToContact"
                        class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Contact
                        Us</button>
                    <button type="button"
                        class="filter-button inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-expanded="false">
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>
                <div class="justify-between items-center w-full lg:flex lg:w-auto lg:order-1 relative"
                    :class="{ 'hidden': !showNavDropdown }">
                    <ul
                        class="w-full flex lg:hidden flex-col shadow-lg font-medium lg:flex-row lg:space-x-8 lg:mt-0 absolute top-0 bg-white border-gray-200 py-2.5 dark:bg-gray-800 z-50">
                        <li>
                            <NuxtLink to="/" class="block py-2 pr-4 pl-3 rounded lg:p-0"
                                :class="{ 'active-nav': route.name === 'index', 'inactive-nav': route.name !== 'index' }">
                                Home
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/services" class="block py-2 pr-4 pl-3 rounded lg:p-0"
                                :class="{ 'active-nav': route.name === 'services', 'inactive-nav': route.name !== 'services' }">
                                Services</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/resources" class="block py-2 pr-4 pl-3 rounded lg:p-0"
                                :class="{ 'active-nav': route.name === 'resources', 'inactive-nav': route.name !== 'resources' }">
                                Careers</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/careers" class="block py-2 pr-4 pl-3 rounded lg:p-0"
                                :class="{ 'active-nav': route.name === 'careers', 'inactive-nav': route.name !== 'careers' }">
                                Resources</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/about" class="block py-2 pr-4 pl-3 rounded lg:p-0"
                                :class="{ 'active-nav': route.name === 'about', 'inactive-nav': route.name !== 'about' }">
                                About</NuxtLink>
                        </li>
                    </ul>
                    <ul class="hidden lg:flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                        <li>
                            <NuxtLink to="/" class="block py-2 pr-4 pl-3 rounded lg:p-0"
                                :class="{ 'active-nav': route.name === 'index', 'inactive-nav': route.name !== 'index' }">
                                Home
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/services" class="block py-2 pr-4 pl-3 rounded lg:p-0"
                                :class="{ 'active-nav': route.name === 'services', 'inactive-nav': route.name !== 'services' }">
                                Services</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/careers" class="block py-2 pr-4 pl-3 rounded lg:p-0"
                                :class="{ 'active-nav': route.name === 'careers', 'inactive-nav': route.name !== 'careers' }">
                                Careers</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/resources" class="block py-2 pr-4 pl-3 rounded lg:p-0"
                                :class="{ 'active-nav': route.name === 'resources', 'inactive-nav': route.name !== 'resources' }">
                                Resources</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/about" class="block py-2 pr-4 pl-3 rounded lg:p-0"
                                :class="{ 'active-nav': route.name === 'about', 'inactive-nav': route.name !== 'about' }">
                                About</NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>