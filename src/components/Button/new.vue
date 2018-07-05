<template>
    <div>
        <v-btn
              color="indigo"
              dark
              middle
              fixed
              bottom
              right
              fab
              @click="openDialog('newCode')"
            >
              <v-icon>add</v-icon>
          </v-btn>
          <NewCode></NewCode>
    </div>

</template>

<script>
  import NewCode from '@/components/Dialog/newCode'
  export default {
      components: {
          NewCode
      },
      data() {
          return {

          }
      },
      methods: {
          openDialog(d) {
              this.$store.commit({
                  type: 'taggleDialog',
                  name: d,
                  show: true
              })
          }
      }
  }
</script>
