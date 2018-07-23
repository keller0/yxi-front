import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
    config: {
        dark: false
    },
    user: {
        name: '',
        id: 0,
        run_token: '',
        token: '',
        token_exp: ''
    },
    dialog: {
        singin: {
            show: false
        },
        singup: {
            show: false
        },
        newCode: {
            show: false
        },
        editorSetting: {
            show: false
        }
    },
    backurl: ''
}

const mutations = {
    changeURL(state, payload) {
        state.backurl = payload.url
    },
    userLogin(state, payload) {
        state.user.token = payload.token
        state.user.id = payload.id
        state.user.name = payload.name
        state.user.run_token = payload.run_token
        state.user.token_exp = payload.token_exp
        localStorage.setItem('userinfo', JSON.stringify(state.user))
    },
    userLogout(state) {
        state.user.token = ''
        state.user.id = 0
        state.user.name = ''
        state.user.run_token = ''
        state.user.token_exp = 0
        localStorage.setItem('userinfo', '{}')
    },
    taggleDialog(state, payload) {
        switch (payload.name) {
            case 'singin':
                state.dialog.singin.show = payload.show
                break
            case 'singup':
                state.dialog.singup.show = payload.show
                break
            case 'newCode':
                state.dialog.newCode.show = payload.show
                break
            case 'editorSetting':
                state.dialog.editorSetting.show = payload.show
                break
            default:
                return
        }
    }
}

const actions = {

}

// getters are functions
const getters = {
    isLogined: state => {
        return state.user.token_exp > Date.now() / 1000
    }
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
