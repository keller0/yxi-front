import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Help from '@/pages/Help'


Vue.use(Router)

const routerMap = [
    {
        path: '/', component: Home
    },
    {
        path: '/help', component: Help
    }

]

const router = new Router({
    routes: routerMap,
    mode: 'history'
})

export default router
