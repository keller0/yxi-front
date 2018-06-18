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
            <EditorBase></EditorBase>
            <runCode></runCode>
        </v-card-text>
        <newButton></newButton>
    </v-card>
</template>
<script>

import runCode from '@/components/Editor/runCode'
import newButton from '@/components/Button/new'
import editorSettion from '@/components/Editor/editorSetting'
import { SampleCode } from '@/utils/languages'
import EditorBase from '@/components/Editor/base'

export default {
    components: {
        EditorBase,
        runCode,
        newButton,
        editorSettion
    },
    computed: {

    },
    created() {
        this.setEditorMode()
        this.setEditorBuffer()
    },
    data() {
        return {

        }
    },
    methods: {
        setEditorBuffer() {
            this.$store.commit({
                type: 'updateEditorBuffer',
                'code': {
                    content: SampleCode['c']['code'],
                    filename: SampleCode['c']['filename'],
                    lang: 'c',
                    description: '',
                    title: 'Hello!!'
                }
            })
        },
        setEditorMode() {
            this.$store.commit({
                type: 'updateEditorMode',
                mime: 'text/x-csrc',
                lang: 'c'
            })
        }
    }
}
</script>
<style scoped>
</style>
