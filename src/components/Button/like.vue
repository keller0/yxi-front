<template>
    <div>
       <v-dialog v-model="notifyDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{likeResult}}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="notifyDialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        <v-btn
              color="pink"
              dark
              middle
              fixed
              bottom
              right
              fab
              :loading="loading"
              @click.native.stop="LikeCode"
            >
              <v-icon>favorite</v-icon>
          </v-btn>
    </div>

</template>

<script>
import { likeCode } from '@/api/code'
import { errorMsg } from '@/api/error'

export default {
    data() {
        return {
            loading: false,
            notifyDialog: false,
            likeResult: ''
        }
    },
    computed: {
        editorBuffer() {
            return this.$store.state.editor.buffer
        }
    },
    props: {
    },
    methods: {
        async LikeCode() {
            try {
                this.statusUpload()
                await likeCode(this.$store.state.editor.buffer.id, this.$store.state.user.token)
                this.likeResult = 'Like code succeed'
            } catch (error) {
                switch (error.response.status) {
                    case 401:
                        this.likeResult = 'You need login first'
                        break
                    default:
                        this.likeResult = errorMsg[error.response.data.errNumber]
                }
            } finally {
                this.statusUploadDone()
            }
        },
        statusUpload() {
            this.loading = true
        },
        statusUploadDone() {
            this.notifyDialog = true
            this.loading = false
        }
    }
}
</script>
