/*
 * @Descripttion: 
 * @version: 1.0
 * @Company: AAA
 * @Author: YAP
 * @Date: 2021-04-17 10:20:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-17 16:09:54
 */
/*
 * @Descripttion: 
 * @version: 1.0
 * @Company: AAA
 * @Author: YAP
 * @Date: 2021-04-13 14:03:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-13 22:04:44
 */
/* 
    axios 封装
*/


import axios from "axios"
import router from "./../router"
export default function(config) {

    // 创建axios实例对象

    const instance = axios.create({
        baseURL: '/api',
        // timeout: 1000,
        // headers: { 'X-Custom-Header': 'foobar' } ???什么时候需要设置
    });
    // 请求的拦截

    // 添加请求拦截器
    instance.interceptors.request.use(function(config) {
        // 在发送请求之前做些什么
        let token = sessionStorage.getItem('token')
        if (token && config.url != '/login') {
            config.headers.Authorization = token
        }

        return config
    }, function(error) {
        // 对请求错误做些什么

        return Promise.reject(error);
    });

    // 添加响应拦截器
    instance.interceptors.response.use(function(response) {
        // 对响应数据做点什么
        if (response.data.status == 400) {
            router.replace("/")
        }
        return response.data;
    }, function(error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    });

    return instance(config);
}