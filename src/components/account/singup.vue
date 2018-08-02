<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card  v-if="!done">
        <v-card-title>
            <span class="headline">Sign Up</span>
        </v-card-title>
        <v-card-text>
            <v-container grid-list-md>
              <v-form v-model="valid">
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="rname" :rules="nameRules" label="Chose a username" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="remail" :rules="emailRules" label="Email" type="email" required></v-text-field>
                </v-flex>
              </v-layout>
              </v-form>
            </v-container>
            <v-alert :value="errMsg != ''" outline color="error" icon="warning" dismissible @click="errMsg=''">
                {{errMsg}}
            </v-alert>
        </v-card-text>
        <v-card-actions>
            <v-btn block color="primary" flat @click="register"
            :loading="loading"
            :disabled="loading || !valid"
            >Sign Up for free</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="done">
         <v-card-title primary-title>
          <div>
            <div class="headline">Almost there!</div>
          </div>
        </v-card-title>
        <v-card-text>
            <div>Please check you your mailbox({{remail}}).</div>
        </v-card-text>
        <v-card-actions>
          <v-btn
          flat block color="primary"
          @click="openDialog('singin')"
          >Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
import { userRegister } from '@/api/user'
import { errorMsg } from '@/api/error'

export default {
    data: () => ({
        rname: '',
        remail: '',
        valid: false,
        done: false,
        loading: false,
        nameRules: [
            v => !!v || 'Name is required',
            v => v.length <= 15 || 'Name must be less than 10 characters',
            v => /^[a-zA-Z0-9]+$/.test(v) || 'Name must be valid'
        ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        errMsg: ''
    }),
    created() {

    },
    methods: {
        async register() {
            if (!this.valid) {
                this.errMsg = 'Email and name must be valid'
                return
            }
            this.loading = true
            this.errMsg = ''
            try {
                await userRegister(this.remail, this.rname)
                this.done = true
            } catch (error) {
                this.errMsg = errorMsg[error.response.data.errNumber]
                this.loading = false
            } finally {
                this.loading = false
                console.log('finally')
            }
        },
        openDialog(d) {
            this.$store.commit({
                type: 'taggleDialog',
                name: d,
                show: true
            })
        }
    }
}
</script>
