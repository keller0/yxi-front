<template>
    <div>
        <v-progress-linear :indeterminate="runBar" :value="pecBar"></v-progress-linear>
        <v-card-actions>
            <v-btn
            color="primary"
            :loading="loading"
            :disabled="loading"
            @click="runcode">Run</v-btn>
            <v-chip v-show="status != ''" color="red" text-color="white">{{error}}</v-chip>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="rshow = !rshow">
                <v-icon>{{ rshow ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
                <v-card-text v-show="rshow">
                <div>
                    <pre class="code-result">{{ result }}</pre>
                </div>
            </v-card-text>
        </v-slide-y-transition>
    </div>
</template>

<script>
import { codeRunResult } from '@/api/runCode'
import { errorMsg } from '@/api/error'
export default {
    computed: {
        editorBuffer() {
            return this.$store.state.editor.buffer
        }
    },
    data() {
        return {
            status: '',
            rshow: false,
            error: '',
            result: 'nothing...',
            runBar: false,
            pecBar: 0,
            loading: false
        }
    },
    methods: {
        async runcode() {
            try {
                this.statusStartRun()
                var data = {
                    files: [
                        {
                            content: this.editorBuffer.content,
                            name: this.editorBuffer.filename
                        }
                    ],
                    stdin: '',
                    argument: {
                        compile: [],
                        run: []
                    }
                }
                const res = await codeRunResult('/run/' + this.editorBuffer.lang, data)
                this.result += res.userResult.stdout
                this.result += res.userResult.stderr
                this.status = res.userResult.exiterror
                this.error = res.taskError === '' ? res.userResult.exiterror : res.taskError
            } catch (error) {
                this.status = error.response.status
                this.error = errorMsg[error.response.data.errNumber]
            } finally {
                this.statusStopRun()
            }
        },
        statusStartRun() {
            this.error = ''
            this.status = ''
            this.result = ''
            this.runBar = true
            this.rshow = false
            this.loading = true
        },
        statusStopRun() {
            this.runBar = false
            this.pecBar = 100
            this.rshow = true
            this.loading = false
        }
    }
}
</script>

<style lang="scss" scoped>
.code-result {
    overflow: auto;
}
</style>
