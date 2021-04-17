/*
 * @Descripttion: 
 * @version: 1.0
 * @Company: AAA
 * @Author: YAP
 * @Date: 2021-04-13 14:35:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-17 18:03:08
 */
import Http from './http'
//注册登录
export function login(data){
    return Http({
        url:'/api/private/v1/login',
            data:{
                username:data.un,
                password:data.ps
            },
            method:'post'
    })
}
//menu数据
