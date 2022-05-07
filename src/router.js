import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/layout/HomeLayout'
import DiveList from '@/components/dive/DiveList'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/diveList',
            component: DiveList
        }
    ]
})
