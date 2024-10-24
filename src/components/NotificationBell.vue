<template>
    <q-btn flat round icon="notifications" @click="goNotify" class="nav-icon" />
  </template>
  
  <script>
  export default {
    methods: {
      goNotify() {
        this.$router.push('/notify');
      }
    }
  };
  </script>
  