import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
    config: {
        dark: false
    },
    user: {
        logined: false,
        token: ''
    },
    editor: {
        config: {
            tabSize: 4,
            indentUnit: 4,
            lineNumbers: true,
            indentWithTabs: true,
            smartIndent: true,
            line: true,
            mode: 'text/x-csrc',
            theme: 'blackboard'
        },
        buffer: {
            codeID: 0,
            username: '',
            title: '',
            description: '',
            language: '',
            filename: '',
            content: '',
            likes: 0,
            public: true,
            createat: '',
            updateat: '',
            isNew: true
        }
    },
    codes: {
        public: [],
        top: []
    }
}

const mutations = {
    updateEditorTheme(state, t) {
        import(`codemirror/theme/${t}.css`)
        state.editor.config.theme = t
    },
    updateEditorMode(state, payload) {
        state.editor.config.mode = payload.mime
    }
}

const actions = {

}

// getters are functions
const getters = {

}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
