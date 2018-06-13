<template>
    <v-card width="100%">
        <v-card-title primary-title style="justify-content: space-between;">
            <h3 class="headline">"Hello, world"</h3>
            <div class="text-xs-center">
                <editorSettion></editorSettion>
            </div>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-text>
            <codemirror v-model="code" :options="globalEditorConfig" ></codemirror>
            <runCode :code="code" :lang="lang" :filename="filename"></runCode>
        </v-card-text>
        <newButton></newButton>
    </v-card>
</template>

<script>
import themes from './theme'
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/blackboard.css'
import runCode from '@/components/Editor/runCode'
import newButton from '@/components/newButton'
import editorSettion from '@/components/Editor/editorSetting'

export default {
    name: 'Editor',
    components: {
        codemirror,
        runCode,
        newButton,
        editorSettion
    },
    computed: {
        globalEditorConfig() {
            return this.$store.state.editor.config
        }
    },
    created() {
        this.setEditorMode()
    },
    data() {
        return {
            code: `#include<stdio.h>\n\nint main()\n{\n  printf("Hello, World!\\n");\n}`,
            lang: 'c',
            filename: 'main.c',
            themeSettiogMenu: false,
            selectedTheme: 'blackboard',
            themes
        }
    },
    methods: {
        setEditorMode() {
            this.$store.commit({
                type: 'updateEditorMode',
                mime: 'text/x-csrc'
            })
        }
    }
}
</script>
<style scoped>
</style>
