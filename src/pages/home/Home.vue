<template>
    <v-app id="home">
        <v-navigation-drawer
            :clipped="$vuetify.breakpoint.lgAndUp"
            v-model="drawer"
            fixed
            app>
            <v-list dense>
                <v-list-tile 
                    v-show="!$vuetify.breakpoint.lgAndUp" 
                    @click="goHome"
                    @click.stop="drawer = !drawer">
                    <v-list-tile-action>
                        <v-icon color="grey darken-1">home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title class="grey--text text--darken-1">Home</v-list-tile-title>
                </v-list-tile>

                 <v-list-tile v-for="menu in menus" :key="menu.path" @click="goPage(menu.path)">
                    <v-list-tile-action>
                        <v-icon>{{ menu.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ menu.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon color="grey darken-1">help</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title class="grey--text text--darken-1">Help</v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                    <v-list-tile-action>
                        <v-icon color="grey darken-1">settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title class="grey--text text--darken-1">Settings</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        
        <v-toolbar
            color=""
            dense
            fixed
            clipped-left
            app>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-icon class="mx-3"></v-icon>
            <v-toolbar-title class="mr-5 align-center">
                <!-- an icon ? -->
                <span class="title" @click="goHome" style="cursor: pointer;">YXI</span>
            </v-toolbar-title>
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
        source: String
    },
    data() {
        return {
            name: 'home',
            drawer: null,
            edittheme: 'blackboard',
            menus: [
                { icon: 'trending_up', title: 'Popular', path: '/popular' },
                { icon: 'public', title: 'Public', path: '/public' },
                { icon: 'folder', title: 'Mine', path: '/mine' }
            ]
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
