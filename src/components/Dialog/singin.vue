<template>
    <v-dialog v-model="openDialog"  max-width="500">
        <v-card>
            <v-card-title>
                <span class="headline">Welcome back.</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm12 md12>
                      <v-text-field v-model="lname" label="username or email" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      <v-text-field v-model="lpass" label="Password" type="password" required></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-alert :value="showError" outline color="error" icon="warning">
                    {{errMsg}}
                </v-alert>
            </v-card-text>
            <v-card-actions>
                <v-btn block color="primary" flat @click="login"
                :loading="loading"
                :disabled="loading"
                >SignIn</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { userLogin } from '@/api/user'
import jwt from 'jsonwebtoken'

export default {
    computed: {
        openDialog: {
            get: function() {
                return this.$store.state.dialog.singin.show
            },
            set: function() {
                this.$store.commit({
                    type: 'taggleDialog',
                    name: 'singin',
                    show: false
                })
            }
        }
    },
    data() {
        return {
            lname: '',
            lpass: '',
            showError: false,
            errMsg: '',
            loading: false
        }
    },
    methods: {
        async login() {
            this.loading = true
            this.showError = false
            try {
                const res = await userLogin(this.lname, this.lpass)
                var decoded = jwt.decode(res.token, { complete: true })
                this.$store.commit({
                    type: 'userLogin',
                    id: decoded.payload.id,
                    name: decoded.payload.username,
                    run_token: decoded.payload.runtoken,
                    token_exp: decoded.payload.exp,
                    token: res.token
                })
                this.closeForm()
            } catch (error) {
                switch (error.response.status) {
                    case 400:
                        this.errMsg = '登录失败，请确认您的账户密码输入正确。'
                        break
                    case 401:
                        this.errMsg = '登录失败，用户密码错误'
                        break
                    case 404:
                        this.errMsg = '登录失败，用户不存在。'
                        break
                    case 500:
                        this.errMsg = '服务器问题'
                        break
                    default:
                        this.errMsg = '服务器问题'
                        break
                }
                this.showError = true
                this.loading = false
            } finally {
                console.log('finally')
            }
        },
        closeForm() {
            this.loading = false
            this.openDialog = false
        }
    }
}
</script>
