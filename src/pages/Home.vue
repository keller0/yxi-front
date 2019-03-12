<template>
    <div>
        <v-toolbar
            dense
            fixed
            app>
            <v-toolbar-title class="">
                <!-- an icon ? -->
                <span class="title" style="cursor: pointer;">YXI</span>
            </v-toolbar-title>
            <v-spacer hidden-xs-only></v-spacer>
            <v-toolbar-items >
                <v-menu offset-y>
                <v-list  class="text-xs-center" >
                     <v-list-tile >Help</v-list-tile>
                </v-list>
              </v-menu>
            </v-toolbar-items>

        </v-toolbar>

        <codemirror v-model="globalEditorBuffer.content" :options="globalEditorConfig" ></codemirror>

        <v-footer class="pa-3" height="auto">
            <v-layout row wrap justify-center>
            <v-btn flat >
                Home
            </v-btn>
            <v-btn flat>
                Help
            </v-btn>
            <a href="https://github.com/keller0/yxi-front" target="_blank">
                <v-btn flat>
                    Github
                </v-btn>
            </a>
            <v-btn flat disabled>
                &copy; {{ new Date().getFullYear() }} yxi.io
            </v-btn>
            </v-layout>
        </v-footer>
    </div>
    
</template>

<script>

import { codemirror } from 'vue-codemirror'
import editorStroe from '@/store/editor'

export default {
    name: 'EditorBase',
    components: {
        codemirror
    },
    computed: {
        globalEditorConfig() {
            return editorStroe.state.config
        },
        globalEditorBuffer() {
            if (editorStroe.state.status.isNew === true) {
                return editorStroe.state.newBuffer
            }
            return editorStroe.getters.currentBuffer
        }
    },
    created() {

    },
    data() {
        return {
        }
    },
    methods: {

    }
}
</script>
<style scoped>
</style>
