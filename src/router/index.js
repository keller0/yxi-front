import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'

Vue.use(Router)

const routerMap = [
    {
        path: '/',
        component: Home
    }
]

const router = new Router({
    routes: routerMap,
    mode: 'history'
})

export default router
