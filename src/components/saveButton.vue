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
import axios from 'axios'
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
                const response = await axios.post('https://api.yxi.io/v1/code', data)
                // const response = await axios.post('http://localhost:8090/v1/code', data)
                if (response.status === 200) {
                    this.saveResult = 'Save succeed.'
                } else {
                    this.saveResult = 'Save failed.'
                }
            } catch (error) {
                this.saveError = error
                console.error(error)
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
