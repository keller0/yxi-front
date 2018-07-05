<template>
    <v-app :dark="dark">
        <Header></Header>
        <v-content >
            <welcome></welcome>
            <Example></Example>
            <v-jumbotron
            :gradient="gradient"
            >
              <v-container fill-height>
                  <v-layout column align-center justify-center>
                      <h2>Test your <span class="red--text">ideas</span>.</h2>
                      <h2>Learn a <span class="red--text">new language</span>.</h2>
                      <h2>Play with your new <span class="red--text">algorithms</span>.</h2>
                      <H2><span class="red--text">...</span></H2>
                      <H2><span class="red--text">..</span></H2>
                      <H2><span class="red--text">.</span></H2>
                      <h2>Click <span class="blue--text" @click="openDialog('newCode')" style="cursor:pointer">+</span> to start your journey.</h2>
                  </v-layout>
              </v-container>
            </v-jumbotron>
        </v-content>
        <Footer></Footer>
    </v-app>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Welcome from '@/components/Welcome'
import Example from '@/components/Editor/example'
export default {
    name: 'Home',
    components: {
        Header,
        Welcome,
        Example,
        Footer
    },
    props: {
    },
    data() {
        return {
            gradient: 'to top, grey, white'
        }
    },
    computed: {
        dark() {
            return this.$store.state.config.dark
        }
    },
    methods: {
        openDialog(d) {
            this.$store.commit({
                type: 'taggleDialog',
                name: d,
                show: true
            })
        }
    }
}
</script>

<style scoped>
</style>
