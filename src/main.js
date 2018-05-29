// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import VueRouter from 'vue-router'

import Home from './components/Home'

Vue.use(VueRouter)
Vue.use(Vuetify)

const routes = [
  {path: '/', component: Home}
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  render: h => h(App)

}).$mount('#app')
