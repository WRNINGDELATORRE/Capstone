<template>
    <q-card class="announcement-card">
      <q-card-section>
        <div class="q-gutter-sm">
          <div class="announcement-header">
            <div class="announcement-title">{{ announcement.title }}</div>
            <div class="announcement-date">{{ formatDate(announcement.date) }}</div>
          </div>
          <q-separator />
          <p class="announcement-description">{{ announcement.description }}</p>
          <q-btn color="primary" label="View More" @click="viewAnnouncementDetails" />
        </div>
      </q-card-section>
    </q-card>
  </template>
  
  <script>
  export default {
    props: {
      announcement: Object,
    },
    methods: {
      formatDate(date) {
        return new Date(date).toLocaleDateString();
      },
      viewAnnouncementDetails() {
        // Logic for viewing announcement details
      }
    }
  };
  </script>
  
  <style scoped>
  .announcement-card {
    padding: 16px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .announcement-header {
    display: flex;
    justify-content: space-between;
  }
  
  .announcement-title {
    font-size: 1.2em;
    font-weight: bold;
  }
  
  .announcement-date {
    font-size: 0.9em;
    color: #777;
  }
  
  .announcement-description {
    margin-top: 10px;
    color: #555;
  }
  
  q-btn {
    margin-top: 10px;
  }
  </style>
  