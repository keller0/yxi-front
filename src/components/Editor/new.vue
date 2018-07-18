<template>
    <div>
        <v-card width="100%">
            <v-card-title>
                <v-expansion-panel>
                    <!-- file title and discription -->
                    <v-expansion-panel-content>
                        <div slot="header">{{editorBuffer.title}}</div>
                        <v-card>
                            <v-container fluid>
                                <v-layout row>
                                    <v-flex xs5>
                                        <v-text-field v-model="editorBuffer.title"
                                        :rules="[(v) => v.length <= 25 || 'Max 25 characters']"
                                        :counter="25"
                                        label="Title"></v-text-field>
                                    </v-flex>
                                    <v-flex xs1>
                                    </v-flex>
                                    <v-flex xs2>
                                        <v-switch
                                            @click="tagglePub"
                                            :label="`${s1[isPublic]}`"
                                            :disabled="!logined"
                                            v-model="isPublic"
                                        ></v-switch>
                                    </v-flex>
                                    <v-flex xs2>
                                        <v-switch
                                            @click="taggleAno"
                                            :label="`Anonymous:${isAnonymous}`"
                                            :disabled="!logined"
                                            v-model="isAnonymous"
                                        ></v-switch>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                          v-model="editorBuffer.description"
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
                        <v-text-field v-model="editorBuffer.filename" solo-inverted
                            :rules="[(v) => v.length <= 25 || 'Max 25 characters']"
                            :counter="25"
                            hint="Filename">
                        </v-text-field>
                  </v-flex>
                </v-layout>
            </v-container>
            <v-card-text>
                <!-- file content -->
                <EditorBase></EditorBase>
                <runCode></runCode>
            </v-card-text>
            <publishButton :anonymous="isAnonymous" :public="isPublic"></publishButton>
        </v-card>
    </div>
</template>

<script>

import runCode from '@/components/Editor/runCode'
import { SampleCode, CodeMirrorMode } from '@/utils/languages'
import publishButton from '@/components/Button/publish'
import EditorBase from '@/components/Editor/base'
export default {
    components: {
        EditorBase,
        runCode,
        publishButton
    },
    computed: {
        editorBuffer() {
            return this.$store.state.editor.buffer
        },
        logined() {
            return this.$store.getters.isLogined
        }
    },
    props: [

    ],
    data() {
        return {
            language: this.$route.params.language,
            s1: {
                true: 'Public',
                false: 'Private'
            },
            isAnonymous: true,
            isPublic: false
        }
    },
    created() {
        // create a new buffer so we need set something
        this.setEditorBuffer()
        this.setEditorMode()
        this.setSwitchs()
    },
    watch: {
        '$route': 'setEditorBuffer'
    },
    methods: {
        setEditorBuffer() {
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
        },
        setSwitchs() {
            if (this.logined) {
                this.isAnonymous = false
                this.isPublic = true
            } else {
                this.isAnonymous = true
                this.isPublic = true
            }
        },
        tagglePub() {
            // change from public to private
            if (this.isPublic) {
                this.isAnonymous = false
            }
        },
        taggleAno() {
            // change from anonymous to nonanonymous
            if (!this.isAnonymous) {
                this.isPublic = true
            }
        }
    }
}

</script>
<style>

</style>
