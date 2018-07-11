<template>
      <v-dialog v-model="openDialog"  max-width="500">
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
                <v-alert :value="errMsg != ''" outline color="error" icon="warning">
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
</template>

<script>
import { userRegister } from '@/api/user'
import { errorMsg } from '@/api/error'

export default {
    computed: {
        openDialog: {
            get: function() {
                return this.$store.state.dialog.singup.show
            },
            set: function() {
                this.$store.commit({
                    type: 'taggleDialog',
                    name: 'singup',
                    show: false
                })
            }
        }
    },
    data() {
        return {
            rname: '',
            remail: '',
            rpass: '',
            rvalid: false,
            errMsg: '',
            loading: false,
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
    methods: {
        async register() {
            this.loading = true
            this.errMsg = ''
            try {
                await userRegister(this.remail, this.rname, this.rpass)
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
