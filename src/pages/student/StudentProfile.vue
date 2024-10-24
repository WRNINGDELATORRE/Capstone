<template>
  <q-page class="q-pa-md">
    <q-card class="profile-card q-pa-lg">
      <div v-if="loading" class="text-center">
        <q-spinner-dots color="primary" size="40px" />
        <p>Loading user details...</p>
      </div>
      <div v-else-if="error" class="text-negative">{{ error }}</div>
      <div v-else class="row q-col-gutter-md">
        <!-- Left column: Avatar and edit button -->
        <div class="col-12 col-sm-4 column items-center">
          <q-avatar size="270px" class="profile-avatar q-mb-md">
            <img :src="userAvatar" alt="User Avatar" @error="handleImageError" />
          </q-avatar>
          <q-btn
            flat
            icon="edit"
            color="primary"
            @click="editProfile"
            label="Edit Profile"
          />
        </div>

         <!-- Right column: Student details and report summary -->
        <div class="col-12 col-md-8">
          <div class="profile-details q-mb-lg">
            <h3 class="q-my-none">{{ studentName }}</h3>
            <p class="text-subtitle1 q-mb-md">{{ user.departmentDescription }}</p>
            <q-list bordered separator>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="badge" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label overline>School ID</q-item-label>
                  <q-item-label>{{ user.schoolId }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="email" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label overline>Email</q-item-label>
                  <q-item-label>{{ user.email }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon name="person" color="primary" />
                </q-item-section>
                <q-item-section>
                  <q-item-label overline>Role</q-item-label>
                  <q-item-label>{{ user.role }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>

          <q-separator class="q-my-md" />

<div class="report-summary">
            <div class="row items-center q-mb-md">
              <h5 class="text-h6 q-my-none">Report Summary</h5>
              <q-btn
                flat
                round
                icon="add"
                color="primary"
                @click="reportItem"
                class="q-ml-sm"
              >
                <q-tooltip>Report Item</q-tooltip>
              </q-btn>
            </div>
            <div class="row q-col-gutter-md">
              <div class="col-4">
                <q-card class="text-center q-pa-sm bg-orange-3">
                  <p class="text-h5 q-mb-none text-orange-9">{{ totalReportedItems }}</p>
                  <p class="q-mb-none text-weight-medium">Total Items</p>
                </q-card>
              </div>
              <div class="col-4">
                <q-card class="text-center q-pa-sm bg-yellow-3">
                  <p class="text-h5 q-mb-none text-yellow-9">{{ pendingReports }}</p>
                  <p class="q-mb-none text-weight-medium">Pending</p>
                </q-card>
              </div>
              <div class="col-4">
                <q-card class="text-center q-pa-sm bg-green-3">
                  <p class="text-h5 q-mb-none text-green-9">{{ resolvedReports }}</p>
                  <p class="q-mb-none text-weight-medium">Resolved</p>
                </q-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card>

    <ItemStatusTracking class="q-mt-md" />
  </q-page>
</template>

<script>
import ItemStatusTracking from 'src/components/ItemStatus.vue';
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  components: {
    ItemStatusTracking,
  },
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        schoolId: '',
        email: '',
        department: '',
        role: '',
      },
      totalReportedItems: 0,
      pendingReports: 0,
      resolvedReports: 0,
      loading: true,
      error: null,
    };
  },
  computed: {
    ...mapGetters(['schoolId', 'userId', 'userName', 'userAvatar']),
    safeSchoolId() {
      return this.schoolId || '';
    },
    studentName() {
      return `${this.user.firstName} ${this.user.lastName}`;
    },
    ...mapGetters(['userId']),
  },
  methods: {
    async fetchUserDetails() {
      this.loading = true;
      this.error = null;
      try {
        if (!this.safeSchoolId) {
          console.error('School ID is not set');
          this.error = 'User information is not available';
          return;
        }
        console.log('Fetching user details for schoolId:', this.safeSchoolId);
        const response = await axios.get(`http://localhost/backend/src/routes/api.php?action=userdetails&user_id=${this.safeSchoolId}`);
        console.log('User details response:', response.data);
        
        if (response.data.status === 'success') {
          const userData = response.data.data;
          this.user = {
            ...this.user,
            firstName: userData.first_name,
            lastName: userData.last_name,
            schoolId: userData.school_id,
            email: userData.email,
            departmentName: userData.department_name,
            departmentDescription: userData.department_description,
            role: userData.role,
          };
        } else {
          this.error = response.data.message || 'Failed to fetch user details';
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        this.error = error.response?.data?.message || error.message || 'An error occurred while fetching user details';
      } finally {
        this.loading = false;
      }
    },
    async fetchReportSummary() {
      try {
        // Fetch report summary using userId instead of schoolId
        if (!this.userId) {
          console.error('User ID is not set');
          this.error = 'User information is not available';
          return;
        }
        console.log('Fetching report summary for userId:', this.userId);
        const response = await axios.get(`http://localhost/backend/src/routes/api.php?action=getreportsummary&user_id=${this.userId}`);
        console.log('Raw report summary response:', response);
        
        if (response.data.status === 'success' && response.data.data) {
          const summaryData = response.data.data;
          console.log('Summary data received:', summaryData);
          this.totalReportedItems = parseInt(summaryData.total_items) || 0;
          this.pendingReports = parseInt(summaryData.pending_items) || 0;
          this.resolvedReports = parseInt(summaryData.resolved_items) || 0;
        } else {
          console.error('Failed to fetch report summary:', response.data.message || 'Unknown error');
          this.error = 'Failed to fetch report summary. Please try again later.';
        }
      } catch (error) {
        console.error('Error fetching report summary:', error);
        this.error = 'An error occurred while fetching the report summary. Please try again later.';
      }
    },
    editProfile() {
      console.log('Edit profile clicked');
    },
    reportItem() {
      console.log('Report item clicked');
    },
    handleImageError(e) {
      console.error('Failed to load user avatar:', e.target.src);
      e.target.src = 'src/assets/images/default1.png';
    },
  },
  mounted() {
    console.log('Component mounted. SchoolId:', this.safeSchoolId);
    this.fetchUserDetails();
    this.fetchReportSummary();
  },
};
</script>

<style lang="scss" scoped>
.profile-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.profile-details {
  h3 {
    font-weight: 600;
  }
  .q-item {
    padding: 2px 0;
  }
  .q-item__section--avatar {
    min-width: 20px;
  }
}

.report-summary {
  .q-card {
    transition: all 0.3s ease;
    border-radius: 8px;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>