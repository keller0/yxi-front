<template>
    <v-app>
        <v-toolbar
            color="blue"
            dense
            fixed
            app>
            <v-toolbar-title class="">
                <!-- an icon ? -->
                <span class="title" @click="goHome" style="cursor: pointer;">YXI</span>
            </v-toolbar-title>
            <v-spacer class=""></v-spacer>
            <v-toolbar-items >
                <v-btn flat @click="goPage('/popular')"><v-icon left dark>trending_up</v-icon>Top</v-btn>
                <v-btn flat @click="goPage('/public')"><v-icon left dark>public</v-icon>Pub</v-btn>
                <v-btn flat @click="goPage('/mine')">My Code</v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-content >
            <v-container >
                <transition name="fade">
                    <router-view></router-view>
                </transition>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: 'Home',
    props: {
    },
    data() {
        return {
        }
    },
    methods: {
        goHome() {
            this.$router.push('/')
        },
        goPage(path) {
            this.$router.push(path)
        }
    }
}
</script>

<style scoped>
</style>
