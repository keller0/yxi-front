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
                }
                var token = this.$store.state.user.token
                await updateCode(data, token)
                this.saveResult = '更新成功'
            } catch (error) {
                // 200 400 401 403 404
                switch (error.response.status) {
                    case 400:
                        this.saveError = '请求错误'
                        break
                    case 401:
                        this.saveError = '请先登录'
                        break
                    case 403:
                        this.saveError = '没有更新权限'
                        break
                    case 404:
                        this.saveError = '缺少更新对象'
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
