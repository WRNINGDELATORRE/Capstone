<template>
    <q-layout view="lHh Lpr lFf">
      <q-header elevated>
        <q-toolbar class="nav">
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />
          
          <q-btn flat label="Home" class="custom-spacing"  @click="goToAdminDashboard"> </q-btn>
            <q-btn flat label="Found" class="custom-spacing"  @click="gotoAdminFound"> </q-btn>
            <q-btn flat label="Lost" class="custom-spacing"  @click="gotoAdminLost"> </q-btn>
            <q-btn flat label="Notification" class="custom-spacing" @click="gotoNotification"> </q-btn>
        
  
            <q-toolbar-title>
               <q-btn flat dense round icon='logout' class="custom-spacing" aria-label='Log out' @click="logout" /> 
              </q-toolbar-title>
  
              
        </q-toolbar>
      </q-header>
  
      <q-drawer
  v-model="leftDrawerOpen"
  show-if-above
  bordered
>
  <q-list>
    <q-item-label header>
      Welcome, Admin!
    </q-item-label>

    <q-item v-for="link in linksList" :key="link.title" clickable @click="navigate(link.link)">
      <q-item-section avatar>
        <q-icon :name="link.icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ link.title }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</q-drawer>

  
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </template>
  
  <style scoped>
  .custom-spacing {
    margin-left: 90px; /* Adjust the margin to your desired space */
    margin-right:100px;
  }
  .nav{
    background: rgb(25, 10, 153);
  }
  </style>
  
  
  <script>
  import { defineComponent, ref } from 'vue'
  import EssentialLink from 'components/EssentialLink.vue'
  
  const linksList = [
  {
    title: 'Admin',
    icon: 'person',
    link: '/admin-dashboard' // Internal route, will use router-link
  },
  {
    title: 'Item Management',
    icon: 'inventory',  // Example icon for Item Management
    link: '/admin-item-management'
  },
  {
    title: 'Claim Request',
    icon: 'assignment',  // Example icon for Claim Request
    link: '/admin-claim'
  },
  {
    title: 'User Management',
    icon: 'group',  // Example icon for User Management
    link: '/admin-user-management'
  },
  {
    title: 'Post Announcement',
    icon: 'campaign',  // Example icon for Announcement
    link: '/admin-announce'
  },
  {
    title: 'Forum',
    icon: 'forum',  // Example icon for Forum
    link: '/admin-forum'
  },
  {
    title: 'Feedback',
    icon: 'feedback',  // Example icon for Feedback
    link: '/admin-feedback'
  },
  {
    title: 'Sync',
    icon: 'sync',  // Example icon for Sync
    link: '/admin-sync'
  },
  {
    title: 'Log Out',
    icon: 'logout',
    link: 'https://'
  }
]
    export default defineComponent({
      name: 'AdminLayout',
  
     components: {
        EssentialLink
      },
  
     data () {
        return {
          linksList,
          leftDrawerOpen: false
        }
     },
  
     methods: {
       toggleLeftDrawer () {
         this.leftDrawerOpen = !this.leftDrawerOpen
        },
        
        goToAdminDashboard() {
          this.$router.push('/admin-dashboard')
        },
      
     
     gotoAdminFound(){
  this.$router.push('admin-found')
     },
     gotoAdminLost(){
  this.$router.push('admin-lost')
     },
     gotoNotification(){
  this.$router.push('admin-notification')
     },
     goToUserManagement() {
        this.$router.push('/admin-user');
      }
  
  
   }
  })
  </script>