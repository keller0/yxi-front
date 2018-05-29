import Vue from 'vue'
import Router from 'vue-router'

import About from '@/pages/About'
import Yxi from '@/pages/Yxi'

Vue.use(Router)

const routerMap = [
    {
        path: '/',
        component: Yxi
    },
    {
        path: '/about',
        component: About
    }
]

const router = new Router({
    routes: routerMap,
    mode: 'history'
})

export default router
