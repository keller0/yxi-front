<template>
    <div class="editor-container">
        <el-row>
            <el-col :span="24">
                <el-card class="box-card" id="files">
                    <!-- <codemirror v-model="code" :options="cmOption" @input="onChange" ></codemirror> -->
                    <codemirror v-model="code" :options="cmOption" ></codemirror>
                </el-card>
            </el-col>
            <el-col :span="24" style="margin-top: 15px;">
                <el-button type="primary" ref="oneFile" @click="runcode" :loading="runing">RUN</el-button>
            </el-col>
            <el-col :span="24" style="margin-top: 15px;">
                <el-card shadow="always">
                    <el-alert v-if="error"
                        title="error:"
                        type="error"
                        close-text="X">
                        {{error}}
                    </el-alert>
                    <textarea v-model="restul" placeholder="result..."></textarea>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/addon/hint/show-hint.js'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/lib/codemirror.css'
// import 'codemirror/keymap/emacs.js'

import { getResultC } from '@/api/c'

// const YXI_RUN_API = 'http://127.0.0.1:8080/v1'
// const YXI_RUN_API = 'http://r.yxi.io/v1'

export default {
    components: {
        codemirror
    },
    name: 'yxi',
    data: function() {
        return {
            runing: false,
            error: '',
            restul: '',
            code: '#include<stdio.h>\n\nint main() {\n    printf("hello");\n}',
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
        async runcode() {
            try {
                this.restul = ''
                this.runing = true
                const data = {
                    'files': [{
                        'content': this.code,
                        'name': 'main.c'
                    }],
                    'stdin': '',
                    'argument': ''
                }
                const res = await getResultC(data)
                this.restul += res.stdout
                this.restul += res.stderr
            } catch (error) {
                console.error(error)
            } finally {
                this.runing = false
            }
        }
    }
}

</script>
<style scoped>
.editor-container {
    padding: 20px;
}

textarea {
  width: 100%;
  height: 100px;
}

</style>
