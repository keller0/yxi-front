import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/home/Home'
import Pcode from '@/components/Pcode'
import Editor from '@/components/Editor'
import editNew from '@/components/Editor/new'

Vue.use(Router)

const routerMap = [
    {
        path: '/',
        component: Home,
        children: [
            {
                path: '',
                component: Editor
            },
            {
                path: 'public',
                component: Pcode
            },
            {
                path: 'new',
                component: editNew
            }
        ]
    }
]

const router = new Router({
    routes: routerMap,
    mode: 'history'
})

export default router
