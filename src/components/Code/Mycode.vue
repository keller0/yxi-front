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
                <td>{{ props.item.description }}</td>
                <td>{{ props.item.lang }}</td>
                <td>{{ props.item.updateat }}</td>
                <td>{{ props.item.likes }}</td>
                <td>{{ props.item.public }}</td>
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
import newButton from '@/components/newButton'
import { getOnesCode } from '@/api/getCode'
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
                { text: 'description', value: 'description', sortable: false },
                { text: 'language', value: 'lang', sortable: true },
                { text: 'Date', value: 'updateat', sortable: true },
                { text: 'likes', value: 'likes', sortable: true },
                { text: 'public', value: 'public', sortable: false },
                { text: 'options', value: '', sortable: false }
            ]

        }
    },
    created() {
        this.getCode()
    },
    watch: {
        '$route': 'getCode'
    },
    methods: {
        openCode(id) {
            this.$router.push('/code/' + id)
        },
        async getCode() {
            try {
                var token = this.$store.state.user.token
                var userid = this.$store.state.user.id
                const res = await getOnesCode(userid, token)
                this.codes = res.codes
            } catch (error) {
                this.error = error.message
                console.error(error)
            } finally {
                console.log('final')
            }
        },
        doAction(action, id) {
            console.log(action, id)
        }
    }
}
</script>
