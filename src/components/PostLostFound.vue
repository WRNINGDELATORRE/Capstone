PostLostFound.vue
<template>
    <q-page class="q-pa-md bg-grey-2">
      <q-card class="post-card q-pa-lg">
        <q-card-section>
          <div class="text-h5 text-weight-bold q-mb-md">
            {{ report_type ? `You're reporting a ${report_type} item` : 'Post Lost or Found Item' }}
          </div>
          
          <q-select
            rounded outlined
            v-model="report_type"
            :options="['Lost', 'Found']"
            label="Select a report type"
            :rules="[val => !!val || 'Report type is required']"
            class="q-mb-md"
          />
  
          <q-input
            rounded outlined
            v-model="item_name"
            label="Item name"
            :rules="[val => !!val || 'Item name is required']"
            class="q-mb-md"
          />
  
          <q-input
          rounded outlined
            v-model="description"
            label="Item description"
            type="textarea"
            :rules="[val => !!val || 'Description is required']"
            class="q-mb-md"
          />

          <q-select
    rounded outlined
    v-model="category"
    :options="['Electronics', 'Accessories', 'Others']"
    label="Select a category"
    :rules="[val => !!val || 'Category is required']"
    class="q-mb-md"
  />
  
          <div class="row q-col-gutter-md q-mb-md">
            <div class="col-12 col-sm-6">
              <q-input
              rounded outlined
                v-model="date_lost_found"
                :label="report_type === 'Lost' ? 'Date Lost' : 'Date Found'"
                type="date"
                :rules="[val => !!val || 'Date is required']"
                class="rounded-borders"
              >
                <template v-slot:prepend>
                  <q-icon name="event" color="primary" />
                </template>
              </q-input>
            </div>

            <div class="col-12 col-sm-6">
          <q-select
            rounded
            outlined
            v-model="location"
            :options="locationOptions"
            label="Location"
            :rules="[val => !!val || 'Location is required']"
            class="rounded-borders"
          >
            <template v-slot:prepend>
              <q-icon name="place" color="primary" />
            </template>
          </q-select>
        </div>
          </div>
        </q-card-section>
  
        <q-card-section>
          <div class="text-subtitle1 q-mb-sm">Upload Image of the Item</div>
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
  
          <q-btn
            :label="report_type ? `Submit ${report_type} Item Report` : 'Submit Post'"
            color="primary"
            @click="confirmSubmission"
            class="q-mt-lg full-width"
            :disable="!isFormValid"
          />
        </q-card-section>
      </q-card>
  
      <q-dialog v-model="showConfirmDialog">
        <q-card>
          <q-card-section>
            <div class="text-h6">Confirm Submission</div>
          </q-card-section>
          <q-card-section>
            Are you sure you want to submit your {{ report_type ? report_type.toLowerCase() : 'post' }} with the provided information and image?
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn label="Submit" color="primary" @click="submitPost" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </template>
  
  <script>
  import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import api from '../store/api'

  export default {
    setup() {
    const $q = useQuasar()
    const router = useRouter()
    const store = useStore()

    const showNotification = (config) => {
      $q.notify(config)
    }

    const locationOptions = [
      'BSIT BUILDING',
      'SAO building',
      'Gate',
      'Canteen',
      'Office'
    ]

    return { showNotification, router, locationOptions, store }
  },
  data() {
    return {
      report_type: '',
      item_name: '',
      description: '',
      date_lost_found: '',
      location: '',
      category: '',
      uploadedFiles: [],
      imagePreview: null,
      showConfirmDialog: false
    };
  },
    computed: {
      isFormValid() {
        return this.report_type && this.item_name && this.description && this.date_lost_found && this.location && this.uploadedFiles.length > 0;
      },
      userId() {
    return this.store.state.userId
  }
    },
    methods: {
      onFileRejected(rejections) {
        this.showNotification({
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
  if (!this.isFormValid) {
    this.showNotification({
      color: 'warning',
      message: 'Please fill all required fields and upload an image.',
      icon: 'warning'
    })
    return;
  }
  if (!this.userId) {
    this.showNotification({
      color: 'negative',
      message: 'You must be logged in to submit a report.',
      icon: 'error'
    })
    return;
  }
  this.showConfirmDialog = true;
},
      async submitPost() {
  this.showConfirmDialog = false;

  const formData = new FormData();
      formData.append('report_type', this.report_type.toLowerCase());
      formData.append('item_name', this.item_name);
      formData.append('description', this.description);
      formData.append('date_lost_found', this.date_lost_found);
      formData.append('location', this.location);
      formData.append('category', this.category);
      formData.append('user_id', this.userId);

  if (this.uploadedFiles.length > 0) {
    formData.append('image', this.uploadedFiles[0]);
  }

  try {
    console.log('Sending request with data:', Object.fromEntries(formData));
    const response = await api.post('?action=report', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Received response:', response);

    if (response.data && response.data.status === 'success') {
      this.showNotification({
        color: 'positive',
        message: `${this.report_type} item report submitted successfully!`,
        icon: 'check_circle'
      });

      this.resetForm();
      this.router.push('/student-dashboard');
    } else {
      throw new Error(response.data ? response.data.message : 'Unknown error occurred');
    }
  } catch (error) {
    console.error('Error submitting report:', error);
    console.error('Error details:', error.response ? error.response.data : 'No response data');
    this.showNotification({
      color: 'negative',
      message: error.response && error.response.data.message 
        ? error.response.data.message 
        : 'Failed to submit report. Please try again.',
      icon: 'error'
    });
  }
},

resetForm() {
  this.report_type = '';
  this.item_name = '';
  this.description = '';
  this.date_lost_found = '';
  this.location = '';
  this.uploadedFiles = [];
  this.imagePreview = null;
}
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .post-card {
    max-width: 600px;
    margin: 0 auto;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .rounded-borders {
    border-radius: 8px;
  }
  </style>


