<template>
    <v-dialog
    :close-on-content-click="false"
    max-width="400"
    v-model="themeSettiogDialog"
    offset-x
    xs12 sm12
    >
        <v-btn slot="activator" flat color="purple" dark><v-icon dark>build</v-icon></v-btn>
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
                                autocomplete
                                @change="onThemeChange">
                            </v-select>
                        </v-flex>
                        <v-flex xs12 sm12>
                            <v-select
                                v-model="globalEditorBufferLang"
                                label="Mode"
                                :items="modes"
                                @change="onModeChange">
                            </v-select>
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
        this.onThemeChange(theme)
    },
    computed: {
        globalEditorTheme() {
            return this.$store.state.editor.config.theme
        },
        globalEditorBufferLang() {
            return this.$store.state.editor.buffer.lang
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
        onThemeChange(theme) {
            this.$store.commit('updateEditorTheme', theme)
        },
        onModeChange(lang) {
            var mime = CodeMirrorMode(lang)
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
