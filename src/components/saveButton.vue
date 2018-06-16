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
              <v-icon>backup</v-icon>
          </v-btn>
    </div>

</template>

<script>
import { saveCode } from '@/api/code'
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
                    'content': this.editorBuffer.content
                }
                await saveCode(data, '')
                this.saveResult = '发布成功'
            } catch (error) {
                switch (error.response.status) {
                    case 400:
                        this.saveError = '请求错误'
                        break
                    case 500:
                        this.saveError = '服务器问题( ⊙ o ⊙ )！'
                        break
                    default:
                        this.saveError = '服务器问题( ⊙ o ⊙ )！'
                        break
                }
                // console.error(error.response.status)
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
