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
                <v-btn flat @click="goPage('/mine')" v-if="logined">My Code</v-btn>
                <v-menu offset-y>
                <v-btn slot="activator"  flat v-if="!logined">Sign In/Up</v-btn>
                <v-list>
                  <v-list-tile >
                    <v-btn flat v-if="!logined" @click="indialog=true">Sign In</v-btn>
                  </v-list-tile>
                  <v-list-tile >
                    <v-btn flat v-if="!logined" @click="updialog=true">Sign Up</v-btn>
                  </v-list-tile>
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
                    </v-card-text>
                    <v-card-actions>
                        <v-btn block color="primary" flat @click="register">Sign Up for free</v-btn>
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
                  </v-card-text>
                  <v-card-actions>
                      <v-btn block color="primary" flat @click="login">SignIn</v-btn>
                  </v-card-actions>
              </v-card>
          </v-dialog>

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
            indialog: false,
            updialog: false,
            rname: '',
            remail: '',
            rpass: '',
            lname: '',
            lpass: ''
        }
    },
    computed: {
        logined() {
            return this.$store.state.user.logined
        }
    },
    methods: {
        goPage(path) {
            this.$router.push(path)
        },
        register() {
            console.log(this.rname, this.remail, this.rpass)
        },
        login() {
            console.log(this.lname, this.lpass)
        }
    }
}
</script>

<style scoped>
</style>
