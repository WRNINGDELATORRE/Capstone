<template>
    <q-page class="q-pa-m">
        <h1 class="font">Admin's Dashboard</h1>
            
    </q-page>
</template>
<script>


export default {
  data() {
    return {

    }
  },
  methods: {
    goToAdminHome(){
        this.$router.push('/admin-home');
    }
  }
}
</script>
<style scoped>
.font {
  font-family: 'Nunito', sans-serif;
  font-weight: 10;
  margin-left: 90px; /* Adjust the margin to your desired space */
  color: rgb(25, 10, 153);
  margin-right: 15px;
}
</style>