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
      <td @click="openCode(props.item)" style="color:red;cursor: pointer">
           {{ props.item.title }}
      </td>
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
        'codes',
        'loading'
    ],
    data() {
        return {
            headers: [
                { text: 'Title', value: 'name', sortable: false, align: 'left' },
                { text: 'description', value: 'description', sortable: false },
                { text: 'language', value: 'lang', sortable: true },
                { text: 'Date', value: 'updateat', sortable: true },
                { text: 'likes', value: 'likes', sortable: true },
                { text: 'author', value: 'username', sortable: false }
            ]
        }
    },
    methods: {
        openCode(p) {
            this.$store.commit('updateEditorBuffer', p)
            this.$router.push('/code/' + p.id)
        }
    }
}
</script>
