<template>
  <div>
  <v-data-table
    :headers="headers"
    :items="codes"
    :loading="loading"
    hide-actions
    class="elevation-1"
  >
    <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
    <template slot="items" slot-scope="props">
      <td @click="openCode(props.item.id)" style="color:red;cursor: pointer">
           {{ props.item.title }}
      </td>
      <td class="hidden-md-and-down">{{ props.item.description }}</td>
      <td>{{ props.item.lang }}</td>
      <td class="hidden-md-and-down">{{ props.item.updateat }}</td>
      <td>{{ props.item.likes }}</td>
      <td class="hidden-md-and-down">{{ props.item.username }}</td>
    </template>
  </v-data-table>
  <newButton></newButton>
</div>
</template>

<script>
import newButton from '@/components/Button/new'
export default {
    components: {
        newButton
    },
    props: [
        'codes',
        'loading'
    ],
    data() {
        return {
            headers: [
                { text: 'Title', value: 'name', sortable: false, align: 'left' },
                { text: 'description', value: 'description', sortable: false, class: 'hidden-md-and-down' },
                { text: 'language', value: 'lang', sortable: false },
                { text: 'Date', value: 'updateat', sortable: false, class: 'hidden-md-and-down' },
                { text: 'likes', value: 'likes', sortable: false },
                { text: 'author', value: 'username', sortable: false, class: 'hidden-md-and-down' }
            ]
        }
    },
    methods: {
        openCode(id) {
            this.$router.push('/code/' + id)
        }
    }
}
</script>
