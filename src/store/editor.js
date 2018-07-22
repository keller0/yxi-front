import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
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
    bufferlist: [
        {
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
    ]
}

const mutations = {
    updateCodeList(state, payload) {
        switch (payload.codeType) {
            case 'public':
                state.codelist.pupblic = payload.list
                break
            case 'popular':
                state.codelist.popular = payload.list
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
    },
    switchBuffer(state, payload) {
        state.status.id = payload.id
    },
    updateNewBuffer(state, payload) {
        state.bufferlist[0] = payload.code
        state.status.id = 0
    }
}

const actions = {

}

const getters = {
    isInBL: (state) => (id) => {
        var d = state.bufferlist.findIndex(code => {
            code.id === id
        })
        return d !== -1
    },
    currentBuffer: (state) => {
        var currentID = state.status.id
        var b = {}
        state.bufferlist.map(buffer => {
            if (buffer.id === currentID) {
                b = buffer
            }
        })
        return b
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
