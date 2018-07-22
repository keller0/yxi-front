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
    },
    switchBuffer(state, payload) {
        state.status.id = payload.id
    },
    updateNewBuffer(state, payload) {
        state.bufferlist[0] = payload.code
        state.status.id = 0
    },
    updateCurrentLikes(state, payload) {
        var currentID = state.status.id
        for (const c of state.bufferlist) {
            if (c.id === currentID) {
                c.likes += payload.number
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
