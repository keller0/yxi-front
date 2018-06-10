import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home/Home'
import Help from '@/pages/Help'
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
        children: [
            { path: '/', component: Editor },
            { path: '/help', component: Help },
            { path: '/public', component: Pubcode },
            { path: '/popular', component: Popcode },
            { path: '/mine', component: Mycode },
            { path: '/new/:language', component: editNew }
        ]
    }
]

const router = new Router({
    routes: routerMap,
    mode: 'history'
})

export default router
