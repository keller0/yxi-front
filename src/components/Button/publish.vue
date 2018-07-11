<template>
    <div>
       <v-dialog v-model="notifyDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{saveResult}}</v-card-title>
        <v-card-text class="red--text">{{saveError}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click.native="notifyDialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        <v-btn
              color="green"
              dark
              middle
              fixed
              bottom
              right
              fab
              :loading="loading"
              @click.native.stop="saveCodeAno"
            >
              <v-icon>send</v-icon>
          </v-btn>
    </div>

</template>

<script>
import { createCode } from '@/api/code'
import { errorMsg } from '@/api/error'

export default {
    data() {
        return {
            loading: false,
            notifyDialog: false,
            saveResult: '',
            saveError: ''
        }
    },
    computed: {
        editorBuffer() {
            return this.$store.state.editor.buffer
        }
    },
    props: {
        anonymous: Boolean,
        public: Boolean
    },
    methods: {
        async saveCodeAno() {
            try {
                this.statusUpload()
                var data = {
                    'title': this.editorBuffer.title,
                    'description': this.editorBuffer.description,
                    'lang': this.editorBuffer.lang,
                    'filename': this.editorBuffer.filename,
                    'content': this.editorBuffer.content,
                    'public': this.public
                }
                var token = ''
                if (!this.anonymous) {
                    token = this.$store.state.user.token
                }
                await createCode(data, token)
                this.saveResult = 'Upload succeed'
            } catch (error) {
                this.saveError = errorMsg[error.response.data.errNumber]
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
