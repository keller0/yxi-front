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
                    <v-btn slot="activator" flat color="blue"><v-icon>language</v-icon></v-btn>
                    <v-list  class="text-xs-center">
                        <v-list-tile @click="changeLanguage('zh')">简体中文</v-list-tile>
                        <v-list-tile @click="changeLanguage('en')">English</v-list-tile>
                    </v-list>
                </v-menu>
                
                <v-btn flat @click="goPage('/popular')"><v-icon left dark>trending_up</v-icon><span class="hidden-md-and-down">{{$t('navbar.top')}}</span></v-btn>
                <v-btn flat @click="goPage('/public')"><v-icon left dark>public</v-icon><span class="hidden-md-and-down">{{$t('navbar.public')}}</span></v-btn>

                <v-menu offset-y>
                    <v-btn slot="activator" flat v-if="!logined">{{$t('navbar.status')}}</v-btn>
                    <v-list  class="text-xs-center" v-if="!logined">
                        <v-list-tile @click="openDialog('in')">{{$t('user.signIn')}}</v-list-tile>
                        <v-list-tile @click="openDialog('up')">{{$t('user.signUp')}}</v-list-tile>
                        <v-list-tile @click="goPage('/help')">{{$t('user.help')}}</v-list-tile>
                    </v-list>
                    <v-btn slot="activator" flat v-if="logined">{{loginedUser}}</v-btn>
                    <v-list class="text-xs-center" v-if="logined">
                        <v-list-tile @click="goPage('/mine')">{{$t('user.myCode')}}</v-list-tile>
                        <v-list-tile @click="logout()">{{$t('user.logOut')}}</v-list-tile>
                        <v-list-tile @click="goPage('/help')">{{$t('user.help')}}</v-list-tile>
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
                          <v-form v-model="rvalid">
                          <v-layout wrap>
                            <v-flex xs12 sm6 md6>
                              <v-text-field v-model="rname" :rules="nameRules" label="Chose a username" required></v-text-field>
                            </v-flex>

                            <v-flex xs12 sm6 md6>
                              <v-text-field v-model="remail" :rules="emailRules" label="Email" type="email" required></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                              <v-text-field v-model="rpass" :rules="passwordRules" label="Password" type="password" required></v-text-field>
                            </v-flex>
                          </v-layout>
                          </v-form>
                        </v-container>
                        <v-alert :value="showError" outline color="error" icon="warning">
                            {{errMsg}}
                        </v-alert>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn block color="primary" flat @click="register"
                        :loading="loading"
                        :disabled="loading || !rvalid"
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
            lpass: '',
            rvalid: false,
            passwordRules: [
                v => !!v || 'Password is required',
                v => v.length > 8 || 'Password must be more than 8 characters'
            ],
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters',
                v => /^[a-zA-Z0-9]+$/.test(v) || 'Name must be valid'
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ]
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
        },
        changeLanguage(lang) {
            this.$i18n.locale = lang
        }
    }
}
</script>

<style scoped>
</style>
