<template>
  <q-page padding>
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
      <div v-else class="items-container row q-col-gutter-md">
        <div v-for="item in filteredItems" :key="item.report_id" class="col-12 col-sm-6 col-md-4">
          <q-card class="item-card" @click="viewItemDetails(item)">
            <q-card-section>
              <div class="row items-center q-mb-sm">
                <q-avatar size="40px" class="q-mr-md">
  <img :src="getImageUrl(item.profile_image_url, true)" @error="handleImageError" />
</q-avatar>    
                <div>
                  <div class="text-caption">Reported by: {{ item.first_name }} {{ item.last_name }}</div>
                  <div class="text-caption">{{ formatDate(item.date_reported) }}</div>
                </div>
              </div>
            </q-card-section>

            <q-separator />

            <q-img :src="getImageUrl(item.image_url)" class="item-image" />

            <q-separator />

            <q-card-section>
              <div class="text-h6 q-mb-xs">{{ item.item_name }}</div>
              <div class="text-body2 item-description q-mb-md">{{ item.description }}</div>
              <div class="row items-center q-gutter-x-md">
                <div class="text-caption">
                  <q-icon name="event" size="16px" class="q-mr-xs" />
                  {{ item.date_lost_found }}
                </div>
                <div class="text-caption">
                  <q-icon name="place" size="16px" class="q-mr-xs" />
                  {{ item.building_name }}
                </div>
              </div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="between">
              <div class="row q-gutter-x-md">
                <div class="text-caption">
                  <q-icon name="visibility" size="20px" />
                  <span class="q-ml-xs">{{ item.views || 0 }}</span>
                </div>
                <div class="text-caption">
                  <q-icon name="comment" size="20px" />
                  <span class="q-ml-xs">{{ item.comments || 0 }}</span>
                </div>
              </div>
              <q-btn color="green-7" label="Claim" @click.stop="goToClaimRequest(item.report_id)" />
            </q-card-actions>
          </q-card>
        </div>
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
              <q-item-section avatar>
                <q-avatar>
                  <img :src="getAvatarUrl(comment.user_id)" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <div class="text-weight-bold">{{ comment.first_name }} {{ comment.last_name }}</div>
                <div class="text-caption">{{ new Date(comment.created_at).toLocaleString() }}</div>
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
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { mapGetters } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const $q = useQuasar();

    return {
      store,
      router,
      $q
    };
  },
  data() {
    return {
      activeTab: 'lost',
      showDetailsModal: false,
      selectedItem: {},
      items: [],
      loading: true,
      error: null,
      newComment: '',
      comments: []
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
    handleImageError(e) {
    console.error('Failed to load user avatar:', e.target.src);
    e.target.src = 'src/assets/images/default1.png';
  },
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
    getImageUrl(imageUrl, isProfileImage = false) {
      if (!imageUrl) {
        return isProfileImage ? 'path/to/default/profile-image.jpg' : 'path/to/default/image.jpg';
      }
      return `http://localhost/backend/${imageUrl}`;
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
    async fetchComments(itemId) {
      try {
        const response = await axios.get(`http://localhost/backend/src/routes/api.php?action=getcomments&item_id=${itemId}`);
        if (response.data.status === 'success') {
          this.comments = response.data.data;
        } else {
          console.error('Failed to fetch comments:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    },
    goToClaimRequest(id) {
      this.router.push({ path: `/claim-request/${id}` });
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
        if (response.data.status === 'success') {
          this.comments.push({
            ...commentData,
            comment_id: response.data.data.comment_id,
            first_name: this.store.state.userFirstName,
            last_name: this.store.state.userLastName,
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
        month: 'long', 
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
    },
    handleImageError(e) {
      console.error('Failed to load user avatar:', e.target.src);
      e.target.src = 'src/assets/images/default1.png';
    },
  },
  mounted() {
    this.fetchItems();
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

.custom-tabs {
  color: #2f2f2f;
}

.custom-tabs ::v-deep .q-tab--active {
  font-weight: bold;
}

.item-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  cursor: pointer;
}

.item-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.item-image {
  height: 200px;
  object-fit: cover;
}

.text-weight-bold {
  font-weight: bold;
}

.description-text {
  font-size: 1.3rem;
  letter-spacing: 0.2px;
  line-height: 1.5;
}

.item-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.q-card__section {
  padding: 16px;
}

.q-separator {
  margin: 12px 0;
}

.text-caption {
  font-size: 0.75rem;
}
</style>
