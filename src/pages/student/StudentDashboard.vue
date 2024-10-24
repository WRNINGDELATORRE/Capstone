<template>
  <q-page padding class="lost-found-dashboard">
    <div class="layout-container">
      <!-- Title and Tabs -->
      <div class="title-section q-mb-md">
        <q-tabs
          v-model="activeTab"
          class="q-mb-md custom-tabs"
          indicator-color="green"
          active-color="green"
          align="justify"
        >
          <q-tab name="lost" label="Lost Items" icon="search" />
          <q-tab name="found" label="Found Items" icon="check_circle" />
        </q-tabs>
      </div>

      <!-- Loading and Error States -->
      <div v-if="loading" class="text-center q-pa-md">
        <q-spinner color="primary" size="3em" />
        <p>Loading items...</p>
      </div>

      <div v-else-if="error" class="text-center q-pa-md">
        <p class="text-negative">{{ error }}</p>
      </div>

      <div v-else-if="filteredItems.length === 0" class="text-center q-pa-md">
        <p>No {{ activeTab }} items available.</p>
      </div>

      <!-- Item Cards -->
      <div v-else class="item-grid">
        <q-card
          v-for="report in filteredItems"
          :key="report.report_id"
          class="item-card q-pa-sm"
          flat
          bordered
          @click="viewItemDetails(report)"
        >
          <q-card-section class="q-pb-xs">
            <div class="row items-center">
              <q-avatar size="40px" class="q-mr-md">
                <img :src="getImageUrl(report.profile_image_url, true)" @error="handleImageError" />
              </q-avatar>    
              <div>
                <div class="text-subtitle2">Reported by: {{ report.first_name }} {{ report.last_name }}</div>
                <div class="text-caption">{{ formatDate(report.date_reported) }}</div>
              </div>
            </div>
          </q-card-section>

          <q-separator class="q-my-sm" />

          <q-img :src="getImageUrl(report.image_url)" :ratio="1" class="item-image">
            <template v-slot:error>
              <div class="absolute-full flex flex-center bg-negative text-white">
                Cannot load image
              </div>
            </template>
          </q-img>

          <q-separator class="q-my-sm" />

          <q-card-section class="q-py-xs">
            <div class="text-h6 ellipsis item-name">{{ report.item_name }}</div>
            <q-item-label caption class="ellipsis-2-lines item-description">{{ report.description }}</q-item-label>

            <div class="q-mt-sm row items-center justify-between">
              <div class="row items-center">
                <q-icon name="event" size="sm" color="black" />
                <span class="q-ml-xs text-body2 item-info">{{ report.date_lost_found }}</span>
              </div>
              <div class="row items-center">
                <q-icon name="place" size="sm" color="black" />
                <span class="q-ml-xs text-body2 item-info">{{ report.building_name }}</span>
              </div>
            </div>

            <q-separator class="q-my-sm" />

            <div class="row items-center justify-between">
              <div class="row q-gutter-x-md">
                <div class="text-body2">
                  <q-icon name="visibility" size="20px" color="black" />
                  <span class="q-ml-xs">{{ report.views || 0 }}</span>
                </div>
                <div class="text-body2">
                  <q-icon name="comment" size="20px" color="black" />
                  <span class="q-ml-xs">{{ report.comments || 0 }}</span>
                </div>
              </div>
              <q-btn
                label="Claim"
                color="green-7"
                unelevated
                rounded
                dense
                @click.stop="goToClaimRequest(report.report_id)"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Item Details Modal -->
    <q-dialog v-model="showDetailsModal">
      <q-card style="width: 700px; max-width: 90vw;">
        <q-card-section>
          <div class="text-h5 text-weight-bold">{{ selectedItem.item_name }}</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-img :src="getImageUrl(selectedItem.image_url)" style="height: 350px; width: 100%; object-fit: cover;" />
          <div class="q-mt-md">
            <div class="text-h6">Description:</div>
            <p class="description-text">{{ selectedItem.description }}</p>
        
            <div class="row items-center q-mb-sm">
              <q-icon name="event" size="25px" color="primary" class="q-mr-sm" />
              <div class="text-subtitle1">
                {{ selectedItem.report_type === 'lost' ? 'Date Lost:' : 'Date Found:' }} {{ selectedItem.date_lost_found }}
              </div>
            </div>
            <div class="row items-center q-mb-sm">
              <q-icon name="place" size="25px" color="primary" class="q-mr-sm" />
              <div class="text-subtitle1">Location: {{ selectedItem.building_name }}</div>
            </div>
            <div class="row items-center q-mb-sm">
              <q-avatar size="40px" class="q-mr-sm">
                <img :src="getImageUrl(selectedItem.profile_image_url, true)" />
              </q-avatar>
              <div class="text-subtitle1">
                Reported by: {{ selectedItem.first_name }} {{ selectedItem.last_name }}
              </div>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <!-- Comment Section -->
