<template>

    <codemirror v-model="globalEditorBuffer.content" :options="globalEditorConfig" ></codemirror>
    
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
