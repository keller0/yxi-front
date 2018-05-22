// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'

import About from './components/About'
import Yxi from './components/Yxi'

Vue.use(VueRouter)
Vue.use(ElementUI)

const routes = [
  {path: '/', component: Yxi},
  {path: '/about', component: About}
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  render: h => h(App)

}).$mount('#app')
