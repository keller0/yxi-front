<template>
    <div>
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
                <v-btn flat @click="LikeCode()" v-if="currentBuffer.id"><v-icon left dark>favorite</v-icon><span class="hidden-md-and-down">{{currentBuffer.likes}}</span></v-btn>
                <v-btn flat @click="closeCode()"><v-icon left dark>close</v-icon><span class="hidden-md-and-down">Close</span></v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <singupDialog></singupDialog>
        <singinDialog></singinDialog>
        <notify></notify>
    </div>

</template>

<script>

import singupDialog from '@/components/Dialog/singup'
import singinDialog from '@/components/Dialog/singin'
import { likeCode } from '@/api/code'
import { errorMsg } from '@/api/error'
import notifyStore from '@/store/notify'
import notify from '@/components/Notify'

export default {
    name: 'Header',
    components: {
        singupDialog,
        singinDialog,
        notify
    },
    props: {
    },
    data() {
        return {
            likeResult: ''
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
        closeCode() {
            try {
                this.$router.go(-1)
            } catch (error) {
                console.log(error)
                this.$router.push('public')
            }
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
        async LikeCode() {
            try {
                await likeCode(this.$store.state.editor.buffer.id, this.$store.state.user.token)
                this.likeResult = 'Like code succeed'
                this.$store.commit({
                    type: 'updateEditorBufferLikes',
                    number: 1
                })
            } catch (error) {
                switch (error.response.status) {
                    case 401:
                        this.likeResult = 'You need login first'
                        break
                    default:
                        this.likeResult = errorMsg[error.response.data.errNumber]
                }
            } finally {
                this.showMsg()
            }
        },
        showMsg() {
            notifyStore.commit({
                type: 'taggleNotify',
                msg: this.likeResult,
                show: true
            })
        }
    }
}
</script>

<style scoped>
</style>
