<template>
    <v-card width="100%">
        <v-card-title primary-title style="justify-content: space-between;">
            <h3 class="headline">"Hello, world"</h3>
            <div>
                <v-select
                    v-model="select"
                    label="Select"
                    item-text="type"
                    item-value="value"
                    single-line
                    return-object
                    :items="themes"
                    @change="test">
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
            select: { type: 'blackboard', value: 'blackboard.css' },
            themes: [
                { type: 'default', value: '' },
                { type: 'blackboard', value: 'blackboard.css' },
                { type: '3024-day', value: '3024-day.css' },
                { type: '3024-night', value: '3024-night.css' },
                { type: 'base16-dark', value: 'base16-dark.css' },
                { type: 'base16-light', value: 'base16-light.css' },
                { type: 'ambiance-mobile', value: 'ambiance-mobile.css' },
                { type: 'ambiance', value: 'ambiance.css' }
            ]
        }
    },
    methods: {
        test(theme) {
            import(`codemirror/theme/${theme.value}`)
            this.cmOption.theme = theme.type
        }
    }
}
</script>
<style scoped>
</style>