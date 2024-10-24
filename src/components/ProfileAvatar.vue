<template>
  <div class="profile-greeting">
    <q-btn flat class="greeting-btn" @click.stop="toggleMenu">
      <q-avatar size="40px" class="profile-avatar q-mr-sm">
    <img :src="userAvatar" alt="User Avatar" @error="handleImageError" />
  </q-avatar>
      <div class="text-left">
        {{ userName }}
      </div>
    </q-btn>

    <!-- Menu -->
    <q-menu
      v-model="showMenu"
      transition-show="scale"
      transition-hide="scale"
      class="profile-menu"
    >
      <q-card class="menu-card">
        <q-card-section class="text-center q-pb-none">
          <q-avatar size="72px">
            <img :src="userAvatar" alt="User Avatar" />
          </q-avatar>
          <div class="text-h6 q-mt-sm">{{ userName }}</div>
          <div class="text-subtitle2">Student ID: {{ schoolId }}</div>
        </q-card-section>

        <q-separator class="q-my-md" />

        <q-list>
          <q-item clickable v-close-popup @click="goProfile" class="menu-item">
            <q-item-section avatar>
              <q-icon name="person" color="green" />
            </q-item-section>
            <q-item-section>Profile</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="goToSettings" class="menu-item">
            <q-item-section avatar>
              <q-icon name="settings" color="green" />
            </q-item-section>
            <q-item-section>Settings</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="sendFeedback" class="menu-item">
            <q-item-section avatar>
              <q-icon name="feedback" color="green" />
            </q-item-section>
            <q-item-section>Send Feedback</q-item-section>
          </q-item>
          <q-item clickable v-close-popup @click="generateQrCode" class="menu-item">
            <q-item-section avatar>
              <q-icon name="qr_code" color="green" />
            </q-item-section>
            <q-item-section>Generate QR Code</q-item-section>
          </q-item>
        </q-list>

        <q-separator class="q-my-md" />

        <q-card-actions align="center">
          <q-btn
            flat
            color="negative"
            icon="logout"
            label="Log Out"
            @click="handleLogout"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-menu>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'PostLostFound',
  
  data() {
    return {
      isOnline: true,
      showMenu: false
    };
  },

  computed: {
    ...mapGetters([
      'userName',
      'userAvatar',
      'schoolId',
      'userId',
      'userRole'
    ])
  },

  methods: {
    ...mapActions(['logout']),

    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    handleImageError(e) {
         console.error('Failed to load user avatar:', e.target.src)
         e.target.src = 'src/assets/images/default1.png'
       },
       handleImageLoad() {
         console.log('User avatar loaded successfully:', this.userAvatar)
       },

    goProfile() {
      this.$router.push('/profile');
    },

    goToSettings() {
      this.$router.push('/settings');
    },

    sendFeedback() {
      // Implement feedback functionality
      console.log('Sending feedback');
      // You might want to open a modal or navigate to a feedback page
    },

    generateQrCode() {
      // Implement QR code generation
      console.log('Generating QR Code');
      // You might want to open a modal with the generated QR code
    },

    async handleLogout() {
      try {
        await this.logout();
        this.$router.push('/login');
      } catch (error) {
        console.error('Logout failed:', error);
        // Handle logout error (show a notification to the user)
      }
    }
  },
  mounted() {
    console.log('ProfileAvatar mounted. User data:', {
         userName: this.userName,
         userAvatar: this.userAvatar,
         schoolId: this.schoolId,
         userId: this.userId,
         userRole: this.userRole
    })
  }
};
</script>

<style scoped>
.profile-greeting {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.greeting-btn {
  display: flex;
  align-items: center;
}

.profile-avatar {
  border-radius: 50%;
}

.profile-menu {
  min-width: 300px;
}

.menu-card {
  border-radius: 8px;
  width: 100%;
}

.menu-item {
  border-radius: 8px;
  transition: background-color 0.3s;
}

.menu-item:hover {
  background-color: #f0f0f0;
}

:deep(.q-item) {
  min-height: 48px;
  padding: 8px 16px;
}

:deep(.q-icon) {
  font-size: 24px;
}
</style>