<template>
    <codetable :codes="codes"></codetable>
</template>

<script>
import codetable from '@/components/Code/codeTable'
export default {
    components: {
        codetable
    },
    data() {
        return {
            name: 'pubcode',
            codes: [
                {
                    value: false,
                    name: 'Hello World',
                    lan: 'c',
                    date: '2016-1-10',
                    likes: 24,
                    author: 'kkkk'
                },
                {
                    value: false,
                    name: 'Hello World',
                    lan: 'c',
                    date: '2019-1-10',
                    likes: 20,
                    author: 'kkkk'
                }
            ]
        }
    }
}
</script>
