<template>
    <v-card width="100%">
        <v-card-title primary-title>
            <div>
                <h3 class="headline">The title</h3>
                <div>description</div>
            </div>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-text>
            <codemirror v-model="code" :options="cmOption" ></codemirror>
            <v-progress-linear :indeterminate="runBar" :value="pecBar"></v-progress-linear>
            <v-card-actions>
                <v-btn color="blue" @click="runcode">Run</v-btn>
                <v-spacer></v-spacer>
                <v-btn icon @click.native="rshow = !rshow">
                    <v-icon>{{ rshow ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                </v-btn>
            </v-card-actions>
                <v-slide-y-transition>
                    <v-card-text v-show="rshow">
                    <v-alert v-model="errShow" type="error" dismissible>
                        {{error}}
                    </v-alert>
                    <textarea v-model="result" placeholder="nothing..."></textarea>
                </v-card-text>
            </v-slide-y-transition>
        </v-card-text>
    </v-card>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/blackboard.css'

import { codeRunResult } from '@/api/codeResult'

const code = '#include<stdio.h>\n\nint main() {\n    printf("hello");\n}'

export default {
    name: 'Editor',
    components: {
        codemirror
    },
    props: [
        'editerTheme',
        'titile',
        'desc'
    ],
    data: function() {
        return {
            name: 'Edit',
            errShow: false,
            rshow: false,
            error: '',
            result: '',
            code,
            runBar: false,
            pecBar: 0,
            cmOption: {
                tabSize: 4,
                lineNumbers: true,
                line: true,
                mode: 'text/x-csrc',
                theme: this.editerTheme
            }
        }
    },
    methods: {
        async runcode() {
            try {
                this.statusStartRun()
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
                const res = await codeRunResult('/c', data)
                this.result += res.stdout
                this.result += res.stderr
            } catch (error) {
                this.errShow = true
                this.error = error.message
                console.error(error)
            } finally {
                this.statusStopRun()
            }
        },
        statusStartRun: function() {
            this.result = ''
            this.runBar = true
            this.rshow = false
        },
        statusStopRun: function() {
            this.runBar = false
            this.pecBar = 100
            this.rshow = true
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
