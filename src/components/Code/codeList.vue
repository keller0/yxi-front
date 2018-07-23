<template>
  <v-layout row>
    <v-flex xs12 sm10 offset-sm1>
      <v-card>
          <v-list two-line>
              <template v-for="(code, index) in codes">
                <v-list-tile :key="code.id" @click="openCode(code.id)">
                  <v-list-tile-action>
                  <img :src="langSrc(code.lang)" width="40px" height="40px">
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="code.title"></v-list-tile-title>
                    <v-list-tile-sub-title>{{code.username}} at {{huTime(code.createat)}}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                      <v-list-tile-action-text>{{ code.likes }} likes</v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider :key="index"></v-divider>
              </template>
          </v-list>
          <template>
              <v-btn block :loading="loading" @click="loadMore">Load more</v-btn>
          </template>
      </v-card>
    </v-flex>
    <new-button></new-button>
  </v-layout>
</template>

<script>
import newButton from '@/components/Button/new'
import { getCodeList } from '@/api/code'
import moment from 'moment-timezone'
import editorStroe from '@/store/editor'

export default {
    components: {
        newButton
    },
    data() {
        return {
            loading: true,
            codes: []
        }
    },
    computed: {

    },
    props: [
        'type'
    ],
    created() {
        switch (this.type) {
            case 'public':
                this.codes = editorStroe.state.codelist.pupblic
                break
            case 'popular':
                this.codes = editorStroe.state.codelist.popular
                break
            default:
                this.codes = []
        }
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
        huTime(s) {
            var localTZ = moment.tz.guess()
            var t = moment.utc(s)
            var l = t.tz(localTZ).fromNow()
            return l
        },
        async getCode() {
            try {
                const res = await getCodeList(this.type, '0')
                this.codes = res.codes
                editorStroe.commit({
                    type: 'updateCodeList',
                    codeType: this.type,
                    list: this.codes
                })
            } catch (error) {
                this.error = error.message
                console.error(error)
            } finally {
                this.loading = false
            }
        },
        openCode(id) {
            this.$router.push('/code/' + id)
        },
        langSrc(l) {
            return '/static/' + l + '.svg'
        },
        async loadMore() {
            this.loading = true
            var len = this.codes.length
            try {
                const res = await getCodeList(this.type, len)
                this.codes = this.codes.concat(res.codes)
            } catch (error) {
                this.error = error.message
                console.error(error)
            } finally {
                this.loading = false
            }
        }

    }
}
</script>
