<template>
    <div>
        <v-progress-linear :indeterminate="runBar" :value="pecBar"></v-progress-linear>
        <v-card-actions>
            <v-btn
            color="primary"
            :loading="loading"
            :disabled="loading"
            @click="runcode">Run</v-btn>
            <v-chip v-show="error != ''" color="red" text-color="white">{{error}}</v-chip>
            <v-spacer></v-spacer>
            <editorSettion v-show="error == ''"></editorSettion>
            <v-btn icon @click.native="rshow = !rshow">
                <v-icon>{{ rshow ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
            <div v-show="rshow">
                <v-tabs
                  left
                  v-model="tabs"
                >
                    <v-tab
                      :key="'stdin'"
                    >
                      stdin
                    </v-tab>
                    <v-tab
                      :key="'result'"
                    >
                      result
                    </v-tab>
              </v-tabs>
              <v-tabs-items v-model="tabs">
                  <v-tab-item
                    :key="'stdin'"
                  >
                      <v-card>
                          <v-card-text>
                          <v-text-field
                          v-model="stdin"
                          multi-line
                          ></v-text-field>
                          </v-card-text>
                      </v-card>
                  </v-tab-item>
                  <v-tab-item
                    :key="'result'"
                  >
                      <v-card>
                          <v-card-text>
                          <pre class="code-result">{{ result }}</pre>
                          </v-card-text>
                      </v-card>
                  </v-tab-item>
              </v-tabs-items>
              </div>
        </v-slide-y-transition>
    </div>
</template>

<script>
import { codeRunResult } from '@/api/runCode'
import { errorMsg } from '@/api/error'
import editorSettion from '@/components/Button/editorSetting'
import editorStroe from '@/store/editor'
export default {
    components: {
        editorSettion
    },
    computed: {
        editorBuffer() {
            if (editorStroe.state.status.isNew === true) {
                return editorStroe.state.newBuffer
            }
            return editorStroe.getters.currentBuffer
        }
    },
    data() {
        return {
            stdin: '',
            tabs: null,
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
                    stdin: this.stdin,
                    argument: {
                        compile: [],
                        run: []
                    }
                }
                const res = await codeRunResult('/run/' + this.editorBuffer.lang, data)
                if (res.userResult != null) {
                    this.result += res.userResult.stdout
                    this.result += res.userResult.stderr
                }
                this.error = res.taskError === '' ? res.userResult.exiterror : res.taskError
            } catch (error) {
                this.error = errorMsg[error.response.data.errNumber]
            } finally {
                this.statusStopRun()
            }
        },
        statusStartRun() {
            this.error = ''
            this.result = ''
            this.runBar = true
            this.rshow = false
            this.loading = true
        },
        statusStopRun() {
            this.tabs = '1'
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
