<template>
  <q-layout view="hHh Lpr lFf">
    <!-- Left Sidebar (Drawer) -->
    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :width="250"
      class="bg-grey-1"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <!-- Profile Link -->
          <q-item clickable v-ripple @click="navigateTo('/student-profile')" class="q-mb-lg">
            <q-item-section avatar>
              <q-avatar size="56px">
                <img :src="profileImage" alt="User Avatar" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ userName }}</q-item-label>
              <q-item-label caption>View Profile</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator class="q-mb-md" />

          <!-- Navigation Links -->
          <q-item
            v-for="item in navItems"
            :key="item.label"
            clickable
            v-ripple
            @click="navigateTo(item.route)"
            :active="$route.path === item.route"
            active-class="active-nav-item"
            class="q-mb-sm nav-item"
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" :color="$route.path === item.route ? 'green-8' : 'black'" />
            </q-item-section>
            <q-item-section>
              <q-item-label :class="{ 'text-green-8': $route.path === item.route }">{{ item.label }}</q-item-label>
              <q-item-label caption :class="{ 'text-green': $route.path === item.route }">{{ item.caption }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- Navbar -->
    <Navbar @toggle-drawer="toggleDrawer" />

    <!-- Page content -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Navbar from '../components/StudentNavbar.vue';
// import { useUserStore } from '../store/userStore';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      userName: localStorage.getItem('userName') || 'Guest',
      studentId: localStorage.getItem('studentId') || '000000',
      profileImage: localStorage.getItem('profileImage') || 'src/assets/images/default1.png',
      isOnline: true,
      showMenu: false
    };
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const leftDrawerOpen = ref(false);
    // const userStore = useUserStore();

    const navItems = [
      { icon: 'home', label: 'Home', caption: 'Dashboard', route: '/student-dashboard' },
      { icon: 'star', label: 'Top Students', caption: 'Leaderboard', route: '/student-ranking' },
      { icon: 'forum', label: 'Forums', caption: 'Discussions', route: '/student-forum' },
      { icon: 'event', label: 'Events', caption: 'Upcoming activities', route: '/events' },
      { icon: 'history', label: 'History', caption: 'Past activities', route: '/student-history' },
    ];

    const toggleDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    const navigateTo = (route) => {
      router.push(route);
      if (window.innerWidth < 1024) { // Close drawer on mobile after navigation
        leftDrawerOpen.value = false;
      }
    };

    return {
      leftDrawerOpen,
      navItems,
      toggleDrawer,
      navigateTo,
      route,
    };
  }
};
</script>

<style scoped>
.q-drawer {
  background-color: #f5f5f5;
}

.nav-item {
  border-radius: 8px;
  transition: color 0.3s;
}

.nav-item:hover {
  background-color: #e0e0e0;
}

.q-avatar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.q-item__label {
  font-weight: 500;
}

.q-item__label--caption {
  font-size: 0.75rem;
  opacity: 0.7;
}

.active-nav-item {
  font-weight: bold;
}
</style>