<template>
    <q-header elevated class="custom-navbar">
      <q-toolbar>
        <!-- Menu Button for Desktop and Mobile -->
        <q-btn
          flat
          icon="menu"
          @click="$emit('toggle-drawer')"
          class="menu-button"
        />
  
        <div>
          <q-toolbar-title>Lost & Found</q-toolbar-title>
        </div>
  
        <!-- Search Bar Component -->
        <SearchBar />

        <!-- Add New Lost/Found Item Button -->
      <q-btn
        flat
        icon="add_circle"
        color="primary"
        @click="goToPostLostFound"
        class="post-button"
      />
  
        <!-- Notification Bell Component -->
        <NotificationBell />
  
        <!-- Profile Avatar Component -->
        <ProfileAvatar />

        
      </q-toolbar>
    </q-header>
  </template>
  
  <script>
  import SearchBar from './SearchBar.vue';
  import NotificationBell from './NotificationBell.vue';
  import ProfileAvatar from './ProfileAvatar.vue';
  
  export default {
    components: {
      SearchBar,
      NotificationBell,
      ProfileAvatar,
    },
    methods: {
    goToPostLostFound() {
      this.$router.push('/post-lost-found'); // Redirect to the post page
    }
  }
  };
  </script>
  
  <style scoped>
  .custom-navbar {
    background-color: #96c192;
    color: rgb(11, 11, 11);
  }
  .menu-button {
    margin-right: 10px; /* Adjust space between the button and title */
  }
  </style>
  