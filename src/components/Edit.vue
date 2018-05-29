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
import axios from 'axios'
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/lib/codemirror.css'

const YXI_RUN_API = 'http://r.yxi.io/v1'
// const YXI_RUN_API = 'http://127.0.0.1/v1'
const code = '#include<stdio.h>\n\nint main() {\n    printf("hello");\n}'

export default {
  components: {
    codemirror
  },
  data: function () {
    return {
      name:'Edit',
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
    runcode: function () {
      this.result = ''
      this.runing = true
      axios({
        method:'post',
        url: YXI_RUN_API + '/c',
        data: {
          'files': [
            {
              'content': this.code,
              'name': 'main.c'
            }
          ],
          'stdin': '',
          'argument': ''
        },
        headers:{
          'Content-Type':'application/json',
          'Api-Key':'sharedkey'
          }
      }).then(resp => {
        if (resp.status === 200) {
          this.result += resp.data.stdout
          this.result += resp.data.stderr
        }
      }).catch(error => {
        if (error.response.status === 500) {
          this.error = error.response.data.error
        }else  if (error.response.status === 403) {
          this.error = error.response.data
        }
        this.errShow = true
      })
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
