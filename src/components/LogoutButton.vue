<template>
    <q-btn flat color="negative" @click="logout" label="Logout" />
  </template>
  
  <script>
  import auth from '../store/auth' // Adjust the path according to your file structure
  
  export default {
    methods: {
      logout() {
        auth.logout(); // Call the logout method from auth.js
        this.$router.push('/login'); // Redirect to the login page after logout
      }
    }
  }
  </script>
  
  <style scoped>
  /* You can add styles here if needed */
  </style>
  