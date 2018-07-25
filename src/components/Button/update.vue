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
              <v-icon>sync</v-icon>
          </v-btn>
    </div>

</template>

<script>
import { updateCode } from '@/api/code'
import { errorMsg } from '@/api/error'
import editorStroe from '@/store/editor'
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
            if (editorStroe.state.status.isNew === true) {
                return editorStroe.state.newBuffer
            }
            return editorStroe.getters.currentBuffer
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
                // c.Title, c.Description, c.FileName, c.Content, c.Public, userid, c.ID
                var data = {
                    'title': this.editorBuffer.title,
                    'description': this.editorBuffer.description,
                    'filename': this.editorBuffer.filename,
                    'content': this.editorBuffer.content,
                    'public': this.public,
                    'userid': this.$store.state.user.id,
                    'id': this.editorBuffer.id
                }
                if (this.anonymous) {
                    data.userid = 0
                    data.username = 'anonymous'
                } else {
                    data.username = this.$store.state.user.name
                }
                var token = this.$store.state.user.token
                await updateCode(data, token)
                this.saveResult = 'Update succeed'
                editorStroe.commit({
                    type: 'updateCBuffer',
                    code: data
                })
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
