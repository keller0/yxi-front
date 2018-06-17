<template>
        <v-toolbar
            color="blue"
            dense
            fixed
            app>
            <v-toolbar-title class="">
                <!-- an icon ? -->
                <span class="title" @click="goPage('/')" style="cursor: pointer;">YXI</span>
            </v-toolbar-title>
            <v-spacer hidden-xs-only></v-spacer>
            <v-toolbar-items >
                <v-btn flat @click="goPage('/popular')"><v-icon left dark>trending_up</v-icon>Top</v-btn>
                <v-btn flat @click="goPage('/public')"><v-icon left dark>public</v-icon>Pub</v-btn>

                <v-menu offset-y>
                <v-btn slot="activator" flat v-if="!logined">Sign In/Up</v-btn>
                <v-list  class="text-xs-center" v-if="!logined">
                    <v-list-tile @click="openDialog('in')">Sign In</v-list-tile>
                    <v-list-tile @click="openDialog('up')">Sign Up</v-list-tile>
                </v-list>
                <v-btn slot="activator" flat v-if="logined">{{loginedUser}}</v-btn>
                <v-list class="text-xs-center" v-if="logined">
                    <v-list-tile @click="goPage('/mine')" >My code</v-list-tile>
                    <v-list-tile @click="logout()">Log out</v-list-tile>
                </v-list>
              </v-menu>
            </v-toolbar-items>
            <v-dialog v-model="updialog"  max-width="500">
                <v-card>
                    <v-card-title>
                        <span class="headline">Sign Up</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                          <v-layout wrap>
                            <v-flex xs12 sm6 md6>
                              <v-text-field v-model="rname" label="Chose a username" required></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm6 md6>
                              <v-text-field v-model="remail" label="Email" type="email" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                              <v-text-field v-model="rpass" label="Password" type="password" required></v-text-field>
                            </v-flex>
                          </v-layout>
                        </v-container>
                        <v-alert :value="showError" outline color="error" icon="warning">
                            {{errMsg}}
                        </v-alert>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn block color="primary" flat @click="register"
                        :loading="loading"
                        :disabled="loading"
                        >Sign Up for free</v-btn>
                    </v-card-actions>
                  </v-card>
            </v-dialog>
          <v-dialog v-model="indialog"  max-width="500">
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
          <v-snackbar :timeout="3000" :top=true :right=true v-model="snackbar">
          {{ infoMsg }}
          <v-btn flat color="green" @click.native="snackbar = false">Close</v-btn>
          </v-snackbar>
        </v-toolbar>

</template>

<script>
import { userLogin, userRegister } from '@/api/user'
import jwt from 'jsonwebtoken'
export default {
    name: 'Header',
    components: {

    },
    props: {
    },
    data() {
        return {
            indialog: false,
            updialog: false,
            loading: false,
            showError: false,
            showInfo: false,
            snackbar: false,
            infoMsg: '',
            errMsg: '',
            rname: '',
            remail: '',
            rpass: '',
            lname: '',
            lpass: ''
        }
    },
    created() {
        this.loadUserInfo()
    },
    computed: {
        logined() {
            return this.$store.state.user.token_exp > Date.now() / 1000
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
            const userinfo = JSON.parse(localStorage.getItem('userinfo'))
            if (Object.keys(userinfo).length === 0 && userinfo.constructor === Object) {
                return
            }
            this.$store.commit({
                type: 'userLogin',
                id: userinfo.id,
                name: userinfo.name,
                run_token: userinfo.runt_oken,
                token_exp: userinfo.token_exp,
                token: userinfo.token
            })
        },
        openDialog(d) {
            this.showError = false
            if (d === 'in') {
                this.indialog = true
            } else {
                this.updialog = true
            }
        },
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
                this.snackbar = true
                this.infoMsg = '欢迎回来'
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
        async register() {
            this.loading = true
            this.showError = false
            try {
                await userRegister(this.remail, this.rname, this.rpass)
                // const res = await userRegister(this.remail, this.rname, this.rpass)
                this.closeForm()
                this.snackbar = true
                this.infoMsg = '注册成功'
            } catch (error) {
                // 200 400 409 500
                switch (error.response.status) {
                    case 400:
                        this.errMsg = '注册失败，请确认您输入的内容正确。'
                        break
                    case 409:
                        this.errMsg = '注册失败，用户名或邮箱已经存在'
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
        logout() {
            this.$store.commit('userLogout')
        },
        closeForm() {
            this.updialog = false
            this.indialog = false
            this.loading = false
        }
    }
}
</script>

<style scoped>
</style>
