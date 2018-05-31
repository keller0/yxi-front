<template>
  <v-data-table
    :headers="headers"
    :items="codes"
    hide-actions
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-right">{{ props.item.lan }}</td>
      <td class="text-xs-right">{{ props.item.date }}</td>
      <td class="text-xs-right">{{ props.item.likes }}</td>
      <td class="text-xs-right">{{ props.item.author }}</td>
    </template>
  </v-data-table>
</template>

<script>
  export default {
      props: [
          'codes'
      ],
      data() {
          return {
              name: 'pcode',
              headers: [
                  {
                      text: 'Title',
                      align: 'left',
                      sortable: false,
                      value: 'name'
                  },
                  { text: 'language', value: 'lan', sortable: false },
                  { text: 'Date', value: 'date', sortable: true },
                  { text: 'likes', value: 'likes', sortable: true },
                  { text: 'author', value: 'fat', sortable: false }
              ]
          }
      }
  }
</script>
