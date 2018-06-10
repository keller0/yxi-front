<template>
    <div>
        <v-progress-linear :indeterminate="runBar" :value="pecBar"></v-progress-linear>
        <v-card-actions>
            <v-btn
            color="primary"
            :loading="loading"
            :disabled="loading"
            @click="runcode">Run</v-btn>
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
                <div>
                    <pre>{{ result }}</pre>
                </div>
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
            result: 'nothing...',
            runBar: false,
            pecBar: 0,
            loading: false
        }
    },
    props: {
        code: String,
        lang: String,
        filename: String
    },
    methods: {
        async runcode() {
            try {
                this.statusStartRun()
                const data = {
                    files: [
                        {
                            content: this.code,
                            name: this.filename
                        }
                    ],
                    stdin: '',
                    argument: ''
                }
                const res = await codeRunResult('/' + this.lang, data)
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
        statusStartRun() {
            this.result = ''
            this.runBar = true
            this.rshow = false
            this.loading = true
        },
        statusStopRun() {
            this.runBar = false
            this.pecBar = 100
            this.rshow = true
            this.loading = false
        }
    }
}
</script>

<style>

</style>
