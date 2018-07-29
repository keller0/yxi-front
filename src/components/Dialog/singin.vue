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
                      Username or Email
                      <v-text-field v-model="lname" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm12 md12>
                      Password <span class="blue--text" style="cursor:pointer" @click="passwordReset">forgot?</span>
                      <v-text-field v-model="lpass" type="password" required></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-alert :value="errMsg != ''" outline color="error" icon="warning" dismissible @click="errMsg=''">
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
import { errorMsg } from '@/api/error'

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
            errMsg: '',
            loading: false
        }
    },
    methods: {
        passwordReset() {
            this.openDialog = false
            this.$router.push('/password_reset')
        },
        async login() {
            this.loading = true
            this.errMsg = ''
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
                this.errMsg = errorMsg[error.response.data.errNumber]
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
