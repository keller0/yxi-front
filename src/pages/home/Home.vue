<template>
  <v-app
    id="home"

  >
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile v-for="item in items" :key="item.text" @click="goPage(item.text)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="goPage('Settings')">
          <v-list-tile-action>
            <v-icon color="grey darken-1">settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Settings</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color=""
      dense
      fixed
      clipped-left
      app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-icon class="mx-3"></v-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">YXI</span>
      </v-toolbar-title>

    </v-toolbar>

    <v-content >
      <v-container >
        <v-layout row justify-center>
          <!-- the editor -->
          <v-flex md10 offset-md1>
            <Edit> </Edit>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Edit from '@/components/Editor'
export default {
  components: {
    Edit
  },
  data: () => ({
    name: 'home',
    drawer: null,
    // darkTheme: "blackboard",
    items: [
      { icon: 'trending_up', text: 'Popular' },
      { icon: 'public', text: 'Public' },
      { icon: 'folder', text: 'Mine' },
      { icon: 'help', text: 'Help' }
    ]
  }),
  props: {
    source: String,
  },methods: {
    goPage: function(a) {
      console.log(a)
    }
  }
}
</script>
