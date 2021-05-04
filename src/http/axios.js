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

//添加分类
export function typeAdd(addlist) {
    return Http({
        url: '/api/private/v1/categories',
        data: addlist,
        method: 'post',
    })
}



//删除商品分类
export function typeDel(id) {
    return Http({
        url: `/api/private/v1/categories/${id}`,

        method: 'delete',
    })
}

//商品列表数据
export function typeList({ pagenum, pagesize, type }) {
    return Http({
        url: '/api/private/v1/categories',
        params: { pagenum, pagesize, type }
    })
}

//编辑分类
export function typeCha(id, { cat_name }) {
    return Http({
        url: `/api/private/v1/categories/${id}`,
        method: 'put',
        data: { cat_name }
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


//添加参数和属性
export function addArg(id, addFrom) {
    return Http({
        url: `/api/private/v1/categories/${id}/attributes`,
        data: addFrom,
        method: 'post',
    })
}

//删除参数和属性
export function delArg(id, attr_id) {
    return Http({
        url: `/api/private/v1/categories/${id}/attributes/${attr_id}`,
        method: 'delete',
    })
}

//编辑参数和属性
export function changeArg(id, attr_id, changeForm) {
    return Http({
        url: `/api/private/v1/categories/${id}/attributes/${attr_id}`,
        method: 'put',
        data: changeForm
    })
}

//编辑参数和属性的小标签
export function changeTag(id, attr_id, changeTag) {
    return Http({
        url: `/api/private/v1/categories/${id}/attributes/${attr_id}`,
        method: 'put',
        data: changeTag
    })

}

//订单列表
export function orders(page) {
    return Http({
        url: '/api/private/v1/orders',
        method: 'get',
        params: page
    })
}

// 订单详情
export function moreOrders(id) {
    return Http({
        url: '/api/private/v1/orders/' + id,
    })
}

//修改订单状态
export function OrdersChange(id, change) {
    return Http({
        url: '/api/private/v1/orders/' + id,
        data: change,
        method: 'put'
    })
}




//物流信息
export function Message() {
    return Http({
        url: `/api/private/v1/kuaidi/1106975712662`,
    })
}


//数据统计表
export function math() {
    return Http({
        url: `/api/private/v1/reports/type/1`,
    })
}