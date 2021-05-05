/*
 * @Descripttion: 
 * @version: 1.0
 * @Company: AAA
 * @Author: YAP
 * @Date: 2021-04-17 10:18:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-05 15:30:56
 */
module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8888/',
                changeOrigin: true,
                pathRewrite: { '^/api': '' },
            }
        }
    }
}