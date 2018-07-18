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
import notifyStore from '@/store/notify'

export default {
    data() {
        return {
            loading: false,
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
                this.$store.commit({
                    type: 'updateEditorBufferLikes',
                    number: 1
                })
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
            this.loading = false
            notifyStore.commit({
                type: 'taggleNotify',
                msg: this.likeResult,
                show: true
            })
        }
    }
}
</script>
