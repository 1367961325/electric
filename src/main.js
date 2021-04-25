/*
 * @Descripttion: 
 * @version: 1.0
 * @Company: AAA
 * @Author: YAP
 * @Date: 2021-04-17 10:16:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-17 16:31:09
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import ElementUI from 'element-ui';
import ZkTable from 'vue-table-with-tree-grid';
import 'element-ui/lib/theme-chalk/index.css';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueQuillEditor from 'vue-quill-editor'

Vue.config.productionTip = false;
Vue.component('tree-table', ZkTable)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
Vue.use(ElementUI, axios, VueAxios);
Vue.use(VueQuillEditor);