<q-card-section>
  <div class="text-h6">Comments</div>
  <q-list>
    <q-item v-for="comment in comments" :key="comment.comment_id">
      <q-item-section>
        <div class="text-weight-bold">{{ comment.first_name }} {{ comment.last_name }}</div>
        <div class="text-caption">{{ formatDate(comment.created_at) }}</div>
        <div>{{ comment.comment }}</div>
      </q-item-section>
    </q-item>
  </q-list>

  <!-- Add Comment Form -->
  <q-input v-model="newComment" label="Add a comment" filled type="textarea">
    <template v-slot:after>
      <q-btn round dense flat icon="send" @click="addComment" />
    </template>
  </q-input>
</q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
          <q-btn color="primary" label="Claim" @click="goToClaimRequest(selectedItem.report_id)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      activeTab: 'lost',
      showDetailsModal: false,
      selectedItem: {},
      items: [],
      loading: true,
      error: null,
      comments: [],
      newComment: ''
    };
  },
  computed: {
    ...mapGetters([
      'userName',
      'userAvatar',
      'schoolId',
      'userId',
      'userRole'
    ]),
    filteredItems() {
      return this.items.filter(item => item.report_type.toLowerCase() === this.activeTab);
    },
  },
  methods: {
    async fetchItems() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost/backend/src/routes/api.php?action=getreports');
        console.log('API Response:', response.data);
        if (response.data.status === 'success') {
          this.items = response.data.data;
          if (this.items.length === 0) {
            console.log('No approved reports available');
          }
        } else {
          throw new Error(response.data.message || 'Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching items:', error);
        this.error = error.message || 'Failed to fetch items. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    getImageUrl(imageUrl, isAvatar = false) {
      return imageUrl ? `http://localhost/backend/${imageUrl}` : (isAvatar ? 'src/assets/images/default1.png' : 'path/to/default/image.jpg');
    },
    handleImageError(e) {
      console.error('Failed to load user avatar:', e.target.src);
      e.target.src = 'src/assets/images/default1.png';
    },
    async fetchComments(itemId) {
    try {
      const response = await axios.get(`http://localhost/backend/src/routes/api.php?action=getcomments&item_id=${itemId}`);
      console.log('Fetched comments:', response.data);
      if (response.data.status === 'success') {
        this.comments = response.data.data;
      } else {
        console.error('Failed to fetch comments:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  },

  async addComment() {
    if (!this.newComment.trim()) {
      return;
    }

    const commentData = {
      item_id: this.selectedItem.item_id,
      user_id: this.userId,
      comment: this.newComment,
    };

    try {
      const response = await axios.post('http://localhost/backend/src/routes/api.php?action=comment', commentData);
      console.log('Add comment response:', response.data);
      if (response.data.status === 'success') {
        // Add the new comment to the list
        this.comments.unshift({
          comment_id: response.data.data.comment_id,
          user_id: this.userId,
          first_name: this.$store.state.userFirstName,
          last_name: this.$store.state.userLastName,
          comment: this.newComment,
          created_at: new Date().toISOString(),
        });
        this.newComment = '';
      } else {
        console.error('Failed to add comment:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  },

  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  },

  viewItemDetails(report) {
    this.selectedItem = { 
      ...report,
      image_url: report.image_url || 'src/assets/images/qq.jpg',
      description: report.description || 'No description available.'
    };
    this.showDetailsModal = true;
    this.fetchComments(report.item_id);
  },
    goToClaimRequest(id) {
      this.$router.push({ path: `/claim-request/${id}` });
    },
  },
  mounted() {
    this.fetchItems();
  }
};
</script>

<style scoped>
.lost-found-dashboard {
  background-color: #f5f5f5;
}

.layout-container {
  max-width: 1200px;
  margin: 0 auto;
}

.custom-tabs {
  background-color: #009688;
  color: white;
}

.q-tab__label {
  color: white;
}

.q-tab--active {
  background-color: #4DB6AC;
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(calc(33.333% - 16px), 1fr));
  grid-gap: 16px;
  padding: 16px 0;
}

.item-card {
  background-color: white;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.item-image {
  border-radius: 0;
}

.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ellipsis-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: black;
}

.item-description {
  font-size: 0.9rem;
  color: black;
}

.item-info {
  font-size: 0.8rem;
  color: black;
}

/* Add this new style for tighter spacing */
.q-card__section {
  padding: 8px 16px;
}

/* Responsive adjustments */
@media (max-width: 1023px) {
  .item-grid {
    grid-template-columns: repeat(auto-fill, minmax(calc(50% - 16px), 1fr));
  }
}

@media (max-width: 599px) {
  .item-grid {
    grid-template-columns: 1fr;
  }
}
</style>
