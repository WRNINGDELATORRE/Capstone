<template>
  <q-page class="q-pa-md claim-request">
    <h1 class="text-h4 text-center q-mb-lg">Claim Item</h1>
    <q-card v-if="item" class="claim-card q-pa-md">
      <q-card-section>
        <div class="text-h5 q-mb-md">{{ item.name }}</div>
        <q-img :src="item.image" style="height: 200px; max-width: 100%;" class="rounded-borders" />
        <div class="q-mt-md">
          <q-item>
            <q-item-section avatar>
              <q-icon name="place" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Location</q-item-label>
              <q-item-label caption>{{ item.location }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="event" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Date</q-item-label>
              <q-item-label caption>{{ item.date }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="info" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Description</q-item-label>
              <q-item-label caption>{{ item.description }}</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-input
          v-model="proof"
          filled
          type="textarea"
          label="Proof of Ownership"
          hint="Provide details that prove this item belongs to you"
          :rules="[val => !!val || 'Proof is required']"
          @input="validateProof"
        />
        <q-input
          v-model="message"
          filled
          type="textarea"
          label="Additional Message"
          class="q-mt-md"
          hint="Any additional information you'd like to provide"
        />
        <q-file
          v-model="photo"
          filled
          label="Upload Photo"
          @input="uploadPhoto"
          class="q-mt-md"
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
        <q-btn
          label="Submit Claim"
          @click="submitClaim"
          color="primary"
          class="q-mt-lg full-width"
          :disable="!isProofValid"
          aria-label="Submit claim"
        />
      </q-card-section>
    </q-card>
    <q-banner v-else class="bg-negative text-white q-mt-md">
      <template v-slot:avatar>
        <q-icon name="error" color="white" />
      </template>
      Item not found! Please check the item ID and try again.
    </q-banner>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      item: null,
      proof: '',
      message: '',
      isProofValid: false,
      photoUploaded: false,
      photo: null,
      isLoading: true
    };
  },
  created() {
    const itemId = this.$route.params.id;
    this.fetchItemData(itemId);
  },
  methods: {
    fetchItemData(id) {
      // Simulating data fetch. In a real app, this would be an API call or Vuex action
      const items = [
        { id: 1, name: 'Lost Wallet', image: 'src/assets/images/qq.jpg', location: 'IT Department', date: '2023-06-15', description: 'Black leather wallet lost near the IT department.' },
        { id: 2, name: 'Found Keys', image: 'src/assets/images/keys.jpg', location: 'Library', date: '2023-06-14', description: 'Set of keys found in the library study area.' }
      ];
      this.item = items.find(i => i.id === parseInt(id));
    },
    validateProof() {
      this.isProofValid = !!this.proof.trim();
    },
    uploadPhoto() {
      if (this.photo) {
        this.photoUploaded = true;
        this.$q.notify({
          message: 'Photo uploaded successfully',
          color: 'positive',
          icon: 'check_circle',
          position: 'top'
        });
      } else {
        this.$q.notify({
          message: 'Please select a photo to upload',
          color: 'warning',
          icon: 'warning',
          position: 'top'
        });
      }
    },
    submitClaim() {
      if (!this.isProofValid) {
        this.$q.notify({
          message: 'Please provide proof of ownership',
          color: 'negative',
          icon: 'warning',
          position: 'top'
        });
        return;
      }
      if (!this.photoUploaded) {
        this.$q.notify({
          message: 'Please upload a photo before submitting',
          color: 'warning',
          icon: 'warning',
          position: 'top',
          actions: [
            { label: 'Submit Anyway', color: 'white', handler: () => { this.processClaim() } },
            { label: 'Cancel', color: 'white' }
          ]
        });
      } else {
        this.processClaim();
      }
    },
    processClaim() {
      // Handle claim submission logic
      console.log('Claim submitted:', { proof: this.proof, message: this.message, photoUploaded: this.photoUploaded });
      
      // Show success message
      this.$q.notify({
        message: 'Claim submitted successfully',
        color: 'positive',
        icon: 'check_circle',
        position: 'top',
        timeout: 2000
      });
      
      // Navigate back to dashboard
      this.$router.push({ name: 'StudentDashboard' });
    }
  }
};
</script>

<style scoped>
.claim-request {
  max-width: 600px;
  margin: 0 auto;
}
.claim-card {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>