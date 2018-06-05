<template>
    <v-card width="100%">
        <v-card-title primary-title style="justify-content: space-between;">
            <h3 class="headline">"Hello, world"</h3>
            <div>
                <v-select
                    v-model="select"
                    label="Select"
                    item-text="blackboard"
                    item-value="blackboard"
                    single-line
                    :items="themes"
                    @change="onThemeChange">
                </v-select>
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
import theme from './theme'
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/blackboard.css'
import runCode from '@/components/Editor/runCode'
import newButton from '@/components/newButton'
export default {
    name: 'Editor',
    components: {
        codemirror,
        runCode,
        newButton
    },
    data() {
        return {
            code: `#include<stdio.h>\n\nint main()\n{\n  printf("Hello, World!\\n");\n}`,
            cmOption: {
                tabSize: 4,
                lineNumbers: true,
                line: true,
                mode: 'text/x-csrc',
                theme: 'blackboard'
            },
            select: 'blackboard',
            themes: theme
        }
    },
    methods: {
        onThemeChange(theme) {
            import(`codemirror/theme/${theme}.css`)
            this.cmOption.theme = theme
        }
    }
}
</script>
<style scoped>
</style>