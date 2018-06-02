<template>
    <v-app id="home">
        <v-navigation-drawer
            :clipped="$vuetify.breakpoint.lgAndUp"
            v-model="drawer"
            fixed
            app>
            <v-list dense>
                <v-list-tile v-show="!$vuetify.breakpoint.lgAndUp" @click.stop="drawer = !drawer">
                    <v-list-tile-action>
                        <v-icon color="grey darken-1">home</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title class="grey--text text--darken-1">Home</v-list-tile-title>
                </v-list-tile>
                <template v-for="(item) in $router.options.routes"  v-if="item.menu">
                    <template v-for="child in item.children">
                        <v-list-tile :key="child.path" @click="goPage(child.path)">
                            <v-list-tile-action>
                                <v-icon>{{ child.icon }}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title>{{ child.name }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                </template>
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
                <span class="title" @click="goPage('')" style="cursor: pointer;">YXI</span>
            </v-toolbar-title>
        </v-toolbar>

        <v-content >
            <v-container >
                <router-view></router-view>
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
            items: [
                { icon: 'trending_up', text: 'Popular' },
                { icon: 'public', text: 'Public' },
                { icon: 'folder', text: 'Mine' }
            ]
        }
    },
    mounted() {
        console.log(this.$router.options.routes)
    },
    methods: {
        goPage: function(path) {
            this.$router.push('/' + path)
        }
    }
}
</script>

<style scoped>
</style>
