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
            username: '',
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
        if (t === state.editor.config.theme) {
            return
        }
        import(`codemirror/theme/${t}.css`)
        state.editor.config.theme = t
        localStorage.setItem('editorTheme', t)
    },
    updateEditorMode(state, payload) {
        state.editor.config.mode = payload.mime
    },
    updateEditorBuffer(state, payload) {
        state.editor.buffer = payload
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
