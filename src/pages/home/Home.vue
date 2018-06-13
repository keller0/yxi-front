<template>
    <v-app :dark="dark">
        <Header></Header>
        <v-content >
            <v-container >
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import Header from '@/components/Header'

export default {
    name: 'Home',
    components: {
        Header
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
