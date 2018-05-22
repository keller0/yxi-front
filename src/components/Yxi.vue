<template>

<el-container id="yxi">

  <el-main>
    <el-card class="box-card">
      <codemirror v-model="code" :options="editorOption" ref="ondeEditor" @change="chnageCode" ></codemirror>
    </el-card>
    <el-button type="primary" @click="runcode(code)">运行</el-button>

    <el-card shadow="always">
      {{stdout}}
      {{stderr}}
      <el-alert v-if="error"
      title="error:"
      type="error"
      close-text="X">
      {{error}}
      </el-alert>
    </el-card>
  </el-main>
  <el-aside>

  </el-aside>
</el-container>

</template>

<script>
import axios from 'axios'
import { codemirror } from 'vue-codemirror-lite'
// require('codemirror/mode/javascript/javascript.js')
require('codemirror/mode/clike/clike.js')
require('codemirror/addon/hint/show-hint.js')
require('codemirror/addon/hint/show-hint.css')
// require('codemirror/addon/hint/javascript-hint.js')

// themes need to be inlcuded
// require('codemirror/theme/blackboard.css')

const YXI_RUN_API = 'http://127.0.0.1:8080/v1'

export default {
  components: {
    codemirror
  },
  name: 'yxi',
  data: function () {
    return {
      stdout: '',
      stderr: '',
      error: '',
      code: '#include<stdio.h>\nint main() {\n  printf("hello");\n}',
      editorOption: {
        mode: 'text/x-csrc',
        lineNumbers: true,
        lineWrapping: true,
        extraKeys: {'Ctrl-Space': 'autocomplete'}
        // theme: 'blackboard'
      }
    }
  },
  methods: {
    chnageCode: function (e) {
      console.log(e)
    },
    runcode: function (c) {
      this.stdout = ''
      this.stderr = ''
      // axios.get(YXI_RUN_API).then(function (resp) {
      //   console.log(resp)
      // })
      console.log(c)
      // eslint-disable-next-line
      // {"files":[{"content":"//code from http://www.99-bottles-of-beer.net/language-c-1954.html kind of fine\n#include <stdio.h>\n#include <stdlib.h>\n\nstatic void song( int bottles )\n{\n\twhile( (printf(\"%d bottles of beer on the wall, %d bottles of beer.\\n\"\n\t\t       \"Take one down and pass it around, %d bottle%s of beer on the wall.\\n\\n\",\n\t\t       bottles, bottles, bottles-1, bottles>2? \"s\":\"\"), bottles > 2) )\n\t\twhile( (--bottles,0) ) {}\n\twhile( (puts(\"1 bottle of beer on the wall, 1 bottle of beer.\\n\"\n\t\t     \"Take one down and pass it around, no more bottles of beer on the wall.\\n\\n\"\n\t\t     \"No more bottles of beer on the wall, no more bottles of beer.\\n\"\n\t\t     \"Go to the store and buy some more, 99 bottles of beer on the wall.\"),0) ) {}\n}\n\nint main()\n{\n\twhile( (song(99), exit(0), 0) ) {}\n}\n\n","name":"main.c"}],"stdin":"","argument":""}
      axios.post(YXI_RUN_API + '/c',
        // eslint-disable-next-line
        {"files":[{"content":"#include<stdio.h>\nint main() {\n  printf(\"hello\");\n}","name":"main.c"}],"stdin":"","argument":""}
      ).then(resp => {
        // console.log(resp)
        if (resp.status === 200) {
          this.stdout = resp.data.stdout
          this.stderr = resp.data.stderr
        }
      }).catch(error => {
        if (error.response.status === 500) {
          this.error = error.response.data.error
        }
      })
    }
  }
}

</script>
<style>

</style>
