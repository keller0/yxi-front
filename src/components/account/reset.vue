<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card v-if="!done">
         <v-card-title primary-title>
          <div>
            <div class="headline">New password</div>
            <span class="grey--text">Enter your new password  for {{email}}</span>
          </div>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-form v-model="valid">
                  <v-text-field v-show="false"></v-text-field>
                  <v-flex xs12 sm12 md12>
                      <v-text-field v-model="password" :rules="passwordRules" label="Password" type="password" required></v-text-field>
                  </v-flex>
                </v-form>
              </v-flex>
            </v-layout>
          </v-container>
          <v-alert :value="errMsg != ''" outline color="error" icon="warning" dismissible @click="errMsg=''">
              {{errMsg}}
          </v-alert>
        </v-card-text>
        <v-card-actions>
            <v-btn
              flat block color="primary"
              @click="updatePass"
              :loading="loading"
            >Update password</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="done">
         <v-card-title primary-title>
          <div>
            <div class="headline">Your password has been updated!</div>
          </div>
        </v-card-title>
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
import { resetPass } from '@/api/user'
import { errorMsg } from '@/api/error'

export default {
    props: [
        'email',
        'token'
    ],
    data: () => ({
        valid: false,
        done: false,
        loading: false,
        password: '',
        passwordRules: [
            v => !!v || 'Password is required',
            v => v.length > 8 || 'Password must be more than 8 characters'
        ],
        errMsg: ''
    }),
    created() {
    },
    methods: {
        async updatePass() {
            if (!this.valid) {
                this.errMsg = 'Password must be valid'
                return false
            }
            this.loading = true
            this.errMsg = ''
            try {
                await resetPass(this.email, this.password, this.token)
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
