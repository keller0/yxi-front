<template>
    <div>
        <v-card width="100%">
            <v-card-title>
                <v-expansion-panel>
                    <!-- file title and discription -->
                    <v-expansion-panel-content expand-icon="mdi-menu-down">
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
        </v-card>
    </div>
</template>

<script>

import runCode from '@/components/Editor/runCode'
import editorSettion from '@/components/Editor/editorSetting'
import EditorBase from '@/components/Editor/base'
import axios from 'axios'

export default {
    name: 'EditorOpen',
    components: {
        EditorBase,
        runCode,
        editorSettion
        // saveButton
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
            language: this.$route.params.id,
            filename: 'a',
            title: 'Untitled',
            description: ''
        }
    },
    mounted() {

    },
    created() {
        this.getCodeContent()
    },
    watch: {
        '$route': 'getCodeContent'
    },
    methods: {
        async getCodeContent() {
            try {
                const resp = await axios.get('https://api.yxi.io/v1/code/content/' + this.$route.params.id)
                if (resp.status === 200) {
                    // update store status
                    this.$store.commit({
                        type: 'updateEditorBufferContent',
                        content: resp.data.content
                    })
                }
            } catch (error) {
                console.log('error:' + error)
            }
        }
    }
}

</script>
<style>

</style>
