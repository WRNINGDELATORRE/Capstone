<template>
    <q-card class="item-card q-pa-sm" flat bordered>
      <q-img :src="item.image" :ratio="1" class="item-image" />
      <q-card-section>
        <div class="text-h6 ellipsis">{{ item.name }}</div>
        <q-item-label caption class="ellipsis-2-lines">{{ item.description }}</q-item-label>
        
        <div class="q-mt-sm row items-center justify-between">
          <div class="row items-center">
            <q-icon name="event" size="xs" color="grey" />
            <span class="q-ml-xs text-caption text-grey">{{ item.date }}</span>
          </div>
          <div class="row items-center">
            <q-icon name="place" size="xs" color="grey" />
            <span class="q-ml-xs text-caption text-grey">{{ item.location }}</span>
          </div>
        </div>
  
        <div class="q-mt-md row items-center justify-between">
          <q-btn
            v-if="!item.claimed"
            label="Claim"
            color="green"
            unelevated
            rounded
            dense
            @click="$emit('claim-item', item.id)"
          />
          <div v-else class="text-positive">Item claimed</div>
          <q-btn
            flat
            rounded
            dense
            color="primary"
            label="Details"
            @click="$emit('view-details', item)"
          />
        </div>
  
        <div class="q-mt-sm row items-center justify-between text-grey">
          <div class="row items-center">
            <q-icon name="comment" size="xs" aria-label="Comments" />
            <span class="q-ml-xs text-caption">{{ item.comments.length }}</span>
          </div>
          <div class="row items-center">
            <q-icon name="visibility" size="xs" aria-label="Views" />
            <span class="q-ml-xs text-caption">{{ item.views }}</span>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </template>
  
  <script>
  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .item-card {
    background-color: white;
    border-radius: 8px;
    transition: all 0.3s ease;
  }
  
  .item-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  
  .item-image {
    border-radius: 8px 8px 0 0;
  }
  </style>
  