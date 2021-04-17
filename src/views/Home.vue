<!--
 * @Descripttion: 
 * @version: 1.0
 * @Company: AAA
 * @Author: YAP
 * @Date: 2021-04-17 10:16:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-17 19:04:57
-->
<template>
    <div>
      
    </div>
</template>

<script>
import {menusList} from './../http/axios.js'
export default {
    props: {

    },
    data() {
        return {

        };
    },
    methods: {
       
    },
    components: {

    },
    mounted(){
        menusList()
        .then(res =>{
            console.log(res);
            console.log(res.data);
        })
    }
};
</script>

<style scoped lang="less">

</style>
