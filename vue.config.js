/*
 * @Descripttion: 
 * @version: 1.0
 * @Company: AAA
 * @Author: YAP
 * @Date: 2021-04-17 10:18:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-06 08:25:08
 */
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.1.10:8888/',
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            }
        }
    }
}