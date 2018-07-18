<template>
    <div>
        <v-btn flat color="purple" dark @click.native.stop="openDialog('editorSetting')"><v-icon dark>build</v-icon></v-btn>
        <setting></setting>
    </div>
</template>

<script>
import Setting from '@/components/Dialog/editorSetting'

export default {
    components: {
        Setting
    },
    methods: {
        openDialog(d) {
            this.$store.commit({
                type: 'taggleDialog',
                name: d,
                show: true
            })
        }
    }
}
</script>
