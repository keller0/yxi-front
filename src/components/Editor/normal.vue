<template>
    <div>
        <v-card width="100%" v-if="!showError">
            <v-card-title>
                <v-expansion-panel>
                    <!-- file title and discription -->
                    <v-expansion-panel-content expand-icon="mdi-menu-down">
                        <div slot="header">{{editorBuffer.title}}</div>
                        <v-card>
                            <v-container fluid>
                                <v-layout row>
                                    <v-flex xs5>
                                        <v-text-field v-model="editorBuffer.title"
                                        :rules="[(v) => v.length <= 25 || 'Max 25 characters']"
                                        :counter="25"
                                        label="Title"></v-text-field>
                                    </v-flex>
                                     <v-flex xs1>
                                    </v-flex>
                                    <v-flex xs2>
                                        <v-switch
                                            @click="tagglePub"
                                            :label="`${s1[isPublic]}`"
                                            :disabled="!isMyCode"
                                            v-model="isPublic"
                                        ></v-switch>
                                    </v-flex>
                                    <v-flex xs2>
                                        <v-switch
                                            @click="taggleAno"
                                            :label="`Anonymous:${isAnonymous}`"
                                            :disabled="!isMyCode"
                                            v-model="isAnonymous"
                                        ></v-switch>
                                    </v-flex>
                                </v-layout>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                          v-model="editorBuffer.description"
                                          name="input-7-1"
                                          label="Description"
                                          multi-line
                                          :rules="[(v) => v.length <= 300 || 'Max 300 characters']"
                                          :counter="300"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-card-title>
            <!-- file name -->
            <v-container >
                <v-layout row wrap>
                  <v-flex xs8 sm6>
                        <v-text-field v-model="editorBuffer.filename" solo-inverted
                            :rules="[(v) => v.length <= 25 || 'Max 25 characters']"
                            :counter="25"
                            hint="Filename">
                        </v-text-field>
                  </v-flex>
                  <v-flex sm5 hidden-xs-only>
                  </v-flex>
                  <v-flex xs2 sm1>
                       <editorSettion></editorSettion>
                  </v-flex>
                </v-layout>
            </v-container>
            <v-card-text>
                <!-- file content -->
                <EditorBase></EditorBase>
                <runCode></runCode>
            </v-card-text>

        </v-card>
        <v-alert :value="showError" outline color="error" icon="warning">
            {{errMsg}} Go back to <router-link to="/">Home</router-link>, or Login.
        </v-alert>
        <likeButton v-if="!isMyCode"></likeButton>
        <updateButton v-if="isMyCode" :anonymous="isAnonymous" :public="isPublic"></updateButton>
    </div>
</template>

<script>

import runCode from '@/components/Editor/runCode'
import editorSettion from '@/components/Editor/editorSetting'
import EditorBase from '@/components/Editor/base'
import likeButton from '@/components/Button/like'
import updateButton from '@/components/Button/update'
import { getCode } from '@/api/code'

export default {
    name: 'EditorOpen',
    components: {
        EditorBase,
        runCode,
        editorSettion,
        likeButton,
        updateButton
    },
    computed: {
        editorBuffer() {
            return this.$store.state.editor.buffer
        },
        logined() {
            return this.$store.getters.isLogined
        },
        isMyCode() {
            return this.$store.getters.isLogined &&
            this.$store.state.editor.buffer.username === this.$store.state.user.name
        }
    },
    props: [

    ],
    data: function() {
        return {
            showError: false,
            errMsg: '',
            s1: {
                true: 'Public',
                false: 'Private'
            },
            isAnonymous: false,
            isPublic: true
        }
    },
    mounted() {

    },
    created() {
        this.getCodeContent('/')
    },
    watch: {
        '$route': 'getCodeContent'
    },
    methods: {
        async getCodeContent(part) {
            try {
                var token = this.$store.state.user.token
                const resp = await getCode(this.$route.params.id, part, token)
                // update store status
                this.$store.commit({
                    type: 'updateEditorBuffer',
                    code: resp.code
                })
                this.isAnonymous = this.editorBuffer.username === 'anonymous'
                this.isPublic = this.editorBuffer.public
                console.log(this.isAnonymous, this.isPublic)
            } catch (error) {
                switch (error.response.status) {
                    case 403:
                        this.errMsg = '请求的资源需要权限认证'

                        break
                    case 404:
                        this.errMsg = '请求的数据不存在'
                        break
                    default:
                        this.errMsg = '服务器问题( ⊙ o ⊙ )！'
                        break
                }
                this.showError = true
            } finally {
                console.log('getcode')
            }
        },
        tagglePub() {
            // change from public to private
            if (this.isPublic) {
                this.isAnonymous = false
            }
        },
        taggleAno() {
            // change from anonymous to nonanonymous
            if (!this.isAnonymous) {
                this.isPublic = true
            }
        }
    }
}

</script>
<style>

</style>
