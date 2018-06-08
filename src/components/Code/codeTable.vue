<template>
  <div>
  <v-data-table
    :headers="headers"
    :items="codes"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.title }}</td>
      <td>{{ props.item.description }}</td>
      <td>{{ props.item.lang }}</td>
      <td>{{ props.item.updateat }}</td>
      <td>{{ props.item.likes }}</td>
      <td>{{ props.item.username }}</td>
    </template>
  </v-data-table>
  <newButton></newButton>
</div>
</template>

<script>
import newButton from '@/components/newButton'
export default {
    components: {
        newButton
    },
    props: [
        'codes'
    ],
    data() {
        return {
            name: 'pcode',
            headers: [
                { text: 'Title', value: 'name', sortable: false, align: 'left' },
                { text: 'description', value: 'description', sortable: false },
                { text: 'language', value: 'lang', sortable: false },
                { text: 'Date', value: 'updateat', sortable: true },
                { text: 'likes', value: 'likes', sortable: true },
                { text: 'author', value: 'username', sortable: false }
            ]
        }
    }
}
</script>
