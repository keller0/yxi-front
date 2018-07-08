// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'codemirror/lib/codemirror.css'
import '@/assets/css/index.scss'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/php/php.js'
import 'codemirror/mode/python/python.js'
import 'codemirror/mode/go/go.js'
import 'codemirror/mode/shell/shell.js'

Vue.use(Vuetify)
router.afterEach(function(to) {
    if (window.ga) {
        window.ga('set', 'page', to.fullPath)
        window.ga('send', 'pageview')
    }
})
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>',
    render: h => h(App)

}).$mount('#app')
