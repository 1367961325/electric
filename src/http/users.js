/*
 * @Descripttion: 
 * @version: 1.0
 * @Company: AAA
 * @Author: YAP
 * @Date: 2021-04-27 19:40:19
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-05 08:00:56
 */
import Http from './http'

//用户列表操作
// export function userOpt(userInfo,mode="get",id="") {
//   return Http({
//       url: `/api/private/v1/users/${id}`,
//       params: userInfo,
//       data:userInfo,
//       method:mode
//   })
// }

//用户列表数据
export function userList(userInfo) {
    return Http({
        url: '/api/private/v1/users',
        params: userInfo,
    })
}

//改变用户状态
export function userStateChange(id,state) {
    return Http({
      url:`/api/private/v1/users/${id}/state/${state}`,
      method:'put'
    })
}
//添加用户信息
export function userAdd(userInfo) {
    return Http({
      url:'/api/private/v1/users',
      data: userInfo,
      method:'post'
    })
}
//获取编辑菜单信息
export function getUserInfo(id) {
  return Http({
    url:`/api/private/v1/users/${id}`,
  })
}
//修改用户信息
export function userEdit(id,userInfo) {
  return Http({
    url:`/api/private/v1/users/${id}`,
    data:userInfo,
    method:'put'
  })
}
//删除用户信息
export function userDel(id) {
  return Http({
    url:`/api/private/v1/users/${id}`,
    method:'delete'
  })
}
