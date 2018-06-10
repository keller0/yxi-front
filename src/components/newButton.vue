<template>
    <div>
        <v-btn
              color="pink"
              dark
              middle
              fixed
              bottom
              right
              fab
              @click.native.stop="newCodeDialog = !newCodeDialog"
            >
              <v-icon>add</v-icon>
          </v-btn>
          <v-dialog v-model="newCodeDialog" max-width="500px">
              <v-card>
                  <v-card-text>
                      <v-select
                        v-model="selectedLanguage"
                        :items="languges"
                        :rules="[v => !!v || 'Item is required']"
                        label="Language"
                        required
                      ></v-select>
                  </v-card-text>

                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click.native="goCodeNew">Submit</v-btn>
                  </v-card-actions>
              </v-card>
          </v-dialog>
    </div>

</template>

<script>
  import { supportedLaguage } from '@/utils/languages'
  export default {
      data() {
          return {
              name: 'newButton',
              newCodeDialog: false,
              selectedLanguage: 'c',
              languges: supportedLaguage
          }
      },
      methods: {
          goCodeNew() {
              this.$router.push('/new/' + this.selectedLanguage)
          }
      }
  }
</script>
