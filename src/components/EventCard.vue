<template>
    <q-card class="event-card">
      <q-img :src="event.image" class="event-image">
        <div class="text-h5 absolute-bottom text-left">
          {{ event.title }}
        </div>
      </q-img>
      <q-card-section>
        <div class="q-gutter-sm">
          <div class="event-date">{{ formatDate(event.date) }}</div>
          <p class="event-description">{{ event.description }}</p>
          <q-btn color="primary" label="View Details" @click="viewEventDetails" />
        </div>
      </q-card-section>
    </q-card>
  </template>
  
  <script>
  export default {
    
    props: {
      event: Object,
    },
    methods: {
      formatDate(date) {
        return new Date(date).toLocaleDateString();
      },
      viewEventDetails() {
        // Emit an event to notify the parent component
        this.$emit('view-details', this.event);
      }
    }
  };
  </script>
  
  <style scoped>
  .event-card {
    padding: 0; /* No padding on card for full image display */
    
  }
  
  .event-image {
    height: 200px; /* Adjust height as needed */
  }
  
  .event-date {
    font-size: 0.9em;
    color: #777;
  }
  
  .event-description {
    margin-top: 10px;
    color: #555;
  }
  
  q-btn {
    margin-top: 10px;
  }
  </style>
  