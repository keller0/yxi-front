<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card v-if="!done">
         <v-card-title primary-title>
          <div>
            <div class="headline">Reset your password</div>
            <span class="grey--text">Enter your email address and we will send you a link to reset your password.</span>
          </div>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-form v-model="valid">
                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Your Email"
                    single-line
                    solo
                    required
                  ></v-text-field>
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
          @click="sendMail"
          :loading="loading"
          >Send password reset email</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="done">
         <v-card-title primary-title>
          <div>
            <div class="headline">Your password reset email has been sent!</div>
            <div class="headline">You should be receiving it shortly.</div>
            <div class="headline">Please check your emails.</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-btn
          flat block color="primary"
          @click="gohome"
          >Back Home</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
import { resetPassEmail } from '@/api/user'
import { errorMsg } from '@/api/error'

export default {

    data: () => ({
        valid: false,
        loading: false,
        done: false,
        errMsg: '',
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email must be valid'
        ]
    }),
    methods: {
        gohome() {
            this.$router.push('/')
        },
        async sendMail() {
            if (!this.valid) {
                this.errMsg = 'Email must be valid'
                return false
            }
            this.loading = true
            this.errMsg = ''
            this.result = ''
            try {
                await resetPassEmail(this.email)
                this.done = true
            } catch (error) {
                this.errMsg = errorMsg[error.response.data.errNumber]
                this.loading = false
            } finally {
                this.loading = false
                console.log('finally')
            }
        }
    }
}
</script>
