<template>
        <v-toolbar
            dense
            fixed
            app>
            <v-toolbar-title class="">
                <!-- an icon ? -->
                <span class="title" @click="goPage('/')" style="cursor: pointer;">YXI</span>
            </v-toolbar-title>
            <v-spacer hidden-xs-only></v-spacer>
            <v-toolbar-items >
                <v-btn flat @click="goPage('/popular')"><v-icon left dark>trending_up</v-icon><span class="hidden-md-and-down">Top</span></v-btn>
                <v-btn flat @click="goPage('/public')"><v-icon left dark>public</v-icon><span class="hidden-md-and-down">Public</span></v-btn>

                <v-menu offset-y>
                <v-btn slot="activator" flat v-if="!logined">Sign In/Up</v-btn>
                <v-list  class="text-xs-center" v-if="!logined">
                    <v-list-tile @click="openDialog('singin')">Sign In</v-list-tile>
                    <v-list-tile @click="goPage('/singup')">Sign Up</v-list-tile>
                     <v-list-tile @click="goPage('/help')">Help</v-list-tile>
                </v-list>
                <v-btn slot="activator" flat v-if="logined">{{loginedUser}}</v-btn>
                <v-list class="text-xs-center" v-if="logined">
                    <v-list-tile @click="goPage('/mine')">My code</v-list-tile>
                    <v-list-tile @click="logout()">Log out</v-list-tile>
                    <v-list-tile @click="goPage('/help')">Help</v-list-tile>
                </v-list>
              </v-menu>
            </v-toolbar-items>
          <singinDialog></singinDialog>

        </v-toolbar>

</template>

<script>

import singinDialog from '@/components/Dialog/singin'

export default {
    name: 'Header',
    components: {
        singinDialog
    },
    props: {
    },
    data() {
        return {
        }
    },
    created() {
        this.loadUserInfo()
    },
    computed: {
        logined() {
            return this.$store.getters.isLogined
        },
        loginedUser() {
            return this.$store.state.user.name
        }
    },
    methods: {
        goPage(path) {
            this.$router.push(path)
        },
        loadUserInfo() {
            const info = localStorage.getItem('userinfo')
            if (info == null) {
                return
            }
            const userinfo = JSON.parse(info)
            this.$store.commit({
                type: 'userLogin',
                id: userinfo.id,
                name: userinfo.name,
                run_token: userinfo.runt_token,
                token_exp: userinfo.token_exp,
                token: userinfo.token
            })
        },
        openDialog(d) {
            this.$store.commit({
                type: 'taggleDialog',
                name: d,
                show: true
            })
        },
        logout() {
            this.$store.commit('userLogout')
        }
    }
}
</script>

<style scoped>
</style>
