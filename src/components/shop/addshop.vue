<template>
  <div>
    <div class="good">
      <div style="margin-top: 15px" class="good_head">
        <el-alert title="添加商品信息" type="info" center show-icon></el-alert>
        <el-steps :active="Number(message)" align-center finish-status="success">
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
            <el-step title="完成"></el-step>
        </el-steps>
      </div>
      <div class="block">        
        <el-tabs :tab-position="tabPosition" v-model="message" :before-leave='eee'>
          <el-tab-pane label="基本信息" name='0'><Message></Message></el-tab-pane>
          <el-tab-pane label="商品参数" name='1'><Argument></Argument></el-tab-pane>
          <el-tab-pane label="商品属性" name='2'><Property></Property></el-tab-pane>
          <el-tab-pane label="商品图片" name='3'><Shopimg></Shopimg></el-tab-pane>
          <el-tab-pane label="商品内容" name='4'><Content></Content></el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Message from './addshop/message.vue'
import Argument from './addshop/argument.vue'
import Property from './addshop/property.vue'
import Shopimg from './addshop/shopimg.vue'
import Content from './addshop/content.vue'
export default {
  props: {},
  data() {
    return {
      tabPosition: 'left',
      message:'0',
    };
  },
  methods: {
    // qqq(tab){
    //   if(Number(tab.index)==1){
    //     this.message ='0';
    //   }
    //     console.log(tab);
    //     console.log(typeof tab.index);      
    // },
    eee(activeName, oldActiveName){
      if(activeName==1&&oldActiveName==0){
      }
      console.log(activeName, oldActiveName);
      console.log(this.message);
    }
  },
  components: {
    Message,Argument,Property,Shopimg,Content
  },
};
</script>
<style scoped lang="less">
body {
  .good {
    background-color: #fff;
    padding: 20px 20px 22px 20px;
    margin-bottom: 80px;
    margin-right: 2px;
    border-bottom: 1px solid #cbcdd1;
    border-left: 1px solid #e6e9ed;
    border-radius: 3px;
    .good_head {
      .el-steps {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 15px;
          margin-bottom: 23px;
      }
    }
    .block {
      margin-top: 17px;

    }
  }
}

</style>
