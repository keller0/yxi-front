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
                <v-btn flat v-shortkey.once="['esc']" @shortkey="closeCode()" @click="closeCode()"><v-icon left dark>close</v-icon><span class="hidden-md-and-down">Close</span></v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <notify></notify>
    </div>

</template>

<script>

import { likeCode } from '@/api/code'
import { errorMsg } from '@/api/error'
import notifyStore from '@/store/notify'
import notify from '@/components/Notify'
import editorStroe from '@/store/editor'
export default {
    name: 'Header',
    components: {
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
            if (editorStroe.state.status.isNew === true) {
                return editorStroe.state.newBuffer
            }
            return editorStroe.getters.currentBuffer
        }
    },
    methods: {
        closeCode() {
            if (this.$store.state.backurl === '') {
                this.$router.push('/popular')
            } else {
                this.$router.push(this.$store.state.backurl)
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
                await likeCode(this.currentBuffer.id, this.$store.state.user.token)
                this.likeResult = 'Like code succeed'
                editorStroe.commit({
                    type: 'updateCurrentLikes',
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
