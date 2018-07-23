<template>
    <v-card width="100%">
        <v-card-title primary-title style="justify-content: space-between;">

            <h4 class="headline">Here is the "hello, world" example for the
                <v-menu
                    transition="slide-x-transition"
                    bottom
                    right
                  >
                    <v-btn slot="activator" color="grey lighten-3 transparent">
                      {{language}}
                    </v-btn>
                    <v-list>
                      <v-list-tile v-for="(l, index) in supportedLaguage" :key="index"  @click="changeLanguage(l)">
                        <v-list-tile-title>{{ l }}</v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                </v-menu>
                language. You can edit it.</h4>
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
import { SampleCode } from '@/utils/languages'
import { supportedLaguage } from '@/utils/languages'
import EditorBase from '@/components/Editor/base'
import editorStroe from '@/store/editor'

export default {
    components: {
        EditorBase,
        runCode,
        newButton
    },
    computed: {

    },
    created() {
        this.setEditorBuffer()
    },
    data() {
        return {
            language: 'python',
            supportedLaguage
        }
    },
    methods: {
        changeLanguage(lang) {
            this.language = lang
            this.setEditorBuffer()
        },
        setEditorBuffer() {
            editorStroe.commit({
                type: 'updateNewBuffer',
                code: {
                    content: SampleCode[this.language]['code'],
                    filename: SampleCode[this.language]['filename'],
                    lang: this.language,
                    title: 'Untitiled',
                    description: ''
                }
            })
        }
    }
}
</script>
<style scoped>
</style>
