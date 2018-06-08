<template>
    <codetable :codes="codes"></codetable>
</template>

<script>
import codetable from '@/components/Code/codeTable'
import { getPubCode } from '@/api/getCode'
export default {
    components: {
        codetable
    },
    data() {
        return {
            name: 'pubcode',
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
                const res = await getPubCode()
                this.codes = res.codes
            } catch (error) {
                this.error = error.message
                console.error(error)
            } finally {
                console.log('final')
            }
        }
    }
}
</script>
