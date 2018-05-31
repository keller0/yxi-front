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
            <runCode :code="code"></runCode>
        </v-card-text>
    </v-card>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/blackboard.css'
import runCode from '@/components/Editor/runCode'

const code = '#include<stdio.h>\n\nint main() {\n    printf("hello");\n}'

export default {
    name: 'Editor',
    components: {
        codemirror,
        runCode
    },
    props: [
        'editerTheme',
        'titile',
        'desc'
    ],
    data: function() {
        return {
            name: 'Edit',
            code,
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

    }
}

</script>
<style scoped>

textarea {
	width: 100%;
	height: 100px;
}

</style>
