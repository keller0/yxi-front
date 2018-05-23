<template>

<el-container id="yxi">

  <el-main>
    <el-card class="box-card" id="files">
      <!-- <codemirror v-model="code" :options="cmOption" @input="onChange" ></codemirror> -->
      <codemirror v-model="code" :options="cmOption" ></codemirror>
    </el-card>
    <el-button type="primary" ref="oneFile" @click="runcode" :loading="runing">RUN</el-button>

    <el-card shadow="always">
        <el-alert v-if="error"
        title="error:"
        type="error"
        close-text="X">
        {{error}}
      </el-alert>
      <textarea v-model="restul" placeholder="result...">
      </textarea>
    </el-card>
  </el-main>
  <el-aside>

  </el-aside>
</el-container>

</template>

<script>
import axios from 'axios'
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/lib/codemirror.css'
// import 'codemirror/keymap/emacs.js'

const YXI_RUN_API = 'http://127.0.0.1:8080/v1'
const code = '#include<stdio.h>\n\nint main() {\n    printf("hello");\n}'

export default {
  components: {
    codemirror
  },
  name: 'yxi',
  data: function () {
    return {
      runing: false,
      error: '',
      restul: '',
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
    // onChange: function () {
    //   console.log('onchnage', this.code)
    // },
    runcode: function () {
      this.restul = ''
      this.runing = true
      axios.post(YXI_RUN_API + '/c',
        // eslint-disable-next-line
        {'files': [
          {
            'content': this.code,
            'name': 'main.c'
          }
        ],
        'stdin': '',
        'argument': ''}
      ).then(resp => {
        if (resp.status === 200) {
          this.restul += resp.data.stdout
          this.restul += resp.data.stderr
        }
        this.runing = false
      }).catch(error => {
        if (error.response.status === 500) {
          this.error = error.response.data.error
        }
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
