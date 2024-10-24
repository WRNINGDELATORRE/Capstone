<template>
    <div class="q-mx-md" style="flex: 1;">
      <q-input filled v-model="search" placeholder="Search..." class="search-input" />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        search: ''
      };
    }
  };
  </script>
  
  <style scoped>
  .search-input {
    max-width: 600px;
    border-radius: 50px !important;
  }
  </style>
  