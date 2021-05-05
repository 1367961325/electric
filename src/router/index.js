/*
 * @Descripttion: 
 * @version: 1.0
 * @Company: AAA
 * @Author: YAP
 * @Date: 2021-04-17 10:16:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-04 21:16:36
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
        // redirect: 'rights',
        children: [{
                path: 'users',
                component: () =>
                    import ( /* webpackChunkName: "users" */ '../components/users/users.vue')
            },
            {
                path: 'rights',
                component: () =>
                    import ( /* webpackChunkName: "rights" */ '../components/right/rights.vue')
            },
            {
                path: 'roles',
                component: () =>
                    import ( /* webpackChunkName: "home" */ '../components/right/roles.vue')
            },
            {
                path: 'reports',
                component: () =>
                    import ( /* webpackChunkName: "reports" */ '../components/reports.vue')
            },
            {
                path: 'orders',
                component: () =>
                    import ( /* webpackChunkName: "orders" */ '../components/orders.vue')
            },
            {
                path: 'goods',
                component: () =>
                    import ( /* webpackChunkName: "goods" */ '../components/shop/goods.vue')
            },
            {
                path: 'addShop',
                component: () =>
                    import ( /* webpackChunkName: "addshop" */ '../components/shop/addshop.vue'),
                children: [{
                        path: 'argument',
                        component: () =>
                            import ( /* webpackChunkName: "addshop" */ '../components/shop/addshop/argument.vue'),
                    }, {
                        path: 'content',
                        component: () =>
                            import ( /* webpackChunkName: "addshop" */ '../components/shop/addshop/content.vue'),
                    }, {
                        path: 'message',
                        component: () =>
                            import ( /* webpackChunkName: "addshop" */ '../components/shop/addshop/message.vue'),
                    }, {
                        path: 'property',
                        component: () =>
                            import ( /* webpackChunkName: "addshop" */ '../components/shop/addshop/property.vue'),
                    }, {
                        path: 'shopimg',
                        component: () =>
                            import ( /* webpackChunkName: "addshop" */ '../components/shop/addshop/shopimg.vue'),
                    },

                ]
            },
            {
                path: 'params',
                component: () =>
                    import ( /* webpackChunkName: "home" */ '../components/shop/params.vue')
            },
            {
                path: 'categories',
                component: () =>
                    import ( /* webpackChunkName: "home" */ '../components/shop/categories.vue')
            }
        ],



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