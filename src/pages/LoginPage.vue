<template>
    <q-page class="flex flex-center bg-grey-2">
      <q-card class="login-card q-pa-lg shadow-10">
        <q-card-section class="text-center">
          <div class="text-h4 text-primary q-mb-md">CPC Lost & Found</div>
          <div class="text-h5 text-weight-bold">Welcome Back</div>
          <div class="text-subtitle1 text-grey-7">Log in to your account</div>
        </q-card-section>
  
        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
            rounded outlined
              v-model="schoolId"
              label="School ID"
              :rules="[val => !!val || 'School ID is required']"
            />
  
            <q-input
            rounded outlined
              v-model="password"
              label="Password"
              :type="isPwd ? 'password' : 'text'"
              :rules="[val => !!val || 'Password is required']"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
  
            <div class="flex justify-between items-center q-mt-sm">
              <q-checkbox v-model="rememberMe" label="Remember me" />
              <q-btn flat dense color="primary" label="Forgot password?" @click="$router.push('/forgot-password')" />
            </div>
  
            <q-btn unelevated size="lg" color="primary" class="full-width q-mt-md" label="Log In" type="submit"/>
          </q-form>
        </q-card-section>
  
        <q-card-section class="text-center q-pa-none">
          <p class="text-grey-7">Don't have an account?
            <q-btn flat color="primary" label="Sign up" @click="$router.push('/signup')" />
          </p>
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
  <script>
  import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useStore } from 'vuex' // Import useStore from Vuex

export default {
  name: 'LoginPage',
  setup () {
    const $q = useQuasar()
    const router = useRouter()
    const store = useStore() // Use Vuex store

    const schoolId = ref('')
    const password = ref('')
    const isPwd = ref(true)
    const rememberMe = ref(false)

    const onSubmit = async () => {
      try {
        console.log('Attempting login with:', { school_id: schoolId.value, password: password.value });
        
        // Use Vuex action to login
        const result = await store.dispatch('login', {
          school_id: schoolId.value,
          password: password.value
        });

        console.log('Login result:', result);
        $q.notify({
          color: 'positive',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Login successful'
        });

        // Check user role and redirect accordingly
        const userRole = store.getters.userRole;
        if (userRole === 'admin') {
          router.push('/admin-dashboard');
        } else if (userRole === 'student') {
          router.push('/student-dashboard');
        } else {
          $q.notify({
            color: 'negative',
            textColor: 'white',
            icon: 'warning',
            message: 'User role not recognized'
          });
        }
      } catch (error) {
        console.error('Login error:', error);
        $q.notify({
          color: 'negative',
          textColor: 'white',
          icon: 'warning',
          message: error.message || 'Login failed'
        });
      }
    }

    return {
      schoolId,
      password,
      isPwd,
      rememberMe,
      onSubmit
    }
  }
}
</script>
  
  <style scoped>
  .login-card {
    width: 100%;
    max-width: 400px;
  }
  </style>