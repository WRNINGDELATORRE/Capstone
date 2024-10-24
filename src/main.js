import { createApp } from 'vue';
import App from './App.vue';
import { Quasar } from 'quasar';
import router from './router'; // Import the router
import store from './store'
import 'material-design-icons-iconfont/dist/material-design-icons.css';
// import store from './store'

const app = createApp(App);

app.use(Quasar, {
  config: {
    // Quasar configuration options
  },
});

app.use(router); // Use the router

// Function to detect mobile devices
const isMobile = () => {
  return window.innerWidth <= 768; // Adjust the width as needed
};

// Watch for dark mode changes
app.mixin({
  mounted() {
    this.$q.dark.set(this.$q.dark.isActive);
    document.body.classList.toggle('dark-mode', this.$q.dark.isActive);
    document.body.classList.toggle('mobile', isMobile());

    // Update classes on window resize
    window.addEventListener('resize', () => {
      document.body.classList.toggle('mobile', isMobile());
    });
  },
  beforeUnmount() { // Changed from beforeDestroy to beforeUnmount for Vue 3
    window.removeEventListener('resize', () => {
      document.body.classList.toggle('mobile', isMobile());
    });
  },
});

app.use(store);
app.mount('#app');