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
        children: [
            { path: '/', component: Editor },
            { path: '/public', component: Pubcode },
            { path: '/popular', component: Popcode },
            { path: '/mine', component: Mycode },
            { path: '/editor', component: Editor },
            { path: '/new', component: editNew },
            { path: '/help', component: Mycode }
        ]
    }
]

const router = new Router({
    routes: routerMap,
    mode: 'history'
})

export default router
