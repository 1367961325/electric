/*
 * @Descripttion: 
 * @version: 1.0
 * @Company: AAA
 * @Author: YAP
 * @Date: 2021-05-04 21:19:31
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-05 15:14:35
 */

import Http from './http'
//用户权限列表数据
export function rightList() {
    return Http({
        url: '/api/private/v1/rights/list',
    })
}
//获取权限树
export function rightTree(){
    return Http({
        url: '/api/private/v1/rights/tree',
    })
}
//移除角色指定权限
export function rightDel(id,rid){
    return Http({
        url: `/api/private/v1/roles/${id}/rights/${rid}`,
        method:"delete"
    })
}
//权限重新设置
export function rightEdit(id,rids){
    return Http({
        url: `/api/private/v1/roles/${id}/rights`,
        data:{rids},
        method:"post"
    })
}