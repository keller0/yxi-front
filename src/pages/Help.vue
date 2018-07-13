<template>

      <v-card>
        <div v-for="i in qa" :key="i.q">
            <v-card-title>
              <span class="headline">{{i.q}}</span>
            </v-card-title>
            <v-card-text>
              {{i.a}}
            </v-card-text>
        </div>
        <v-card-title>
            <span class="headline">New questions?
            <a href="https://github.com/keller0/yxi-front/issues/new" target="_blank">
                Github New Issue
            </a>
            </span>
        </v-card-title>
      </v-card>


</template>

<script>
  export default {
      data() {
          return {
              qa: [
                  {
                      q: 'What can I do on yxi.io ?',
                      a: 'Create, run and share your code snippets.'
                  },
                  {
                      q: 'What language can I run on yxi.io ?',
                      a: 'For now, we support Bash, C, C++, Go, Haskell, Java, PHP, Python, Perl, Ruby.'
                  },
                  {
                      q: 'Limits about code snippets ?',
                      a: 'You could run snippets one at a time. Max file size = 10K, Max memory usage 50M, Max compile+run time = 10s.'
                  }
              ]
          }
      }
  }
</script>
