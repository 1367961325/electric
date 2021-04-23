/*
 * @Descripttion: 
 * @version: 1.0
 * @Company: AAA
 * @Author: YAP
 * @Date: 2021-04-13 14:35:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-17 18:52:38
 */
import Http from './http'
//注册登录
export function login(data) {
    return Http({
        url: '/api/private/v1/login',
        data: {
            username: data.un,
            password: data.ps
        },
        method: 'post'
    })
}
//menu数据
export function menusList() {
    return Http({
        url: '/api/private/v1/menus',
    })
}

//商品列表数据
export function shopList({ pagenum, pagesize }) {
    return Http({
        url: '/api/private/v1/goods',
        params: { pagenum, pagesize },
    })
}

//删除商品列表数据
export function shopDel(id) {
    return Http({
        url: '/api/private/v1/goods' + "/" + id,
        method: 'delete',
    })
}


//添加商品
// export function shopAdd(id) {
//     return Http({
//         url: '/api/private/v1/goods',
//         data: {


//         },
//         method: 'post',
//     })
// }