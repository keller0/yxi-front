<template>
        <v-toolbar
            color="blue"
            dense
            fixed
            app>
            <v-toolbar-title class="">
                <!-- an icon ? -->
                <span class="title" @click="goPage('/')" style="cursor: pointer;">YXI</span>
            </v-toolbar-title>
            <v-spacer class=""></v-spacer>
            <v-toolbar-items >
                <v-btn flat @click="goPage('/popular')"><v-icon left dark>trending_up</v-icon>Top</v-btn>
                <v-btn flat @click="goPage('/public')"><v-icon left dark>public</v-icon>Pub</v-btn>
                <v-btn flat @click="goPage('/mine')" v-if="logined">My Code</v-btn>
                <v-btn flat v-if="!logined">Login/Register</v-btn>
            </v-toolbar-items>
        </v-toolbar>
</template>

<script>

export default {
    name: 'Header',
    components: {

    },
    props: {
    },
    data() {
        return {
        }
    },
    computed: {
        logined() {
            return this.$store.state.user.logined
        }
    },
    methods: {
        goPage(path) {
            this.$router.push(path)
        }
    }
}
</script>

<style scoped>
</style>
