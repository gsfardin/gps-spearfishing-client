import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/layout/HomeLayout'
import UserList from '@/components/user/UserList'
import UserCreateEdit from '@/components/user/UserCreateEdit'
import DiveList from '@/components/dive/DiveList'
import DiveCreateEdit from '@/components/dive/DiveCreateEdit'

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
            path: '/userCreateEdit',
            name: "UserCreate",
            component: UserCreateEdit,
        },
        {
            path: '/userCreateEdit/:id',
            name: "UserEdit",
            component: UserCreateEdit,
        },
        {
            path: '/diveList',
            name: "DiveList",
            component: DiveList
        },
        {
            path: '/diveCreateEdit',
            name: "DiveCreate",
            component: DiveCreateEdit,
        },
        {
            path: '/diveCreateEdit/:id',
            name: "DiveEdit",
            component: DiveCreateEdit,
        },
    ]
})
