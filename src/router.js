import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/layout/HomeLayout'
import DiveList from '@/components/dive/DiveList'
import UserList from '@/components/user/UserList'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/userList',
            component: UserList
        },
        {
            path: '/diveList',
            component: DiveList
        }
    ]
})
