import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
    codelist: {
        public: [],
        popular: [],
        mine: []
    }
}

const mutations = {
    updateList(state, payload) {
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
    }
}

const actions = {

}

const getters = {

}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
