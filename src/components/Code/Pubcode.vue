<template>
    <codetable :codes="codes" :loading="loading"></codetable>
</template>

<script>
import codetable from '@/components/Code/codeTable'
import { getCodeList } from '@/api/getCode'
export default {
    components: {
        codetable
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
                const res = await getCodeList('public')
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
