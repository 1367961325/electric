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

//商品分类信息
export function shopType() {
    return Http({
        url: '/api/private/v1/categories',
    })
}

//商品动态参数
export function shopArg({ cateId }) {
    return Http({
        url: `/api/private/v1/categories/${cateId}/attributes`,
        params: {
            sel: 'many',

        },
    })
}

//商品静态属性
export function shopPro({ cateId, name }) {
    return Http({
        url: `/api/private/v1/categories/${cateId}/attributes`,
        params: {
            sel: 'only',
            name
        },
    })
}

//提交添加商品
export function shopSubmit(addForm) {
    return Http({
        url: '/api/private/v1/goods',
        method: 'post',
        data: addForm,
    })
}

//查询商品
export function shopSearch(id) {
    return Http({
        url: `/api/private/v1/goods/${id}`
    })
}

//提交修改商品
export function shopChange(id, addForm) {
    return Http({
        url: `/api/private/v1/goods/${id}`,
        method: 'put',
        params: addForm
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