<template>
    <div>
        <v-data-table
        :headers="headers"
        :items="codes"
        hide-actions
        class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td @click="openCode(props.item.id)" style="color:red;cursor: pointer">
                  {{ props.item.title }}
                  </td>
                <td class="hidden-md-and-down">{{ props.item.description }}</td>
                <td class="hidden-md-and-down">{{ props.item.lang }}</td>
                <td class="hidden-md-and-down">{{ props.item.updateat }}</td>
                <td class="hidden-md-and-down">{{ props.item.likes }}</td>
                <td class="hidden-md-and-down">{{ props.item.public }}</td>
                <td>
                  <v-menu bottom left>
                  <v-btn slot="activator" icon >
                    <v-icon >more_vert</v-icon>
                  </v-btn>
                  <v-list>
                    <v-list-tile v-for="(option, i) in options" :key="i" @click="doAction(option.action,props.item.id)">
                      <v-list-tile-title>{{ option.title }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                </td>
            </template>
        </v-data-table>
        <newButton></newButton>
    </div>

</template>

<script>
import newButton from '@/components/Button/new'
import { getOnesCodeList, deleteCode } from '@/api/code'
import editorStroe from '@/store/editor'

export default {
    components: {
        newButton
    },
    data() {
        return {
            name: 'mycode',
            codes: [],
            options: [
                { title: 'Edit', action: 'edit' },
                { title: 'Delete', action: 'delete' }
            ],
            headers: [
                { text: 'Title', value: 'name', sortable: false, align: 'left' },
                { text: 'description', value: 'description', sortable: false, class: 'hidden-md-and-down' },
                { text: 'language', value: 'lang', sortable: false, class: 'hidden-md-and-down' },
                { text: 'Date', value: 'updateat', sortable: false, class: 'hidden-md-and-down' },
                { text: 'likes', value: 'likes', sortable: false, class: 'hidden-md-and-down' },
                { text: 'public', value: 'public', sortable: false, class: 'hidden-md-and-down' },
                { text: 'options', value: '', sortable: false }
            ]

        }
    },
    created() {
        this.getCode()
        this.updateBackurl()
    },
    watch: {
        '$route': ['getCode', 'updateBackurl']
    },
    methods: {
        updateBackurl() {
            this.$store.commit({
                type: 'changeURL',
                url: this.$route.path
            })
        },
        openCode(id) {
            this.$router.push('/code/' + id)
        },
        async getCode() {
            try {
                var token = this.$store.state.user.token
                var userid = this.$store.state.user.id
                const res = await getOnesCodeList(userid, token)
                this.codes = res.codes
                editorStroe.commit({
                    type: 'updateCodeList',
                    codeType: 'mine',
                    list: this.codes
                })
            } catch (error) {
                this.error = error.message
                console.error(error)
            } finally {
                console.log('final')
            }
        },
        doAction(action, id) {
            switch (action) {
                case 'edit':
                    this.$router.push('/code/' + id)
                    return
                case 'delete':
                    this.delete(id)
                    return
                default:
                    return
            }
        },
        async delete(id) {
            var sure = confirm('Are you sure?')
            if (sure) {
                try {
                    await deleteCode(id, this.$store.state.user.token)
                    editorStroe.commit({
                        type: 'removeCodeFromMine',
                        id: id
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
}
</script>
