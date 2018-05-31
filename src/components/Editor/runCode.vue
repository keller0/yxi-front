<template>
    <div>
        <v-progress-linear :indeterminate="runBar" :value="pecBar"></v-progress-linear>
        <v-card-actions>
            <v-btn color="blue" @click="runcode">Run</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click.native="rshow = !rshow">
                <v-icon>{{ rshow ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
                <v-card-text v-show="rshow">
                <v-alert v-model="errShow" type="error" dismissible>
                    {{error}}
                </v-alert>
                <textarea v-model="result" placeholder="nothing..."></textarea>
            </v-card-text>
        </v-slide-y-transition>
    </div>
</template>

<script>
import { codeRunResult } from '@/api/codeResult'

export default {
    data() {
        return {
            name: 'runCode',
            errShow: false,
            rshow: false,
            error: '',
            result: '',
            runBar: false,
            pecBar: 0
        }
    },
    props: {
        'code': String
    },
    methods: {
        async runcode() {
            try {
                this.statusStartRun()
                const data = {
                    files: [
                        {
                            content: this.code,
                            name: 'main.c'
                        }
                    ],
                    stdin: '',
                    argument: ''
                }
                const res = await codeRunResult('/c', data)
                this.result += res.stdout
                this.result += res.stderr
            } catch (error) {
                this.errShow = true
                this.error = error.message
                console.error(error)
            } finally {
                this.statusStopRun()
            }
        },
        statusStartRun: function() {
            this.result = ''
            this.runBar = true
            this.rshow = false
        },
        statusStopRun: function() {
            this.runBar = false
            this.pecBar = 100
            this.rshow = true
        }
    }
}
</script>

<style>
   
</style>
