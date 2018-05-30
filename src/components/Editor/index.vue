<template>
  <!-- <v-app> -->

      <v-card width="100%">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">The title</h3>
            <div>description</div>
          </div>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-text>
          <codemirror v-model="code" :options="cmOption" ></codemirror>
          <v-bottom-sheet>
            <v-btn slot="activator" @click="runcode" dark>Run</v-btn>
            <v-card tile>
              <v-alert v-model="errShow" type="error" dismissible>
                {{error}}
              </v-alert>
              <textarea v-model="result" placeholder="running...">
              </textarea>
            </v-card>
          </v-bottom-sheet>
        </v-card-text>
      </v-card>

  <!-- </v-app> -->
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/lib/codemirror.css'

import { resultC } from '@/api/langC'

const code = '#include<stdio.h>\n\nint main() {\n    printf("hello");\n}'

export default {
    components: {
        codemirror
    },
    data: function() {
        return {
            name: 'Edit',
            errShow: false,
            runing: false,
            error: '',
            result: '',
            code,
            cmOption: {
                tabSize: 4,
                lineNumbers: true,
                line: true,
                mode: 'text/x-csrc'
                // keyMap: 'emacs'
            }
        }
    },
    methods: {
        async runcode() {
            try {
                const data = {
                    files: [
                        {
                            content: this.code,
                            name: 'main.c'
                        }
                    ],
                    stdin: '',
                    argument: ''
                }
                const res = await resultC(data)
                this.result += res.stdout
                this.result += res.stderr
            } catch (error) {
                this.errShow = true
                this.error = error.message
                console.error(error)
            }
        }
    }
}

</script>
<style scoped>

textarea {
  width: 100%;
  height: 100px;
}

</style>
