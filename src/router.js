import Vue from 'vue'
import Router from 'vue-router'
import DiveList from '@/components/DiveList'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/diveList',
            component: DiveList
        }
    ]
})
