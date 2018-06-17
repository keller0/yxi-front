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
                this.likeResult = '点赞成功'
            } catch (error) {
                //  200 401 404 409 500
                switch (error.response.status) {
                    case 401:
                        this.likeResult = '登录之后才可以点赞哦'
                        break
                    case 404:
                        this.likeResult = '点赞对象不存在'
                        break
                    case 409:
                        this.likeResult = '您已经赞过了'
                        break
                    case 500:
                        this.likeResult = '服务器问题( ⊙ o ⊙ )！'
                        break
                    default:
                        this.likeResult = '服务器问题( ⊙ o ⊙ )！'
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
