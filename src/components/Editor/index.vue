<template>
    <v-card width="100%">
        <v-card-title primary-title>
            <div>
                <h3 class="headline">"Hello, world"</h3>
            </div>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-text>
            <codemirror v-model="code" :options="cmOption" ></codemirror>
            <runCode :code="code"></runCode>
        </v-card-text>
        <newButton></newButton>
    </v-card>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/blackboard.css'
import runCode from '@/components/Editor/runCode'
import newButton from '@/components/newButton'

const code = '#include<stdio.h>\n\nint main()\n{\n  printf("Hello, World!\\n");\n}'

export default {
    name: 'Editor',
    components: {
        codemirror,
        runCode,
        newButton
    },
    props: [
    ],
    data: function() {
        return {
            code,
            cmOption: {
                tabSize: 4,
                lineNumbers: true,
                line: true,
                mode: 'text/x-csrc',
                theme: 'blackboard'
            }
        }
    },
    methods: {

    }
}

</script>
<style scoped>


</style>
