import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/layout/HomeLayout'
import DiveList from '@/components/dive/DiveList'
import UserList from '@/components/user/UserList'
import UserCreateEdit from '@/components/user/UserCreateEdit'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: "Home",
            component: Home
        },
        {
            path: '/userList',
            name: "UserList",
            component: UserList
        },
        {
            path: '/userCreateEdit/:id',
            name: "UserCreateEdit",
            component: UserCreateEdit,
        },
        {
            path: '/diveList',
            name: "DiveList",
            component: DiveList
        }
    ]
})
