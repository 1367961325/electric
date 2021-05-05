/*
 * @Descripttion: 
 * @version: 1.0
 * @Company: AAA
 * @Author: YAP
 * @Date: 2021-05-05 08:03:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-05 15:14:49
 */
import Http from './http'
//角色列表数据
export function roleList() {
    return Http({
        url: '/api/private/v1/roles',
    })
  }
  //分配用户角色
export function roleSet(id,roleId) {
    return Http({
      url:`/api/private/v1/users/${id}/role`,
      data:{rid:roleId},
      method:'put'
    })
  }
//添加角色
export function roleAdd(addForm) {
    return Http({
      url:`/api/private/v1/roles`,
      data:addForm,
      method:'post'
    })
  }
  //角色信息查询
  export function roleSearch(id) {
    return Http({
      url:`/api/private/v1/roles/${id}`,
      method:'get'
    })
  }
  //角色信息修改
  export function roleEdit(rid,addForm) {
    return Http({
      url:`/api/private/v1/roles/${rid}`,
      data:addForm,
      method:'put'
    })
  }
//删除角色
export function roleDel(id) {
    return Http({
      url:`/api/private/v1/roles/${id}`,
      method:'delete'
    })
  }