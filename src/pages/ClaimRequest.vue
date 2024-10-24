<template>
  <q-page class="q-pa-md bg-grey-2">
    <q-card class="claim-card q-pa-lg">
      <q-card-section>
        <div class="text-h5 text-weight-bold q-mb-md">Claim Request for {{ item.name }}</div>
        <q-img :src="item.image" style="height: 200px; object-fit: cover;" class="rounded-borders" />
        <div class="q-mt-md">
          <q-item>
            <q-item-section avatar>
              <q-icon name="place" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.location }}</q-item-label>
              <q-item-label caption>Location</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="event" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.date }}</q-item-label>
              <q-item-label caption>Date</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section avatar>
              <q-icon name="description" color="primary" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.description }}</q-item-label>
              <q-item-label caption>Description</q-item-label>
            </q-item-section>
          </q-item>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="text-subtitle1 q-mb-sm">Upload Proof or Evidence</div>
        <q-uploader
          label="Drop image here or click to upload"
          accept="image/*"
          @rejected="onFileRejected"
          @added="onFileAdded"
          style="max-width: 100%;"
          color="primary"
          flat
          bordered
        />

        <q-img v-if="imagePreview" :src="imagePreview" style="max-height: 200px; object-fit: contain;" class="q-mt-md rounded-borders" />

        <q-input
          v-model="message"
          label="Any additional information you'd like to provide"
          type="textarea"
          rows="4"
          class="q-mt-md"
          outlined
        />

        <q-btn
          label="Submit Claim"
          color="primary"
          @click="confirmSubmission"
          class="q-mt-lg full-width"
          :disable="!imagePreview"
        />
      </q-card-section>
    </q-card>

    <q-dialog v-model="showConfirmDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirm Submission</div>
        </q-card-section>
        <q-card-section>
          Are you sure you want to submit your claim with the uploaded proof and message?
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn label="Submit" color="primary" @click="submitClaim" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()
    return { $q }
  },
  data() {
    return {
      item: {
        name: "Lost Wallet",
        image: 'src/assets/images/qq.jpg',
        location: 'IT Department',
        date: '10-9-2024',
        description: 'Black leather wallet.'
      },
      message: '',
      uploadedFiles: [],
      imagePreview: null,
      showConfirmDialog: false
    };
  },
  methods: {
    onFileRejected(rejections) {
      this.$q.notify({
        color: 'negative',
        message: 'File rejected: ' + rejections[0].failedPropValidation,
        icon: 'warning'
      })
    },
    onFileAdded(files) {
      this.uploadedFiles = files;
      if (files.length > 0) {
        this.imagePreview = URL.createObjectURL(files[0]);
      }
    },
    confirmSubmission() {
      if (this.uploadedFiles.length === 0) {
        this.$q.notify({
          color: 'warning',
          message: 'Please upload a photo as proof.',
          icon: 'warning'
        })
        return;
      }
      this.showConfirmDialog = true;
    },
    submitClaim() {
      this.showConfirmDialog = false;

      const formData = new FormData();
      formData.append('image', this.uploadedFiles[0]);
      formData.append('message', this.message);

      console.log('Claim submitted with:', {
        imageFile: this.uploadedFiles[0],
        message: this.message
      });

      this.$q.notify({
        color: 'positive',
        message: 'Claim submitted successfully!',
        icon: 'check_circle'
      })

      this.$router.push({ path: `/student-dashboard` });
    }
  }
};
</script>

<style lang="scss" scoped>
.claim-card {
  max-width: 600px;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>