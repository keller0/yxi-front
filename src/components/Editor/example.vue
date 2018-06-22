<template>
    <v-card width="100%">
        <v-card-title primary-title style="justify-content: space-between;">
            <v-container fluid>
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
                            language, you can play with it.</h4>
                <v-layout row>

                    <v-flex xs9 sm10 md11>
                        <h3 class="headline">To create a piece of code of your favorite language just click the "+" at right bottom corner!</h3>
                    </v-flex>
                    <v-flex xs3 sm2 md1>
                        <editorSettion class="headline"></editorSettion>
                    </v-flex>
                </v-layout>


            </v-container>
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
import { SampleCode, CodeMirrorMode } from '@/utils/languages'
import { supportedLaguage } from '@/utils/languages'
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
        this.setEditorBuffer()
        this.setEditorMode()
    },
    data() {
        return {
            language: 'c',
            supportedLaguage
        }
    },
    methods: {
        changeLanguage(lang) {
            this.language = lang
            this.setEditorBuffer()
            this.setEditorMode()
            console.log(lang)
        },
        setEditorBuffer() {
            console.log('set editor buffer')
            this.$store.commit({
                type: 'updateEditorBuffer',
                'code': {
                    content: SampleCode[this.language]['code'],
                    filename: SampleCode[this.language]['filename'],
                    lang: this.language,
                    title: 'Untitiled',
                    description: ''
                }
            })
        },
        setEditorMode() {
            var mime = CodeMirrorMode(this.language)
            this.$store.commit({
                type: 'updateEditorMode',
                mime: mime
            })
        }
    }
}
</script>
<style scoped>
</style>
