<template>
  <!-- <v-app> -->

      <v-card width="100%">
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">The title</h3>
            <div>discriptions</div>
          </div>
        </v-card-title>
        <v-card-text>
          <codemirror v-model="code" :options="cmOption" ></codemirror>
        </v-card-text>
      </v-card>

  <!-- </v-app> -->
</template>

<script>
import axios from 'axios'
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/lib/codemirror.css'

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
        lineNumbers: false,
        line: true,
        mode: 'text/x-csrc'
        // keyMap: 'emacs'
      }
    }
  },
  methods: {

  }
}

</script>
<style scoped>

textarea {
  width: 100%;
  height: 100px;
}

</style>
