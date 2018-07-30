import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Sample from '@/pages/Sample'
import Code from '@/pages/Code'
import Help from '@/pages/Help'
import PasswordReset from '@/components/account/passwordReset'
import reset from '@/components/account/reset'
import Mycode from '@/components/Code/Mycode'
import codeList from '@/components/Code/codeList'

import EditorNew from '@/components/Editor/new'
import EditorOpen from '@/components/Editor/normal'

Vue.use(Router)

const routerMap = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/',
        component: Sample,
        children: [
            { path: '/help', component: Help },
            { path: '/password_reset', component: PasswordReset },
            { path: '/password_new',
                component: reset,
                props: (route) => ({ email: route.query.email, token: route.query.token }) },
            { path: '/public', component: codeList, props: { type: 'public' }},
            { path: '/popular', component: codeList, props: { type: 'popular' }},
            { path: '/mine', component: Mycode }

        ]
    },
    {
        path: '/',
        component: Code,
        children: [
            { path: '/code/:id', component: EditorOpen },
            { path: '/new/:language', component: EditorNew }
        ]
    }

]

const router = new Router({
    routes: routerMap,
    mode: 'history'
})

export default router
