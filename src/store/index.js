import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cateId: [],
        cateName: [],
        Arg: [],
        realArg: [],
        attrs_pro: [],
        addForm: {
            goods_name: '',
            goods_price: '',
            goods_weight: '',
            goods_cat: [],
            goods_number: '',
            goods_introduce: '',
            pics: [],
            attrs: [],
        },
    },
    mutations: {},
    actions: {},
    modules: {}
})