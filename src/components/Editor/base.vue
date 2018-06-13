<template>

    <codemirror v-model="globalEditorBuffer.content" :options="globalEditorConfig" ></codemirror>

</template>

<script>

import { codemirror } from 'vue-codemirror'

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
            return this.$store.state.editor.buffer
        }
    },
    created() {
        console.log(this.globalEditorConfig)
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
