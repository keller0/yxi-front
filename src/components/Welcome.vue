<template>
   <v-jumbotron
    :gradient="gradient"
    dark
  >
    <v-container fill-height>
      <v-layout column align-right justify-center>
      <h1 class="white--text">How long does it take you to <span class="green--text">run a piece of code</span>?</h1>
      <h1 class="white--text">More then <span class="red--text">10 seconds</span>?</h1>
      <h1 class="white--text">Join us now, <span class="blue--text">CREATE/RUN/SHARE</span> your code in the blink of an eye.</h1>
    </v-layout>
    </v-container>
  </v-jumbotron>
</template>


<script>
export default {
    components: {
    },
    props: {
    },
    data() {
        return {
            gradient: 'to top right, black, rgba(25,32,72, .7)'
        }
    },
    computed: {
        dark() {
            return this.$store.state.config.dark
        }
    },
    methods: {
    }
}
</script>

<style scoped>
</style>
