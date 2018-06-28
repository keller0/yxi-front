<template>
    <div>
        <v-btn flat color="purple" dark @click.native.stop="themeSettiogDialog = true"><v-icon dark>build</v-icon></v-btn>
            <v-dialog
            :close-on-content-click="false"
            max-width="400"
            v-model="themeSettiogDialog"
            offset-x
            xs12 sm12
            >

                <v-card>
                    <v-card-title>
                        <span class="headline">Editor setting</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-flex xs12 sm12>
                                    <v-select
                                        v-model="globalEditorTheme"
                                        label="Theme"
                                        :items="themes"
                                        >
                                    </v-select>
                                </v-flex>
                                <v-flex xs12 sm12>
                                    <v-select
                                        v-model="globalBufferMode"
                                        label="Highlight Mode"
                                        :items="modes"
                                        >
                                    </v-select>
                                </v-flex>
                                <v-flex xs12 sm12>
                                     <v-switch
                                        v-model="globalBufferLM"
                                        label="Line Number"
                                        hide-details
                                      ></v-switch>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" flat @click.native="themeSettiogDialog = false">Close</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
    </div>

</template>


<script>
import themes from './theme'
import { CodeMirrorMode, supportedLaguage } from '@/utils/languages'
export default {
    name: 'editorSetting',
    components: {
    },
    created() {
        var theme = localStorage.getItem('editorTheme')
        if (theme == null) {
            theme = 'blackboard'
        }
        this.$store.commit('updateEditorTheme', theme)
    },
    computed: {
        globalEditorTheme: {
            get: function() {
                return this.$store.state.editor.config.theme
            },
            set: function(theme) {
                this.$store.commit('updateEditorTheme', theme)
            }
        },
        globalBufferMode: {
            get: function() {
                return this.$store.state.editor.buffer.lang
            },
            set: function(lang) {
                var mime = CodeMirrorMode(lang)
                this.$store.commit({
                    type: 'updateEditorMode',
                    mime: mime
                })
            }

        },
        globalBufferLM: {
            get: function() {
                return this.$store.state.editor.config.lineNumbers
            },
            set: function(t) {
                this.$store.commit({
                    type: 'updateEditorLM',
                    lm: t
                })
            }

        }
    },
    data() {
        return {
            themeSettiogDialog: false,
            themes,
            modes: supportedLaguage
        }
    },
    methods: {

    }
}
</script>
<style scoped>
</style>
