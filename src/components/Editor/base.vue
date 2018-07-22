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
            return this.$store.state.editor.config
        },
        globalEditorBuffer() {
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
