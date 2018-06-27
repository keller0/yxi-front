<template>
    <codelist :codes="codes" :loading="loading"></codelist>
</template>

<script>
import codelist from '@/components/Code/codeList'
import { getCodeList } from '@/api/code'

export default {
    components: {
        codelist
    },
    data() {
        return {
            loading: true,
            codes: []
        }
    },
    created() {
        this.getCode()
    },
    watch: {
        '$route': 'getCode'
    },
    methods: {
        async getCode() {
            try {
                const res = await getCodeList('popular')
                this.codes = res.codes
            } catch (error) {
                this.error = error.message
                console.error(error)
            } finally {
                this.loading = false
            }
        }
    }
}
</script>
