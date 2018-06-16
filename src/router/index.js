import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Help from '@/pages/Help'
import Popcode from '@/components/Code/Popcode'
import Mycode from '@/components/Code/Mycode'
import Pubcode from '@/components/Code/Pubcode'
import Example from '@/components/Editor/example'
import EditorNew from '@/components/Editor/new'
import EditorOpen from '@/components/Editor/normal'

Vue.use(Router)

const routerMap = [
    {
        path: '/',
        component: Home,
        children: [
            { path: '/', component: Example },
            { path: '/help', component: Help },
            { path: '/public', component: Pubcode },
            { path: '/popular', component: Popcode },
            { path: '/mine', component: Mycode },
            { path: '/new/:language', component: EditorNew },
            { path: '/code/:id', component: EditorOpen }
        ]
    }
]

const router = new Router({
    routes: routerMap,
    mode: 'history'
})

export default router
