<template>
    <div>
        <v-expansion-panel>
            <v-expansion-panel-content expand-icon="mdi-menu-down">
                <div slot="header">{{title}}</div>
                <v-card>
                    <v-container fluid>
                        <v-layout row>
                            <v-flex xs5>
                                <v-text-field v-model="title" label="Title"></v-text-field>
                            </v-flex>
                            <v-spacer></v-spacer>
                            <v-flex xs5>
                                <v-text-field v-model="filename" label="Filename"></v-text-field>
                            </v-flex>
                              <v-flex xs1>
                                  <div class="text-xs-center">
                                      <editorSettion v-on:listenSettingChange="onThemeChange"></editorSettion>
                                  </div>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12>
                                <v-text-field
                                  v-model="description"
                                  name="input-7-1"
                                  label="Description"
                                  multi-line
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
        <v-card width="100%">
            <v-card-text>
                <codemirror v-model="code" :options="cmOption" ></codemirror>
                <runCode :code="code" :lang="language" :filename="filename"></runCode>
            </v-card-text>
            <saveButton :content="code" :lang="language" :filename="filename" :title="title" :description="description" ></saveButton>
        </v-card>
    </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/blackboard.css'
import runCode from '@/components/Editor/runCode'
import { SampleCode } from '@/utils/languages'
import editorSettion from '@/components/Editor/editorSetting'
import saveButton from '@/components/saveButton'
export default {
    name: 'Editor',
    components: {
        codemirror,
        runCode,
        editorSettion,
        saveButton
    },
    props: [

    ],
    data: function() {
        return {
            language: this.$route.params.language,
            code: '',
            filename: '',
            title: 'Untitled',
            description: '',
            cmOption: {
                tabSize: 4,
                lineNumbers: true,
                line: true,
                mode: 'text/x-csrc',
                theme: 'blackboard'
            }
        }
    },
    created() {
        this.setLanguage()
    },
    watch: {
        '$route': 'setLanguage'
    },
    methods: {
        setLanguage() {
            this.code = SampleCode[this.language]['code']
            this.filename = SampleCode[this.language]['filename']
        },
        onThemeChange(theme) {
            import(`codemirror/theme/${theme}.css`)
            this.cmOption.theme = theme
        }
    }
}

</script>
<style scoped>

textarea {
    width: 100%;
    height: 100px;
}

</style>
