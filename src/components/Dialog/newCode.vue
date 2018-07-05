<template>
    <v-dialog v-model="openDialog" max-width="500px">
        <v-card>
            <v-card-text>
                <v-select
                  v-model="selectedLanguage"
                  :items="languges"
                  :rules="[v => !!v || 'Item is required']"
                  label="Language"
                  required
                ></v-select>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="closeDialog('newCode')">Cancel</v-btn>
                <v-btn flat color="primary" @click.native="goCodeNew">Create</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { supportedLaguage } from '@/utils/languages'
export default {
    computed: {
        openDialog: {
            get: function() {
                console.log('as')
                return this.$store.state.dialog.newCode.show
            },
            set: function() {
                this.$store.commit({
                    type: 'taggleDialog',
                    name: 'newCode',
                    show: false
                })
            }
        }
    },
    data() {
        return {
            selectedLanguage: 'c',
            languges: supportedLaguage
        }
    },
    methods: {
        goCodeNew() {
            this.$store.commit({
                type: 'taggleDialog',
                name: 'newCode',
                show: false
            })
            this.$router.push('/new/' + this.selectedLanguage)
        },
        closeDialog(d) {
            this.$store.commit({
                type: 'taggleDialog',
                name: d,
                show: false
            })
        }
    }
}
</script>
