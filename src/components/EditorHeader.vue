<template>
        <v-toolbar
            dense
            fixed
            app>
            <v-toolbar-title class="">
                <!-- an icon ? -->
                <span class="title">{{currentBuffer.title}}</span>
            </v-toolbar-title>
            <v-spacer hidden-xs-only></v-spacer>
            <v-toolbar-items >
                <v-btn flat @click="LikeCode()"><v-icon left dark>favorite</v-icon><span class="hidden-md-and-down">{{currentBuffer.likes}}</span></v-btn>
                <v-btn flat @click="closeCode()"><v-icon left dark>close</v-icon><span class="hidden-md-and-down">Close</span></v-btn>
            </v-toolbar-items>
          <singupDialog></singupDialog>
          <singinDialog></singinDialog>
        </v-toolbar>

</template>

<script>

import singupDialog from '@/components/Dialog/singup'
import singinDialog from '@/components/Dialog/singin'
import { likeCode } from '@/api/code'
import { errorMsg } from '@/api/error'

export default {
    name: 'Header',
    components: {
        singupDialog,
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
        currentBuffer() {
            return this.$store.state.editor.buffer
        }
    },
    methods: {
        goPage(path) {
            this.$router.push(path)
        },
        closeCode() {
            try {
                this.$router.go(-1)
            } catch (error) {
                console.log(error)
                this.$router.push('public')
            }
        },
        langSrc(l) {
            return '/static/' + l + '.svg'
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
        async LikeCode() {
            try {
                this.statusUpload()
                await likeCode(this.$store.state.editor.buffer.id, this.$store.state.user.token)
                this.likeResult = 'Like code succeed'
            } catch (error) {
                switch (error.response.status) {
                    case 401:
                        this.likeResult = 'You need login first'
                        break
                    default:
                        this.likeResult = errorMsg[error.response.data.errNumber]
                }
            } finally {
                this.statusUploadDone()
            }
        }
    }
}
</script>

<style scoped>
</style>
