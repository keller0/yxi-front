<template>
    <v-menu
    :close-on-content-click="false"
    :nudge-width="300"
    v-model="themeSettiogMenu"
    offset-x
    xs12 sm12
    >
        <v-btn slot="activator" flat color="purple" dark><v-icon dark>build</v-icon></v-btn>
        <v-card>
            <v-card-title>
                <span class="headline">Editor setting</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                        <v-flex xs12 sm12>
                            <v-select
                                v-model="selectedTheme"
                                label="Theme"
                                :items="themes"
                                autocomplete
                                @change="onThemeChange">
                            </v-select>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat @click.native="themeSettiogMenu = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>


<script>
import themes from './theme'

export default {
    name: 'editorSetting',
    components: {
    },
    data() {
        return {
            themeSettiogMenu: false,
            selectedTheme: 'blackboard',
            themes
        }
    },
    methods: {
        onThemeChange(theme) {
            this.$emit('listenSettingChange', theme)
        }
    }
}
</script>
<style scoped>
</style>
