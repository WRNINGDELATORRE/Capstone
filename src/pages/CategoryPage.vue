<template>
    <q-page class="q-pa-md">
      <div class="forum-container">
        <q-toolbar class="q-mb-md">
          <q-input v-model="search" label="Search Threads" outlined />
        </q-toolbar>
  
        <q-list>
          <q-item-label header>Threads in {{ categoryName }}</q-item-label>
          <q-item v-for="thread in filteredThreads" :key="thread.id" clickable @click="goToThread(thread.id)">
            <q-item-section>
              <q-item-label>{{ thread.title }}</q-item-label>
              <q-item-label caption>Posted by {{ thread.author }} | {{ thread.lastReply }} ago | {{ thread.replies }} replies</q-item-label>
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
        categoryName: 'General Discussions', // Set dynamically based on route param
        threads: [
          { id: 1, title: 'How to use the forum', author: 'Admin', lastReply: '10 minutes', replies: 5 },
          { id: 2, title: 'Upcoming event discussion', author: 'User123', lastReply: '2 hours', replies: 12 },
          { id: 1, title: 'How to use the forum', author: 'Admin', lastReply: '10 minutes', replies: 5 },
          { id: 2, title: 'Upcoming event discussion', author: 'User123', lastReply: '2 hours', replies: 12 },
          // Add more threads here
        ]
      };
    },
    computed: {
      filteredThreads() {
        return this.threads.filter(thread => thread.title.toLowerCase().includes(this.search.toLowerCase()));
      }
    },
    methods: {
      goToThread(id) {
        this.$router.push({ name: 'thread', params: { id } });
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
  