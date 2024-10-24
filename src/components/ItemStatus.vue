<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card class="profile-card q-pa-md q-mb-md">
          <h4 class="text-h5 q-mb-md">Item Status Tracking</h4>
          <div v-if="loading" class="text-center">
            <q-spinner color="primary" size="3em" />
            <p>Loading items...</p>
          </div>
          <div v-else-if="error" class="text-negative">
            {{ error }}
          </div>
          <div v-else-if="items.length === 0" class="text-center q-pa-md">No items found.</div>
          <div v-else class="item-status-container">
            <q-card v-for="item in items" :key="item.id" class="item-status-card q-mb-md">
              <q-card-section>
                <div class="item-header">
                  <q-img :src="getImageUrl(item.image)" alt="Item Image" class="item-image" />
                  <div class="item-info">
                    <q-item-label class="item-name text-weight-bold">{{ item.name }}</q-item-label>
                    <q-chip :color="getStatusColor(item.status)" text-color="white" size="sm" class="q-mt-sm">
                      {{ item.status }}
                    </q-chip>
                  </div>
                </div>
                <q-item-label caption class="q-mt-sm ellipsis-2-lines">{{ item.description }}</q-item-label>
                <div class="row justify-between items-center q-mt-md">
                  <q-item-label caption>
                    <q-icon name="place" size="xs" /> {{ item.location }}
                  </q-item-label>
                  <q-item-label caption>
                    <q-icon name="event" size="xs" /> {{ formatDate(item.date_lost_found) }}
                  </q-item-label>
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <q-btn flat color="primary" label="View Details" @click="viewItemDetails(item)" />
              </q-card-actions>
            </q-card>
          </div>
        </q-card>
      </div>
    </div>

    <!-- Item Details Modal -->
    <q-dialog v-model="showDetailsModal">
      <q-card v-if="selectedItem" class="item-details-modal">
        <q-card-section>
          <div class="text-h6">{{ selectedItem.name }}</div>
        </q-card-section>

        <q-card-section>
          <q-img :src="getImageUrl(selectedItem.image)" alt="Item Image" class="full-width q-mb-md" style="max-height: 200px; object-fit: cover;" />
          <q-chip :color="getStatusColor(selectedItem.status)" text-color="white" class="q-mb-md">
            {{ selectedItem.status }}
          </q-chip>
          <q-item-label class="q-mb-sm">
            <strong>Description:</strong> {{ selectedItem.description }}
          </q-item-label>
          <q-item-label class="q-mb-sm">
            <strong>Location:</strong> {{ selectedItem.location }}
          </q-item-label>
          <q-item-label>
            <strong>Date Lost/Found:</strong> {{ formatDate(selectedItem.date_lost_found) }}
          </q-item-label>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      items: [],
      selectedItem: null,
      loading: false,
      error: null,
      showDetailsModal: false,
    };
  },
  methods: {
    async fetchItemStatuses() {
      this.loading = true;
      this.error = null;
      try {
        const userId = this.$store.state.userId;
        console.log("Fetching items for user ID:", userId);
        const response = await axios.get(`http://localhost/backend/src/routes/api.php?action=itemstatus&user_id=${userId}`);
        console.log("Response:", response.data);
        
        if (response.data.status === 'success') {
          if (response.data.items && response.data.items.length > 0) {
            this.items = response.data.items.map(item => ({
              id: item.item_id,
              name: item.item_name,
              image: item.image_url, // Store the image URL as-is
              description: item.description,
              status: item.status,
              location: item.location_name,
              date_lost_found: item.date_lost_found
            }));
          } else {
            this.items = [];
            console.log("No items found for the user");
          }
        } else {
          throw new Error(response.data.message || 'Failed to fetch item statuses');
        }
      } catch (error) {
        console.error('Error fetching item statuses:', error);
        this.error = error.message || 'Failed to load items. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    getStatusColor(status) {
      switch (status.toLowerCase()) {
        case 'lost':
          return 'red';
        case 'found':
          return 'green';
        case 'pending':
          return 'orange';
        default:
          return 'grey';
      }
    },
    viewItemDetails(item) {
      this.selectedItem = item;
      this.showDetailsModal = true;
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    getImageUrl(imageUrl) {
      if (!imageUrl) {
        return 'src/assets/images/qq.jpg'; // Default image path
      }
      
      // Check if the imageUrl is already an absolute URL
      if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl;
      }
      
      // If it's a relative path, prepend the backend URL
      return `http://localhost/backend/${imageUrl.replace(/^\//, '')}`;
    },
  },
  mounted() {
    this.fetchItemStatuses();
  },
};
</script>

<style scoped>
.item-status-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.item-status-card {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.item-status-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
}

.item-header {
  display: flex;
  align-items: center;
  gap: 15px;
}

.item-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
}

.item-info {
  flex-grow: 1;
}

.item-name {
  font-size: 1.1rem;
  line-height: 1.2;
}

.ellipsis-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-details-modal {
  width: 400px;
  max-width: 90vw;
}
</style>
