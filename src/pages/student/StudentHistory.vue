<template>
  <q-page padding>
    <div class="layout-container">
      <!-- Title and Separator -->
      <div class="title-section q-mb-md">
        <h4 class="text-h4 q-mb-sm">Upcoming Events</h4>
        <q-separator color="primary" />
      </div>
      <!-- Event Cards -->
      <div class="events-container row q-col-gutter-md">
        <div v-for="event in events" :key="event.id" class="col-12 col-sm-6 col-md-3">
          <EventCard :event="event" @view-details="onViewDetails" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import EventCard from 'components/EventCard.vue';

import sample from 'src/assets/images/qq.jpg';
export default {
  components: {
    EventCard,
  },
  data() {
    return {
      events: [
        { id: 1, title: 'School Fair', date: '2024-10-15', description: 'Join us for the annual school fair.', image: 'https://cdn.quasar.dev/img/parallax1.jpg' },
        { id: 2, title: 'Sports Fest', date: '2024-11-05', description: 'A day full of sports activities.', image: 'src/assets/images/xmas.jpg' },
        { id: 3, title: 'Music Concert', date: '2024-12-10', description: 'Experience live music performances.', image: sample },
        { id: 4, title: 'Music Concert', date: '2024-12-10', description: 'Experience live music performances.', image: sample },
        { id: 4, title: 'Music Concert', date: '2024-12-10', description: 'Experience live music performances.', image: sample }
      ],
    };
  },
  methods: {
    onViewDetails(event) {
      // Handle view details action
      console.log('View details for event:', event.title);
    }
  }
};
</script>

<style scoped>
.layout-container {
  max-width: 1200px;
  margin: 0 auto;
}

.title-section {
  margin-bottom: 2rem;
}
</style>
