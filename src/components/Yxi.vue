<template>

<el-container id="yxi">
  <el-aside width="200px">
    <el-row>
      <el-button icon="el-icon-search" circle></el-button>
    </el-row>
    <el-row>
      <el-button type="primary" icon="el-icon-edit" circle></el-button>
    </el-row>
  </el-aside>
  <el-main>
    <el-card class="box-card">
      <codemirror v-model="code" :options="editorOption" @change="chnageCode" ></codemirror>
    </el-card>
  </el-main>
</el-container>

</template>

<script>

import { codemirror } from 'vue-codemirror-lite'
require('codemirror/mode/javascript/javascript.js')
require('codemirror/addon/hint/show-hint.js')
require('codemirror/addon/hint/show-hint.css')
require('codemirror/addon/hint/javascript-hint.js')
// themes need to be inlcuded
// require('codemirror/theme/blackboard.css')
export default {
  components: {
    codemirror
  },
  name: 'yxi',
  data () {
    return {
      code: 'const str = "hello world"',
      editorOption: {
        mode: 'javascript',
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
    }
  }
}

</script>
<style>

  .el-aside {
    background-color:#c50810;
    color: #333;
    text-align: center;
    line-height: 88px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  /* .clearfix:after {
    clear: both
  } */

</style>
