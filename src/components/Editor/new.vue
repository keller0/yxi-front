<template>
    <v-card width="100%">
        <v-card-title primary-title>
            <div>
                <v-text-field></v-text-field>
            </div>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-text>
            <codemirror v-model="code" :options="cmOption" ></codemirror>
            <runCode :code="code" :lang="language" :filename="filename"></runCode>
        </v-card-text>
    </v-card>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/blackboard.css'
import runCode from '@/components/Editor/runCode'
import { SampleCode } from '@/utils/languages'

export default {
    name: 'Editor',
    components: {
        codemirror,
        runCode
    },
    props: [

    ],
    data: function() {
        return {
            name: 'Edit',
            language: this.$route.params.language,
            code: '',
            filename: '',
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
