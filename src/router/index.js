import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home/Home'
import Popcode from '@/components/Code/Popcode'
import Mycode from '@/components/Code/Mycode'
import Pubcode from '@/components/Code/Pubcode'
import Editor from '@/components/Editor'
import editNew from '@/components/Editor/new'

Vue.use(Router)

const routerMap = [
    {
        path: '/',
        component: Home,
        redirect: '/editor',
        menu: true,
        children: [
            { path: '/public', component: Pubcode, name: 'Popular', icon: 'trending_up' }
        ]
    },
    {
        path: '/',
        component: Home,
        redirect: '/editor',
        menu: true,
        children: [
            { path: '/popular', component: Popcode, name: 'Public', icon: 'public' }
        ]
    },
    {
        path: '/',
        component: Home,
        redirect: '/editor',
        menu: true,
        children: [
            { path: '/mine', component: Mycode, name: 'Mine', icon: 'folder' }
        ]
    },
    {
        path: '/',
        component: Home,
        redirect: '/editor',
        menu: false,
        children: [
            { path: '/editor', component: Editor }
        ]
    },
    {
        path: '/',
        component: Home,
        redirect: '/editor',
        menu: false,
        children: [
            { path: '/new', component: editNew }
        ]
    },
    {
        path: '/',
        component: Home,
        redirect: '/editor',
        menu: false,
        children: [
            { path: '/help', component: Mycode }
        ]
    }
]

const router = new Router({
    routes: routerMap,
    mode: 'history'
})

export default router
