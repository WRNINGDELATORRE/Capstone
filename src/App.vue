<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted, onBeforeUnmount } from 'vue';

export default defineComponent({
  name: 'App',
  setup() {
    // Function to detect mobile devices
    const isMobile = () => {
      return window.innerWidth <= 768; // Adjust the width as needed
    };

    // Function to apply or remove the 'mobile' class
    const setMobileClass = () => {
      if (isMobile()) {
        document.body.classList.add('mobile');
      } else {
        document.body.classList.remove('mobile');
      }
    };

    onMounted(() => {
      setMobileClass(); // Set initial class

      // Update class on window resize
      window.addEventListener('resize', setMobileClass);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', setMobileClass);
    });
  },
});
</script>

<style>
/* Styles for mobile */
body.mobile {
  font-size: 14px; /* Adjust font size for mobile */
  /* Add any other mobile-specific styles here */
}
</style>
