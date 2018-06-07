<template>
    <v-card width="100%">
        <v-card-title primary-title style="justify-content: space-between;">
            <h3 class="headline">"Hello, world"</h3>
            <div>
                <v-dialog v-model="themeSettiogDialog" persistent max-width="390">
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
                                            v-model="selectedTheme"
                                            label="Theme"
                                            :items="themes"
                                            autocomplete
                                            @change="onThemeChange">
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
import theme from './theme'
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
            themeSettiogDialog: false,
            selectedTheme: 'blackboard',
            themes: theme
        }
    },
    methods: {
        onThemeChange(theme) {
            import(`codemirror/theme/${theme}.css`)
            this.cmOption.theme = theme
        }
    }
}
</script>
<style scoped>
</style>
