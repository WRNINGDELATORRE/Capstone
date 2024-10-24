<template>
  <q-page class="flex flex-center bg-grey-2">
    <div class="column items-center">
      <div class="text-h3 text-primary q-mb-md">CPC Lost & Found</div>

      <q-card class="signup-card q-pa-lg shadow-10">
        <q-card-section class="text-center">
          <div class="text-h5 text-weight-bold">Create an Account</div>
          <div class="text-subtitle1 text-grey-7">Step {{ currentStep }} of 2</div>
        </q-card-section>

        <q-card-section v-if="currentStep === 1">
          <q-form @submit="goToStep2" class="q-gutter-md">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <q-input
                  rounded
                  outlined
                  v-model="firstName"
                  label="First Name"
                  :rules="[val => !!val || 'First name is required']"
                />
              </div>

              <div class="col-12 col-sm-6">
                <q-input
                  rounded
                  outlined
                  v-model="lastName"
                  label="Last Name"
                  :rules="[val => !!val || 'Last name is required']"
                />
              </div>
            </div>

            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6">
                <q-input
                  rounded
                  outlined
                  v-model="schoolId"
                  label="School ID"
                  :rules="[val => !!val || 'School ID is required']"
                />
              </div>

              <div class="col-12 col-sm-6">
                <q-select
                  rounded
                  outlined
                  v-model="department"
                  :options="departmentOptions"
                  label="Department"
                  :rules="[val => !!val || 'Department is required']"
                />
              </div>
            </div>

            <q-input
              rounded
              outlined
              v-model="email"
              label="Email"
              type="email"
              :rules="[val => !!val || 'Email is required', isValidEmail]"
            />

            <q-input
              rounded
              outlined
              v-model="password"
              label="Password"
              :type="isPwd ? 'password' : 'text'"
              :rules="[
                val => !!val || 'Password is required',
                val => val.length >= 8 || 'Password must be at least 8 characters long'
              ]"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            <q-input
              rounded
              outlined
              v-model="confirmPassword"
              label="Confirm Password"
              :type="isPwd ? 'password' : 'text'"
              :rules="[
                val => !!val || 'Please confirm your password',
                val => val === password || 'Passwords do not match'
              ]"
            />

            <q-checkbox
              v-model="agreeTerms"
              label="I agree to the Terms and Conditions"
            />

            <q-btn
              unelevated
              size="lg"
              color="primary"
              class="full-width q-mt-md"
              label="Next"
              type="submit"
              :disable="!agreeTerms"
            />
          </q-form>
        </q-card-section>

        <q-card-section v-else-if="currentStep === 2">
          <div class="text-center q-mb-md">
            <q-avatar size="150px">
              <img :src="previewImage || 'https://cdn.quasar.dev/img/boy-avatar.png'" />
            </q-avatar>
          </div>
          <q-file
            v-model="profileImage"
            label="Upload Profile Picture"
            filled
            bottom-slots
            counter
            @input="onFileSelected"
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
          <q-btn
            unelevated
            size="lg"
            color="primary"
            class="full-width q-mt-md"
            label="Register"
            @click="onSubmit"
            :loading="loading"
          />
          <q-btn
            flat
            size="lg"
            color="grey"
            class="full-width q-mt-sm"
            label="Back"
            @click="currentStep = 1"
          />
        </q-card-section>

        <q-card-section class="text-center q-pa-none">
          <p class="text-grey-7">
            Already have an account?
            <q-btn
              flat
              color="primary"
              label="Log in"
              @click="$router.push('/login')"
            />
          </p>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignupPage',
  data() {
    return {
      currentStep: 1,
      firstName: '',
      lastName: '',
      schoolId: '',
      email: '',
      password: '',
      confirmPassword: '',
      isPwd: true,
      agreeTerms: false,
      department: null,
      departmentOptions: [
        { label: 'BSIT', value: 1 },
        { label: 'BSHM', value: 2 },
        { label: 'BEED', value: 3 },
      ],
      loading: false,
      error: null,
      profileImage: null,
      previewImage: null,
    };
  },
  methods: {
    goToStep2() {
      if (this.validateStep1()) {
        this.currentStep = 2;
      }
    },
    validateStep1() {
      return (
        this.firstName &&
        this.lastName &&
        this.schoolId &&
        this.email &&
        this.password &&
        this.confirmPassword &&
        this.department &&
        this.agreeTerms &&
        this.password === this.confirmPassword
      );
    },
    onFileSelected(file) {
      if (file) {
        this.previewImage = URL.createObjectURL(file);
      }
    },
    async onSubmit() {
      if (this.validateStep1()) {
        this.loading = true;
        this.error = null;

        const formData = new FormData();
        formData.append('first_name', this.firstName);
        formData.append('last_name', this.lastName);
        formData.append('school_id', this.schoolId);
        formData.append('email', this.email);
        formData.append('password', this.password);
        formData.append('department_id', this.department.value);
        if (this.profileImage) {
          formData.append('profile_image', this.profileImage);
        }

        try {
          const response = await axios.post(
            'http://localhost/backend/src/routes/api.php?action=register',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          );

          console.log('Registration response:', response.data);

          if (response.data.status === 'success') {
            this.$q.notify({
              color: 'positive',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Registration successful!',
            });
            // Redirect to login or dashboard
            this.$router.push('/login');
          } else {
            this.error = response.data.message || 'Registration failed. Please try again.';
            console.error('Registration failed:', response.data);
          }
        } catch (error) {
          console.error('Registration error:', error.response ? error.response.data : error);
          this.error = 'An error occurred during registration. Please try again.';
        } finally {
          this.loading = false;
        }
      }
    },
    isValidEmail(val) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'Invalid email';
    },
  },
};
</script>

<style scoped>
.signup-card {
  width: 100%;
  max-width: 500px;
}
</style>