<template>
    <q-page class="q-pa-md">
      <div class="forum-container">
        <q-toolbar class="q-mb-md">
          <q-input v-model="search" label="Search Forums" outlined />
          <q-btn label="Create New Post" color="primary" class="q-ml-md" />
        </q-toolbar>
  
        <q-list>
          <q-item-label header>Forum Categories</q-item-label>
          <q-item v-for="category in filteredCategories" :key="category.id" clickable @click="goToCategory(category.id)">
            <q-item-section avatar>
              <q-icon name="folder" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ category.name }}</q-item-label>
              <q-item-label caption>{{ category.description }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>{{ category.lastActive }} | {{ category.posts }} posts</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-page>
  </template>
  
  <script>
  export default {
    data() {
      return {
        search: '',
        categories: [
          { id: 1, name: 'General Discussions', description: 'Discuss anything', lastActive: '2 hours ago', posts: 120 },
          { id: 2, name: 'Events', description: 'Talk about upcoming events', lastActive: '1 day ago', posts: 45 },
          // Add more categories here
        ]
      };
    },
    computed: {
      filteredCategories() {
        return this.categories.filter(category => category.name.toLowerCase().includes(this.search.toLowerCase()));
      }
    },
    methods: {
      goToCategory(id) {
        this.$router.push({ name: 'category', params: { id } });
      }
    }
  };
  </script>
  
  <style scoped>
  .forum-container {
    max-width: 900px;
    margin: 0 auto;
  }
  </style>
  