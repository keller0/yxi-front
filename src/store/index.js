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
            content: '',
            createat: '',
            description: '',
            filename: '',
            id: 0,
            lang: '',
            likes: 0,
            public: true,
            title: '',
            updateat: '',
            username: ''
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
        localStorage.setItem('editorTheme', t)
    },
    updateEditorMode(state, payload) {
        state.editor.config.mode = payload.mime
    },
    updateEditorBuffer(state, payload) {
        state.editor.buffer = payload.code
        localStorage.setItem('editorBuffer', JSON.stringify(payload.code))
    },
    updateEditorBufferContent(state, payload) {
        state.editor.buffer.content = payload.content
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
