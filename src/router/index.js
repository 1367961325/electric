/*
 * @Descripttion: 
 * @version: 1.0
 * @Company: AAA
 * @Author: YAP
 * @Date: 2021-04-17 10:16:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-17 16:24:33
 */
import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)


const routes = [{
        path: '/',
        redirect: '/login',
    },
    {
        path: '/home',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "home" */ '../views/Home.vue'),
        children: [{
            path: 'users',
            component: () =>
                import ( /* webpackChunkName: "home" */ '../components/users.vue')
        }, {
            path: 'rights',
            component: () =>
                import ( /* webpackChunkName: "home" */ '../components/rights.vue')
        }, {
            path: 'reports',
            component: () =>
                import ( /* webpackChunkName: "home" */ '../components/reports.vue')
        }, {
            path: 'orders',
            component: () =>
                import ( /* webpackChunkName: "home" */ '../components/orders.vue')
        }, {
            path: 'goods',
            component: () =>
                import ( /* webpackChunkName: "home" */ '../components/goods.vue')
        }, {
            path: 'roles',
            component: () =>
                import ( /* webpackChunkName: "home" */ '../components/roles.vue')
        }, {
            path: 'params',
            component: () =>
                import ( /* webpackChunkName: "home" */ '../components/params.vue')
        }, {
            path: 'categories',
            component: () =>
                import ( /* webpackChunkName: "home" */ '../components/categories.vue')
        }, ]


    },
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "login" */ '../views/Login.vue')
    },
]

const router = new VueRouter({
    routes
})

export default router