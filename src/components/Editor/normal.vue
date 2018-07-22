<template>
    <div>
        <v-card width="100%" v-if="errMsg == ''">
            <v-card-title>
                <v-expansion-panel>
                    <!-- file title and discription -->
                    <v-expansion-panel-content>
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
                </v-layout>
            </v-container>
            <v-card-text>
                <!-- file content -->
                <EditorBase></EditorBase>
                <runCode></runCode>
            </v-card-text>

        </v-card>
        <v-alert :value="errMsg != ''" outline color="error" icon="warning">
            {{errMsg}}, Go back to <router-link to="/">Home</router-link>, or Login.
        </v-alert>
        <likeButton v-if="!isMyCode"></likeButton>
        <updateButton v-if="isMyCode" :anonymous="isAnonymous" :public="isPublic"></updateButton>
    </div>
</template>

<script>

import runCode from '@/components/Editor/runCode'
import EditorBase from '@/components/Editor/base'
import likeButton from '@/components/Button/like'
import updateButton from '@/components/Button/update'
import { getCode } from '@/api/code'
import { errorMsg } from '@/api/error'
import editorStroe from '@/store/editor'

export default {
    components: {
        EditorBase,
        runCode,
        likeButton,
        updateButton
    },
    computed: {
        editorBuffer() {
            return editorStroe.getters.currentBuffer
        },
        isMyCode() {
            return this.$store.getters.isLogined &&
            editorStroe.getters.currentBuffer.username === this.$store.state.user.name
        }
    },
    props: [

    ],
    data: function() {
        return {
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
        var idInt = parseInt(this.$route.params.id)
        if (editorStroe.getters.isInBL(idInt)) {
            editorStroe.commit({
                type: 'switchBuffer',
                id: idInt
            })
            this.isAnonymous = this.editorBuffer.username === 'anonymous'
            this.isPublic = this.editorBuffer.public
        } else {
            this.getCodeContent('/')
        }
    },
    watch: {
        '$route': 'getCodeContent'
    },
    methods: {
        async getCodeContent(part) {
            this.errMsg = ''
            try {
                var token = this.$store.state.user.token
                const resp = await getCode(this.$route.params.id, part, token)
                editorStroe.commit({
                    type: 'addAndOpen',
                    code: resp.code
                })
                this.isAnonymous = this.editorBuffer.username === 'anonymous'
                this.isPublic = this.editorBuffer.public
            } catch (error) {
                this.errMsg = errorMsg[error.response.data.errNumber]
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
