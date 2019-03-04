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
                <v-menu offset-y>
                <v-list  class="text-xs-center" >
                     <v-list-tile @click="goPage('/help')">Help</v-list-tile>
                </v-list>
              </v-menu>
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
    created() {
        this.loadUserInfo()
    },
    computed: {
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
        }
    }
}
</script>

<style scoped>
</style>
