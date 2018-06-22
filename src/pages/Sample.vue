<template>
    <v-app :dark="dark">
        <Header></Header>
        <v-content >
            <v-container >
                <router-view></router-view>
            </v-container>
        </v-content>
        <Footer></Footer>
    </v-app>
</template>

<script>
import Header from '@/components/Header'

import Footer from '@/components/Footer'

export default {
    components: {
        Header,
        Footer
    },
    props: {
    },
    data() {
        return {
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
