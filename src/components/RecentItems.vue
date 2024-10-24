<template>
    <div>
      <q-tabs v-model="tab" class="bg-grey-2 text-grey-8" dense>
        <q-tab name="lost" label="Lost Items" />
        <q-tab name="found" label="Found Items" />
      </q-tabs>
  
      <q-separator />
  
      <div v-if="tab === 'lost'" class="q-mt-md">
        <q-card v-for="item in lostItems" :key="item.id" class="my-card">
          <q-img :src="item.image || placeholderImage" alt="Item Image" class="card-image" />
          <q-card-section>
            <h4>{{ item.name }}</h4>
            <p>Date Reported: {{ item.dateReported }}</p>
            <q-btn label="View Details" color="primary" @click="viewDetails(item.id)" />
          </q-card-section>
        </q-card>
      </div>
  
      <div v-else-if="tab === 'found'" class="q-mt-md">
        <q-card v-for="item in foundItems" :key="item.id" class="my-card">
          <q-img :src="item.image || placeholderImage" alt="Item Image" class="card-image" />
          <q-card-section>
            <h4>{{ item.name }}</h4>
            <p>Date Reported: {{ item.dateReported }}</p>
            <q-btn label="View Details" color="primary" @click="viewDetails(item.id)" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tab: 'lost', // Default tab
        placeholderImage: 'path_to_placeholder_image.png', // Placeholder for item image
        lostItems: [
          { id: 1, name: 'Lost Wallet', dateReported: '2024-09-01', image: 'path_to_wallet_image.png' },
          { id: 2, name: 'Missing Keys', dateReported: '2024-09-05', image: '' },
        ],
        foundItems: [
          { id: 3, name: 'Found Phone', dateReported: '2024-09-10', image: 'path_to_phone_image.png' },
          { id: 4, name: 'Found Backpack', dateReported: '2024-09-12', image: '' },
        ],
      };
    },
    methods: {
      viewDetails(itemId) {
        console.log('Viewing details for item:', itemId);
        // Implement navigation or modal to show item details
      },
    },
  };
  </script>
  
  <style scoped>
  .my-card {
    margin-bottom: 20px;
    max-width: 300px;
  }
  .card-image {
    height: 200px; /* Fixed height for images */
  }
  </style>
  