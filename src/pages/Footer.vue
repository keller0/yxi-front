<template>
  <v-footer class="pa-3" height="auto">
    <v-layout row wrap justify-center>
      <v-btn flat @click="goPage('/')">
        Home
      </v-btn>
      <v-btn flat @click="goPage('/help')">
        Help
      </v-btn>
      <a href="https://github.com/keller0/yxi-front" target="_blank">
          <v-btn flat>
              Github
          </v-btn>
      </a>
      <v-btn flat disabled>
          &copy; {{ new Date().getFullYear() }} yxi.io
      </v-btn>
    </v-layout>
  </v-footer>
</template>


<script>
  export default {
      data: () => ({
      }),
      methods: {
          goPage(path) {
              this.$router.push(path)
          }
      }
  }
</script>
