<template>
    <v-snackbar :timeout="3000" :top=true v-model="open">
          {{ msg }}
          <v-btn flat color="green" @click.native="open = !open">Close</v-btn>
    </v-snackbar>

</template>

<script>
import notifyStore from '@/store/notify'

export default {
    computed: {
        open: {
            get: function() {
                return notifyStore.state.notify.show
            },
            set: function() {
                notifyStore.commit({
                    type: 'taggleNotify',
                    msg: '',
                    show: false
                })
            }
        },
        msg() {
            return notifyStore.state.notify.msg
        }
    },
    data() {
        return {
        }
    },
    methods: {

    }
}
</script>
