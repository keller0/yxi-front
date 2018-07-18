import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
    notify: {
        show: false,
        msg: ''
    }
}

const mutations = {
    taggleNotify(state, payload) {
        state.notify.show = payload.show
        state.notify.msg = payload.msg
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
