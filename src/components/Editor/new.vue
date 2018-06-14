<template>
    <div>
        <v-card width="100%">
            <v-card-title>
                <v-expansion-panel>
                    <!-- file title and discription -->
                    <v-expansion-panel-content expand-icon="mdi-menu-down">
                        <div slot="header">{{title}}</div>
                        <v-card>
                            <v-container fluid>
                                <v-layout row>
                                    <v-flex xs5>
                                        <v-text-field v-model="title"
                                        :rules="[(v) => v.length <= 25 || 'Max 25 characters']"
                                        :counter="25"
                                        label="Title"></v-text-field>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                          v-model="description"
                                          name="input-7-1"
                                          label="Description"
                                          multi-line
                                          :rules="[(v) => v.length <= 300 || 'Max 300 characters']"
                                          :counter="300"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-card-title>
            <!-- file name -->
            <v-container >
                <v-layout row wrap>
                  <v-flex xs8 sm6>
                        <v-text-field v-model="filename" solo-inverted
                            :rules="[(v) => v.length <= 25 || 'Max 25 characters']"
                            :counter="25"
                            hint="Filename">
                        </v-text-field>
                  </v-flex>
                  <v-flex sm5 hidden-xs-only>
                  </v-flex>
                  <v-flex xs2 sm1>
                       <editorSettion></editorSettion>
                  </v-flex>
                </v-layout>
            </v-container>
            <v-card-text>
                <!-- file content -->
                <EditorBase></EditorBase>
                <runCode></runCode>
            </v-card-text>
            <saveButton :lang="language" :filename="filename" :title="title" :description="description" ></saveButton>
        </v-card>
    </div>
</template>

<script>

import runCode from '@/components/Editor/runCode'
import { SampleCode, CodeMirrorMode } from '@/utils/languages'
import editorSettion from '@/components/Editor/editorSetting'
import saveButton from '@/components/saveButton'
import EditorBase from '@/components/Editor/base'
export default {
    components: {
        EditorBase,
        runCode,
        editorSettion,
        saveButton
    },
    computed: {
        editorBuffer() {
            return this.$store.state.editor.buffer
        }
    },
    props: [

    ],
    data: function() {
        return {
            language: this.$route.params.language,
            filename: SampleCode[this.$route.params.language]['filename'],
            title: 'Untitled',
            description: ''
        }
    },
    created() {
        // create a new buffer so we need set something
        this.setEditorBuffer()
        this.setEditorMode()
    },
    watch: {
        '$route': 'setEditorBuffer'
    },
    methods: {
        setEditorBuffer() {
            this.$store.commit({
                type: 'updateEditorBuffer',
                content: SampleCode[this.language]['code'],
                filename: SampleCode[this.language]['filename'],
                lang: this.$route.params.language
            })
        },
        setEditorMode() {
            var mime = CodeMirrorMode(this.language)
            this.$store.commit({
                type: 'updateEditorMode',
                mime: mime,
                lang: this.language
            })
        }
    }
}

</script>
<style>

</style>
