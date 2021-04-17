/*
 * @Descripttion: 
 * @version: 1.0
 * @Company: AAA
 * @Author: YAP
 * @Date: 2021-04-13 14:35:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-13 21:26:40
 */
import Http from './index'
//注册登录
export function login(data){
    return Http({
        url:'/'+data.port,
            data:{
                username:data.un,
                password:data.ps
            },
            method:'post'
    })
}
//主页
export function home(){
    return Http({
        url:'/home',
        method:'get',
    })
  }

  //小组
export function group_axios(){
    return Http({
        url:'/group',
        method:'get',
    })
}
//电影 正在上映
export function movie_now(){
    return Http({
        url:'/movie_now',
        method:'get',
    })
  }
//即将上映
  export function movie_future(){
    return Http({
        url:'/movie_future',
        method:'get',
    })
  }