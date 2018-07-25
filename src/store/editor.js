import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
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
    codelist: {
        public: [],
        popular: [],
        mine: []
    },
    status: {
        id: 0,
        saved: false,
        isNew: false
    },
    bufferlist: [],
    newBuffer: {
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
}

const mutations = {
    updateTheme(state, t) {
        import(`codemirror/theme/${t}.css`)
        state.config.theme = t
        localStorage.setItem('editorTheme', t)
    },
    updateMode(state, payload) {
        state.config.mode = payload.mime
    },
    updateLM(state, payload) {
        state.config.lineNumbers = payload.lm
    },
    updateCodeList(state, payload) {
        switch (payload.codeType) {
            case 'public':
                state.codelist.public = payload.list
                break
            case 'popular':
                state.codelist.popular = payload.list
                break
            case 'mine':
                state.codelist.mine = payload.list
                break
            default:
                return
        }
    },
    add2BufferList(state, payload) {

    },
    addAndOpen(state, payload) {
        state.bufferlist.push(payload.code)
        state.status.id = payload.code.id
        state.status.isNew = false
    },
    switchBuffer(state, payload) {
        state.status.id = payload.id
        state.status.isNew = false
    },
    updateNewBuffer(state, payload) {
        state.newBuffer = payload.code
        state.status.isNew = true
    },
    updateCurrentLikes(state, payload) {
        var currentID = state.status.id
        for (const c of state.bufferlist) {
            if (c.id === currentID) {
                c.likes += payload.number
                break
            }
        }
    },
    updateCBuffer(state, payload) {
        var currentID = state.status.id
        for (const c of state.bufferlist) {
            if (c.id === currentID) {
                c.title = payload.code.title
                c.description = payload.code.description
                c.filename = payload.code.filename
                c.content = payload.code.content
                c.public = payload.code.public
                c.username = payload.code.username
                break
            }
        }
    }
}

const actions = {

}

const getters = {
    isInBL: (state) => (id) => {
        for (const c of state.bufferlist) {
            if (c.id === id) {
                return true
            }
        }
        return false
    },
    currentBuffer: (state) => {
        var currentID = state.status.id
        var b = {}
        for (const c of state.bufferlist) {
            if (c.id === currentID) {
                b = c
                break
            }
        }
        return b
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
