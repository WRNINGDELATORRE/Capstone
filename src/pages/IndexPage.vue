<template>
  <q-page class="q-pa-md">
    <!-- Navigation Bar -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat round dense icon="img:CPC.png" />
        <q-toolbar-title>CPC Lost & Found</q-toolbar-title>
        <q-btn flat label="Login" />
        <q-btn unelevated label="Sign Up" class="q-ml-sm" />
      </q-toolbar>
    </q-header>

    <!-- Hero Section -->
    <div class="hero-section row items-center q-py-xl">
      <div class="col-12 col-md-6 q-pa-md">
        <h1 class="text-h2 text-weight-bold">Find Your Lost Belongings, Quickly and Easily!</h1>
        <p class="text-h6 q-mt-md">Our campus-wide lost and found system helps you recover your items efficiently.</p>
        <q-input outlined v-model="search" label="Search for lost items" class="q-mt-md">
          <template v-slot:append>
            <q-btn round dense flat icon="search" />
          </template>
        </q-input>
        <div class="q-mt-lg">
          <q-btn unelevated color="primary" label="Report a Lost Item" class="q-mr-sm" />
          <q-btn outline color="primary" label="Browse Found Items" />
        </div>
      </div>
      <div class="col-12 col-md-6 q-pa-md">
        <q-img src="~assets/lost-and-found.jpg" />
      </div>
    </div>

    <!-- Key Features Section -->
    <div class="key-features q-py-xl">
      <h2 class="text-h3 text-center q-mb-xl">Key Features</h2>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-6 col-md-3">
          <div class="text-center">
            <q-icon name="report" size="4rem" color="primary" />
            <h3 class="text-h5 q-mt-md">Report Lost Items</h3>
            <p>Easily report missing belongings.</p>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="text-center">
            <q-icon name="search" size="4rem" color="primary" />
            <h3 class="text-h5 q-mt-md">Browse Found Items</h3>
            <p>Check recently found items.</p>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="text-center">
            <q-icon name="check_circle" size="4rem" color="primary" />
            <h3 class="text-h5 q-mt-md">Claim Process</h3>
            <p>Verify ownership and reclaim your items.</p>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <div class="text-center">
            <q-icon name="qr_code" size="4rem" color="primary" />
            <h3 class="text-h5 q-mt-md">QR Tagging System</h3>
            <p>Secure your belongings with unique tags.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Lost & Found Items Section -->
    <div class="recent-items q-py-xl">
      <h2 class="text-h3 text-center q-mb-xl">Recent Lost & Found Items</h2>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="lost" label="Lost Items" />
        <q-tab name="found" label="Found Items" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="lost">
          <div class="row q-col-gutter-md">
            <div v-for="item in lostItems" :key="item.id" class="col-12 col-sm-6 col-md-4">
              <q-card class="my-card">
                <q-img :src="item.image">
                  <div class="absolute-bottom text-h6">
                    {{ item.name }}
                  </div>
                </q-img>
                <q-card-section>
                  <div class="text-subtitle2">Reported on {{ item.date }}</div>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn flat color="primary" label="View Details" />
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel name="found">
          <div class="row q-col-gutter-md">
            <div v-for="item in foundItems" :key="item.id" class="col-12 col-sm-6 col-md-4">
              <q-card class="my-card">
                <q-img :src="item.image">
                  <div class="absolute-bottom text-h6">
                    {{ item.name }}
                  </div>
                </q-img>
                <q-card-section>
                  <div class="text-subtitle2">Found on {{ item.date }}</div>
                </q-card-section>
                <q-card-actions align="right">
                  <q-btn flat color="primary" label="View Details" />
                </q-card-actions>
              </q-card>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <!-- Call-to-Action (CTA) Section -->
    <div class="cta-section q-py-xl bg-primary text-white text-center">
      <h2 class="text-h3">Ready to Find Your Lost Item?</h2>
      <p class="text-h6 q-mt-md">Join our community and start using our Lost & Found system today!</p>
      <div class="q-mt-lg">
        <q-btn unelevated color="white" text-color="primary" label="Get Started" class="q-mr-sm" />
        <q-btn outline color="white" label="Report Lost Item" />
      </div>
    </div>

    <!-- Footer -->
    <q-footer class="bg-dark text-white q-pa-md">
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md-4">
          <h5>CPC Lost & Found</h5>
          <p>Helping our campus community reconnect with their lost items.</p>
        </div>
        <div class="col-12 col-md-4">
          <h5>Quick Links</h5>
          <q-list dense>
            <q-item clickable><q-item-section>FAQ</q-item-section></q-item>
            <q-item clickable><q-item-section>Contact Us</q-item-section></q-item>
            <q-item clickable><q-item-section>Privacy Policy</q-item-section></q-item>
          </q-list>
        </div>
        <div class="col-12 col-md-4">
          <h5>Connect With Us</h5>
          <div>
            <q-btn flat round color="white" icon="fab fa-facebook" />
            <q-btn flat round color="white" icon="fab fa-twitter" />
            <q-btn flat round color="white" icon="fab fa-instagram" />
          </div>
        </div>
      </div>
      <div class="text-center q-mt-sm">
        &copy; {{ new Date().getFullYear() }} CPC Lost & Found. All rights reserved.
      </div>
    </q-footer>
  </q-page>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      search: '',
      tab: 'lost',
      lostItems: [
        { id: 1, name: 'Blue Backpack', date: '2023-05-01', image: 'path/to/backpack.jpg' },
        { id: 2, name: 'iPhone 12', date: '2023-05-02', image: 'path/to/iphone.jpg' },
        { id: 3, name: 'Textbook', date: '2023-05-03', image: 'path/to/textbook.jpg' },
      ],
      foundItems: [
        { id: 4, name: 'Water Bottle', date: '2023-05-01', image: 'path/to/bottle.jpg' },
        { id: 5, name: 'Umbrella', date: '2023-05-02', image: 'path/to/umbrella.jpg' },
        { id: 6, name: 'Glasses', date: '2023-05-03', image: 'path/to/glasses.jpg' },
      ],
    };
  },
};
</script>

<style scoped>
.hero-section {
  min-height: 80vh;
}

.key-features, .recent-items {
  background-color: #f5f5f5;
}

.cta-section {
  background-color: var(--q-primary);
}

.my-card {
  width: 100%;
  max-width: 250px;
}
</style>